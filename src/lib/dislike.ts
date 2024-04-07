import { Session } from "next-auth";
import { prisma } from "./prismaClient";

type DislikeData = {
  astralId: string;
};

export async function dislike(data: DislikeData, session: Session) {
  const { astralId } = data;
  const dislike = await prisma.dislike.create({
    data: {
      userId: session.user?.id as string,
      astralId: astralId as string,
    },
  });
  const like = await prisma.like.findFirst({
    where: {
      userId: session.user?.id as string,
      astralId: astralId as string,
    },
  });
  if (like) {
    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });
  }
  return { dislikeData: dislike, likeData: like };
}
