/*
  Warnings:

  - You are about to drop the column `pictureUrl` on the `Host` table. All the data in the column will be lost.
  - Added the required column `pictureURL` to the `Host` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Host` DROP COLUMN `pictureUrl`,
    ADD COLUMN `pictureURL` VARCHAR(191) NOT NULL;
