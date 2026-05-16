import models from "../models";

const getAllMessages = async () => {
  return await models.Message.findAll();
};

const getMessageById = async (id) => {
  return await models.Message.findByPk(id);
};

const createMessage = async (messageData) => {
  return await models.Message.create(messageData);
};

const updateMessage = async (id, messageData) => {
  const response = await models.Message.update(messageData, {
    where: { id },
    returning: true,
  });
  return response;
};

const deleteMessage = async (id) => {
  return await models.Message.destroy({
    where: { id },
  });
};

export default {
  getAllMessages,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
