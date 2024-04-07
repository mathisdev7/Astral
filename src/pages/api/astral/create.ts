import { prisma } from "@/lib/prismaClient";
import { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const session = await auth(req, res);
      if (!session) {
        return res.status(401).end();
      }
      const { title, text, image } = req.body;
      const astral = await prisma.astral.create({
        data: {
          authorId: session.user?.id as string,
          title: title as string,
          text: text as string,
          image: image ? (image as string) : null,
        },
      });
      res.status(201).json(astral);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
}
