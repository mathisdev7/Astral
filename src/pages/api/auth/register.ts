import { prisma } from "@/lib/prismaClient";
import { genSalt, hash } from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email, password, passwordRepeated } = req.body;
    if (password !== passwordRepeated) {
      res.status(400).json({ error: "Passwords do not match." });
      return;
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          {
            email,
          },
        ],
      },
    });
    if (user) {
      res.status(400).json({ error: "User already exists." });
      return;
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      res.status(500).json({ error: "Failed to create user." });
      return;
    }
    res.status(201).json({ message: "User created." });
  } else {
    res.status(405).end();
  }
}
