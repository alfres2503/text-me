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

export const getInitialContactsWithMessages = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const userID = parseInt(req.params.from);

    const user = await prisma.user.findUnique({
      where: { id: userID },
      include: {
        sentMessages: {
          include: {
            receiver: true,
            sender: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        receivedMessages: {
          include: {
            receiver: true,
            sender: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const messages = [...user.sentMessages, ...user.receivedMessages];

    //sort messages
    messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const users = new Map();
    const messageStatusChange = [];

    messages.forEach((msg) => {
      const isSender = msg.senderId === userID;
      const calculatedId = isSender ? msg.receiverId : msg.senderId;

      if (msg.messageStatus === "sent") messageStatusChange.push(msg.id);

      if (!users.has(calculatedId)) {
        const {
          id,
          type,
          message,
          messageStatus,
          createdAt,
          senderId,
          receiverId,
        } = msg;

        let user = {
          messageId: id,
          type,
          message,
          messageStatus,
          createdAt,
          senderId,
          receiverId,
          totalUnreadMessages: 0,
        };

        if (isSender) {
          user = {
            ...user,
            ...msg.receiver,
            totalUnreadMessages: 0,
          };
        } else {
          user = {
            ...user,
            ...msg.sender,
            totalUnreadMessages: messageStatus !== "read" ? 1 : 0,
          };
        }
        users.set(calculatedId, { ...user, totalUnreadMessages: 0 });
      } else if (msg.messageStatus !== "read" && !isSender) {
        const user = users.get(calculatedId);
        users.set(calculatedId, {
          ...user,
          totalUnreadMessages: user.totalUnreadMessages + 1,
        });
      }
    });

    if (messageStatusChange.length) {
      await prisma.message.updateMany({
        where: {
          id: { in: messageStatusChange },
        },
        data: {
          messageStatus: "delivered",
        },
      });
    }
    console.log("getInitialContactsWithMessages");
    console.log(Array.from(users.values()));
    console.log(Array.from(global.onlineUsers.keys()));

    return res.status(200).json({
      users: Array.from(users.values()),
      onlineUsers: Array.from(global.onlineUsers.keys()),
    });
  } catch (error) {}
};
