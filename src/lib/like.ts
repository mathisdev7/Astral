import { Session } from "next-auth";
import { prisma } from "./prismaClient";

type LikeData = {
  astralId: string;
};

export async function like(data: LikeData, session: Session) {
  const { astralId } = data;
  const like = await prisma.like.create({
    data: {
      userId: session.user?.id as string,
      astralId: astralId as string,
    },
  });
  const dislike = await prisma.dislike.findFirst({
    where: {
      userId: session.user?.id as string,
      astralId: astralId as string,
    },
  });
  if (dislike) {
    await prisma.dislike.delete({
      where: {
        id: dislike.id,
      },
    });
  }
  return { likeData: like, dislikeData: dislike };
}
