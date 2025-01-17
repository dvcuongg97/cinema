/*
  Warnings:

  - The primary key for the `Cinema` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cinema_id` on the `Cinema` table. All the data in the column will be lost.
  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `genre` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `movie_id` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Movie` table. All the data in the column will be lost.
  - You are about to alter the column `language` on the `Movie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - The primary key for the `Payment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `amount` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `booking_id` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `payment_id` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `Screen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `screen_id` on the `Screen` table. All the data in the column will be lost.
  - The primary key for the `Seat` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `row` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `screen_id` on the `Seat` table. All the data in the column will be lost.
  - You are about to drop the column `seat_id` on the `Seat` table. All the data in the column will be lost.
  - The primary key for the `Showtime` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `showtime_id` on the `Showtime` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(4))` to `VarChar(191)`.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Cinema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Cinema` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Screen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[payment_id]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[seatNumber]` on the table `Seat` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `Cinema` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `genre_id` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Movie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `slug` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `user_id` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Screen` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Seat` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `payment_id` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seatRow` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showtime_id` to the `Seat` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Showtime` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `User` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_showtime_id_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Payment` DROP FOREIGN KEY `Payment_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `Screen` DROP FOREIGN KEY `Screen_cinema_id_fkey`;

-- DropForeignKey
ALTER TABLE `Seat` DROP FOREIGN KEY `Seat_screen_id_fkey`;

-- DropForeignKey
ALTER TABLE `Showtime` DROP FOREIGN KEY `Showtime_movie_id_fkey`;

-- DropForeignKey
ALTER TABLE `Showtime` DROP FOREIGN KEY `Showtime_screen_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_booking_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ticket` DROP FOREIGN KEY `Ticket_seat_id_fkey`;

-- DropIndex
DROP INDEX `Payment_booking_id_key` ON `Payment`;

-- DropIndex
DROP INDEX `Screen_cinema_id_fkey` ON `Screen`;

-- DropIndex
DROP INDEX `Seat_screen_id_fkey` ON `Seat`;

-- DropIndex
DROP INDEX `Showtime_movie_id_fkey` ON `Showtime`;

-- DropIndex
DROP INDEX `Showtime_screen_id_fkey` ON `Showtime`;

-- AlterTable
ALTER TABLE `Cinema` DROP PRIMARY KEY,
    DROP COLUMN `cinema_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Movie` DROP PRIMARY KEY,
    DROP COLUMN `genre`,
    DROP COLUMN `movie_id`,
    DROP COLUMN `rating`,
    ADD COLUMN `genre_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL DEFAULT 'default-image-url',
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    ADD COLUMN `trailer` VARCHAR(191) NULL DEFAULT 'default-trailer-url',
    MODIFY `language` ENUM('VIETSUB', 'VIETDUB') NOT NULL DEFAULT 'VIETSUB',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Payment` DROP PRIMARY KEY,
    DROP COLUMN `amount`,
    DROP COLUMN `booking_id`,
    DROP COLUMN `payment_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `totalAmount` DOUBLE NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Screen` DROP PRIMARY KEY,
    DROP COLUMN `screen_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `cinema_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Seat` DROP PRIMARY KEY,
    DROP COLUMN `row`,
    DROP COLUMN `screen_id`,
    DROP COLUMN `seat_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    ADD COLUMN `payment_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    ADD COLUMN `seatRow` ENUM('A', 'B', 'C', 'D', 'E', 'F') NOT NULL,
    ADD COLUMN `showtime_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` ENUM('EMPTY', 'BOOKED') NOT NULL DEFAULT 'EMPTY',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `Showtime` DROP PRIMARY KEY,
    DROP COLUMN `showtime_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `movie_id` VARCHAR(191) NOT NULL,
    MODIFY `screen_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `User` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'GUEST',
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Booking`;

-- DropTable
DROP TABLE `Ticket`;

-- CreateTable
CREATE TABLE `Rating` (
    `id` VARCHAR(191) NOT NULL,
    `movie_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `score` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Rating_movie_id_key`(`movie_id`),
    UNIQUE INDEX `Rating_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genre` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Genre_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_CinemaToMovie` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_CinemaToMovie_AB_unique`(`A`, `B`),
    INDEX `_CinemaToMovie_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Cinema_id_key` ON `Cinema`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `Cinema_name_key` ON `Cinema`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Movie_slug_key` ON `Movie`(`slug`);

-- CreateIndex
CREATE UNIQUE INDEX `Screen_name_key` ON `Screen`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Seat_payment_id_key` ON `Seat`(`payment_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Seat_seatNumber_key` ON `Seat`(`seatNumber`);

-- AddForeignKey
ALTER TABLE `Movie` ADD CONSTRAINT `Movie_genre_id_fkey` FOREIGN KEY (`genre_id`) REFERENCES `Genre`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Screen` ADD CONSTRAINT `Screen_cinema_id_fkey` FOREIGN KEY (`cinema_id`) REFERENCES `Cinema`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_showtime_id_fkey` FOREIGN KEY (`showtime_id`) REFERENCES `Showtime`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Seat` ADD CONSTRAINT `Seat_payment_id_fkey` FOREIGN KEY (`payment_id`) REFERENCES `Payment`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_movie_id_fkey` FOREIGN KEY (`movie_id`) REFERENCES `Movie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Showtime` ADD CONSTRAINT `Showtime_screen_id_fkey` FOREIGN KEY (`screen_id`) REFERENCES `Screen`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CinemaToMovie` ADD CONSTRAINT `_CinemaToMovie_A_fkey` FOREIGN KEY (`A`) REFERENCES `Cinema`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_CinemaToMovie` ADD CONSTRAINT `_CinemaToMovie_B_fkey` FOREIGN KEY (`B`) REFERENCES `Movie`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
