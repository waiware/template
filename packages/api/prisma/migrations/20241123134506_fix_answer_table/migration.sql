/*
  Warnings:

  - You are about to drop the column `isCorrect` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `isJudging` on the `answers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "isCorrect",
DROP COLUMN "isJudging",
ADD COLUMN     "is_correct" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_judging" BOOLEAN NOT NULL DEFAULT true;
