-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "lastName" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "Dislike" (
    "id" TEXT NOT NULL,
    "astralId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dislike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dislike_astralId_userId_key" ON "Dislike"("astralId", "userId");

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_astralId_fkey" FOREIGN KEY ("astralId") REFERENCES "Astral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dislike" ADD CONSTRAINT "Dislike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
