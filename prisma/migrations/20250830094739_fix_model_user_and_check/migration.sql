/*
  Warnings:

  - The `Check` column on the `user` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "personId" SET DATA TYPE TEXT,
ALTER COLUMN "phoneNumber" SET DATA TYPE TEXT,
DROP COLUMN "Check",
ADD COLUMN     "Check" BOOLEAN NOT NULL DEFAULT false;

-- DropEnum
DROP TYPE "public"."Check";
