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
      const { astralId } = req.body;
      await prisma.dislike.create({
        data: {
          userId: session.user?.id as string,
          astralId: astralId as string,
        },
      });
      await prisma.like.deleteMany({
        where: {
          userId: session.user?.id as string,
          astralId: astralId as string,
        },
      });
      await prisma.like.deleteMany({
        where: {
          userId: session.user?.id as string,
          astralId: astralId as string,
        },
      });
      res.status(201).json({ success: "Post disliked with success." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
}
