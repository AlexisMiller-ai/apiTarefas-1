import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next();
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await req.context.models.User.findByPk(payload.id);
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.context.me = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const protectRoutes = (req, res, next) => {
  const whitelist = [
    "POST /session",
    "POST /session/refresh",
    "POST /users",
  ];

  const key = `${req.method} ${req.path}`;

  if (whitelist.includes(key)) return next();

  if (req.method === "GET") {
    if (req.path === "/session") {
      if (!req.context.me) return res.status(401).json({ error: "Unauthorized" });
    }
    return next();
  }

  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    if (!req.context.me) return res.status(401).json({ error: "Unauthorized" });
  }

  return next();
};
