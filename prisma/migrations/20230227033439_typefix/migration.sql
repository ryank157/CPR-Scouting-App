/*
  Warnings:

  - You are about to drop the column `endgameBalancing` on the `RobotMatch` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `RobotMatch` DROP COLUMN `endgameBalancing`,
    ADD COLUMN `endOrder` INTEGER NULL,
    ADD COLUMN `endResult` VARCHAR(191) NULL,
    ADD COLUMN `endRobots` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Account_userId_idx` ON `Account`(`userId`);

-- CreateIndex
CREATE INDEX `Session_userId_idx` ON `Session`(`userId`);
