/*
  Warnings:

  - Added the required column `name` to the `Mission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Mission" ADD COLUMN     "name" TEXT NOT NULL;
