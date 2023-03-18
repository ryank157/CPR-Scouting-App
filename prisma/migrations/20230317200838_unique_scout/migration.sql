/*
  Warnings:

  - You are about to drop the column `scouter` on the `RobotMatch` table. All the data in the column will be lost.
  - You are about to drop the `_MatchToRobot` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[matchNumber,eventId,flag]` on the table `Match` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[matchId,robotId,scouterId]` on the table `RobotMatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `matchNumber` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Robot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alliance` to the `RobotMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `robotId` to the `RobotMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scouterId` to the `RobotMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `station` to the `RobotMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Event` ADD COLUMN `key` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Match` ADD COLUMN `matchNumber` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Robot` ADD COLUMN `city` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT;

-- AlterTable
ALTER TABLE `RobotMatch` DROP COLUMN `scouter`,
    ADD COLUMN `alliance` VARCHAR(191) NOT NULL,
    ADD COLUMN `endBalanceTime` INTEGER NULL,
    ADD COLUMN `endingLoc` INTEGER NULL,
    ADD COLUMN `robotId` INTEGER NOT NULL,
    ADD COLUMN `scouterId` INTEGER NOT NULL,
    ADD COLUMN `station` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_MatchToRobot`;

-- CreateTable
CREATE TABLE `Scouter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `scouterId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Scouter_scouterId_key`(`scouterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Match_matchNumber_eventId_flag_key` ON `Match`(`matchNumber`, `eventId`, `flag`);

-- CreateIndex
CREATE INDEX `RobotMatch_robotId_idx` ON `RobotMatch`(`robotId`);

-- CreateIndex
CREATE INDEX `RobotMatch_scouterId_idx` ON `RobotMatch`(`scouterId`);

-- CreateIndex
CREATE UNIQUE INDEX `RobotMatch_matchId_robotId_scouterId_key` ON `RobotMatch`(`matchId`, `robotId`, `scouterId`);
