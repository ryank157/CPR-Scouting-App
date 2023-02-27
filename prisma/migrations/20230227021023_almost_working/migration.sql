/*
  Warnings:

  - You are about to alter the column `identifier` on the `VerificationToken` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `VerificationToken` MODIFY `identifier` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Robot` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `teamNumber` INTEGER NOT NULL,

    UNIQUE INDEX `Robot_id_key`(`id`),
    UNIQUE INDEX `Robot_teamNumber_key`(`teamNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Event` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Match` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `flag` VARCHAR(191) NOT NULL,
    `eventId` INTEGER NOT NULL,

    INDEX `Match_eventId_idx`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RobotMatch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matchId` INTEGER NOT NULL,
    `startingLoc` INTEGER NULL,
    `mobility` VARCHAR(191) NULL,
    `autoBalance` VARCHAR(191) NULL,
    `fouls` VARCHAR(191) NULL,
    `defense` VARCHAR(191) NULL,
    `endgameBalancing` VARCHAR(191) NULL,
    `feedback` VARCHAR(191) NULL,
    `scouter` VARCHAR(191) NULL,

    INDEX `RobotMatch_matchId_idx`(`matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScoredPiece` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `robotMatchId` INTEGER NOT NULL,
    `type` VARCHAR(191) NULL,
    `scoredLocation` INTEGER NULL,
    `cycleTime` INTEGER NULL,
    `pickupLocation` VARCHAR(191) NULL,
    `pickupOrientation` VARCHAR(191) NULL,
    `delayed` VARCHAR(191) NULL,

    INDEX `ScoredPiece_robotMatchId_idx`(`robotMatchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Alliances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `eventId` INTEGER NOT NULL,
    `alliancePosition` INTEGER NOT NULL,

    INDEX `Alliances_eventId_idx`(`eventId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_EventToRobot` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EventToRobot_AB_unique`(`A`, `B`),
    INDEX `_EventToRobot_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_MatchToRobot` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_MatchToRobot_AB_unique`(`A`, `B`),
    INDEX `_MatchToRobot_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_AlliancesToRobot` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AlliancesToRobot_AB_unique`(`A`, `B`),
    INDEX `_AlliancesToRobot_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
