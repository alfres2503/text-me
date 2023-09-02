import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const prisma = new PrismaClient();

export const checkUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.json({ msg: "Please enter your email", status: false });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    console.log(user);

    if (user === null || !user) {
      return res.json({ msg: "User not found", status: false });
    } else {
      return res.json({ msg: "User found", status: true, data: user });
    }
  } catch (error) {
    next(error);
  }
};

export const onboardUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, about, image: profilePictureUrl } = req.body;
    if (!email || !name || !profilePictureUrl) {
      return res.send("Please fill all fields");
    }

    await prisma.user.create({
      data: {
        email,
        name,
        about,
        profilePictureUrl,
      },
    });
    return res.json({ msg: "User onboarded successfully", status: true });
  } catch (error) {
    next(error);
  }
};
