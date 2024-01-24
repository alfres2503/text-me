import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { renameSync } from "fs";

const prisma = new PrismaClient();

export const addMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, from, to } = req.body;
    const getUser = global.onlineUsers.get(to);

    if (message && from && to) {
      const newMessage = await prisma.message.create({
        data: {
          message,
          sender: { connect: { id: parseInt(from) } },
          receiver: { connect: { id: parseInt(to) } },
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: {
          sender: true,
          receiver: true,
        },
      });
      return res.status(201).send({ message: newMessage });
    }
    return res.status(400).send("From, To and Message are required");
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { from, to } = req.params;

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          {
            senderId: parseInt(from),
            receiverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            receiverId: parseInt(from),
          },
        ],
      },
      orderBy: {
        id: "asc",
      },
    });

    const unreadMessages = [];

    messages.forEach((message, index) => {
      if (
        message.messageStatus !== "read" &&
        message.senderId === parseInt(to)
      ) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });

    await prisma.message.updateMany({
      where: {
        id: { in: unreadMessages },
      },
      data: {
        messageStatus: "read",
      },
    });

    return res.status(200).send({ messages });
  } catch (error) {
    next(error);
  }
};

export const addImageMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const date = Date.now();
      let filename = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, filename);
      const { from, to } = req.query;

      if (from && to) {
        if (typeof from === "string" && typeof to === "string") {
          const message = await prisma.message.create({
            data: {
              message: filename,
              type: "image",
              sender: { connect: { id: parseInt(from) } },
              receiver: { connect: { id: parseInt(to) } },
            },
          });
          return res.status(201).json({ message });
        }
      }
      return res.status(400).send("From and To are required");
    }
    return res.status(400).send("Image is required");
  } catch (error) {
    next(error);
  }
};

export const addAudioMessage = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.file) {
      const date = Date.now();
      let filename = "uploads/recordings/" + date + req.file.originalname;
      renameSync(req.file.path, filename);
      const { from, to } = req.query;

      if (from && to) {
        if (typeof from === "string" && typeof to === "string") {
          const message = await prisma.message.create({
            data: {
              message: filename,
              type: "audio",
              sender: { connect: { id: parseInt(from) } },
              receiver: { connect: { id: parseInt(to) } },
            },
          });
          return res.status(201).json({ message });
        }
      }
      return res.status(400).send("From and To are required");
    }
    return res.status(400).send("Audio is required");
  } catch (error) {
    next(error);
  }
};
