import { Router } from "express";
import { addImageMessage, addMessage, getMessages } from "../controllers/MessageController";
import multer from "multer";

const MessageRouter = Router();

const uploadImage = multer({ dest: "uploads/images" });

MessageRouter.post("/add-message", addMessage);
MessageRouter.get("/get-messages/:from/:to", getMessages);
MessageRouter.post("/add-image-message", uploadImage.single("image"), addImageMessage);

export default MessageRouter;
