import models from "../models";

const getAllUsers = async () => {
  return await models.User.findAll();
};

const getUserById = async (id) => {
  return await models.User.findByPk(id);
};

const createUser = async (userData) => {
  return await models.User.create(userData);
};

const updateUser = async (id, userData) => {
  const response = await models.User.update(userData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteUser = async (id) => {
  return await models.User.destroy({
    where: { id },
  });
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
