import { messageService } from "../services";

const getMessages = async (req, res) => {
  const messages = await messageService.getAllMessages();
  return res.status(200).send(messages);
};

const getMessage = async (req, res) => {
  const message = await messageService.getMessageById(req.params.messageId);

  if (!message) {
    return res.status(404).send();
  }

  return res.status(200).send(message);
};

const createMessage = async (req, res) => {
  const message = await messageService.createMessage({
    text: req.body.text,
    userId: req.context.me.id,
  });

  return res.status(201).send(message);
};

const updateMessage = async (req, res) => {
  const response = await messageService.updateMessage(req.params.messageId, {
    text: req.body.text,
  });

  if (response[0] === 0) {
    return res.status(404).send();
  }

  const message = response[1][0];
  return res.status(200).send(message);
};

const deleteMessage = async (req, res) => {
  const result = await messageService.deleteMessage(req.params.messageId);

  if (!result) {
    return res.status(404).send();
  }

  return res.status(204).send();
};

export default {
  getMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
};
