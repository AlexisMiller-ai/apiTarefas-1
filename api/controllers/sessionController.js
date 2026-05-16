import jwt from "jsonwebtoken";
import crypto from "crypto";

const createTokens = async (user, models, existingExpiry = null) => {
  const accessToken = jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION || "15m" }
  );

  const token = crypto.randomBytes(64).toString("hex");
  const expiresAt = existingExpiry || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await models.RefreshToken.create({ token, expiresAt, userId: user.id });

  return { accessToken, refreshToken: token };
};

const login = async (req, res) => {
  const { login, password } = req.body;

  if (!login || !password) {
    return res.status(400).json({ error: "Login and password are required" });
  }

  const user = await req.context.models.User.findByLogin(login);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const valid = await user.validatePassword(password);
  if (!valid) return res.status(401).json({ error: "Invalid credentials" });

  const tokens = await createTokens(user, req.context.models);
  return res.status(200).json(tokens);
};

const logout = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });

  const deleted = await req.context.models.RefreshToken.destroy({
    where: { token: refreshToken },
  });

  if (!deleted) return res.status(404).json({ error: "Token not found" });
  return res.status(204).send();
};

const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).json({ error: "Refresh token required" });

  const stored = await req.context.models.RefreshToken.findOne({
    where: { token: refreshToken },
  });

  if (!stored) return res.status(401).json({ error: "Invalid refresh token" });
  if (new Date() > stored.expiresAt) {
    await stored.destroy();
    return res.status(401).json({ error: "Refresh token expired" });
  }

  const user = await req.context.models.User.findByPk(stored.userId);
  const originalExpiry = stored.expiresAt;
  await stored.destroy();

  const tokens = await createTokens(user, req.context.models, originalExpiry);
  return res.status(200).json(tokens);
};

const getMe = async (req, res) => {
  if (!req.context.me) return res.status(401).json({ error: "Unauthorized" });
  return res.status(200).json(req.context.me);
};

export default { login, logout, refresh, getMe };
