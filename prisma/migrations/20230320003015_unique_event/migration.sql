/*
  Warnings:

  - A unique constraint covering the columns `[matchId,teamNumber,eventId]` on the table `RobotMatch` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `RobotMatch_matchId_teamNumber_key` ON `RobotMatch`;

-- AlterTable
ALTER TABLE `RobotMatch` ADD COLUMN `eventId` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX `RobotMatch_eventId_idx` ON `RobotMatch`(`eventId`);

-- CreateIndex
CREATE UNIQUE INDEX `RobotMatch_matchId_teamNumber_eventId_key` ON `RobotMatch`(`matchId`, `teamNumber`, `eventId`);
