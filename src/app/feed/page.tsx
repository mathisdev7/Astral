import Feed from "@/components/feed/feedWrapper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function ServerComponent() {
  const astralData = await prisma.astral.findMany();
  const users = await prisma.user.findMany();
  const likes = await prisma.like.findMany();
  const dislikes = await prisma.dislike.findMany();

  if (!astralData || !users || !likes || !dislikes) {
    return null;
  }

  return (
    <Feed
      astrals={astralData}
      users={users}
      likes={likes}
      dislikes={dislikes}
    />
  );
}
