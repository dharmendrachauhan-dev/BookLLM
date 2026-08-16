/*
  Warnings:

  - You are about to drop the column `citation` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "message" DROP COLUMN "citation",
ADD COLUMN     "citations" JSONB;
