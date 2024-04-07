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
      const like = await prisma.like.create({
        data: {
          userId: session.user?.id as string,
          astralId: astralId as string,
        },
      });
      const likeCount = await prisma.like.findMany({
        where: {
          astralId: astralId as string,
        },
      });
      await prisma.dislike.deleteMany({
        where: {
          userId: session.user?.id as string,
          astralId: astralId as string,
        },
      });
      res
        .status(201)
        .json({
          success: "Post liked with success.",
          likeCount: likeCount.length,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  } else {
    res.status(405).end();
  }
}
