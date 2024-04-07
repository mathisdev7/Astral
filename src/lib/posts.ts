import { prisma } from "@/lib/prismaClient";

export async function getPosts() {
  const posts = await prisma.astral.findMany();
  const users = await prisma.user.findMany();
  return { posts, users };
}
