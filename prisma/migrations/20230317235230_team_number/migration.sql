/*
  Warnings:

  - You are about to drop the column `robotId` on the `RobotMatch` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[matchId,teamNumber]` on the table `RobotMatch` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamNumber` to the `RobotMatch` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `RobotMatch_matchId_robotId_scouterId_key` ON `RobotMatch`;

-- DropIndex
DROP INDEX `RobotMatch_robotId_idx` ON `RobotMatch`;

-- AlterTable
ALTER TABLE `RobotMatch` DROP COLUMN `robotId`,
    ADD COLUMN `teamNumber` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `RobotMatch_teamNumber_idx` ON `RobotMatch`(`teamNumber`);

-- CreateIndex
CREATE UNIQUE INDEX `RobotMatch_matchId_teamNumber_key` ON `RobotMatch`(`matchId`, `teamNumber`);
