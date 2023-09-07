import { Router } from "express";
import { addMessage, getMessages } from "../controllers/MessageController";

const MessageRouter = Router();

MessageRouter.post("/add-message", addMessage);
MessageRouter.get("/get-messages/:from/:to", getMessages);

export default MessageRouter;
