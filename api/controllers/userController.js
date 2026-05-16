import { userService } from "../services";

const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  return res.status(200).send(users);
};

const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.userId);

  if (!user) {
    return res.status(404).send();
  }

  return res.status(200).send(user);
};

const createUser = async (req, res) => {
  const user = await userService.createUser({
    username: req.body.username,
    email: req.body.email,
  });

  return res.status(201).send(user);
};

const updateUser = async (req, res) => {
  const response = await userService.updateUser(req.params.userId, {
    username: req.body.username,
    email: req.body.email,
  });

  if (response[0] === 0) {
    return res.status(404).send();
  }

  const user = response[1][0];
  return res.status(200).send(user);
};

const deleteUser = async (req, res) => {
  const result = await userService.deleteUser(req.params.userId);

  if (!result) {
    return res.status(404).send();
  }

  return res.status(204).send();
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
