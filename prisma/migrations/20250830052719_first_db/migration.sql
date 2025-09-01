-- CreateEnum
CREATE TYPE "public"."Prefix" AS ENUM ('Mr', 'Ms', 'Miss');

-- CreateEnum
CREATE TYPE "public"."Check" AS ENUM ('ture', 'fals');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" SERIAL NOT NULL,
    "Prefix" "public"."Prefix" NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "personId" INTEGER NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "Check" "public"."Check" NOT NULL DEFAULT 'fals',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");
