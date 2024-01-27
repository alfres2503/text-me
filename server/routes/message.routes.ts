import { Router } from "express";
import {
  addAudioMessage,
  addImageMessage,
  addMessage,
  getInitialContactsWithMessages,
  getMessages,
} from "../controllers/MessageController";
import multer from "multer";

const MessageRouter = Router();

const uploadAudio = multer({ dest: "uploads/recordings" });
const uploadImage = multer({ dest: "uploads/images" });

MessageRouter.post("/add-message", addMessage);
MessageRouter.get("/get-messages/:from/:to", getMessages);
MessageRouter.post(
  "/add-image-message",
  uploadImage.single("image"),
  addImageMessage
);
MessageRouter.post(
  "/add-audio-message",
  uploadAudio.single("audio"),
  addAudioMessage
);
MessageRouter.get(
  "/get-initial-contacts/:from",
  getInitialContactsWithMessages
);

export default MessageRouter;
