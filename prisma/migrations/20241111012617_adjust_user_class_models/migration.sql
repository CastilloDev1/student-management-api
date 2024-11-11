/*
  Warnings:

  - You are about to drop the column `classId` on the `class_enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `class_enrollments` table. All the data in the column will be lost.
  - You are about to drop the column `subjectId` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `classes` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `specialty` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_id,student_id]` on the table `class_enrollments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `class_id` to the `class_enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `class_enrollments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacher_id` to the `classes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `class_enrollments` DROP FOREIGN KEY `class_enrollments_classId_fkey`;

-- DropForeignKey
ALTER TABLE `class_enrollments` DROP FOREIGN KEY `class_enrollments_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_subjectId_fkey`;

-- DropForeignKey
ALTER TABLE `classes` DROP FOREIGN KEY `classes_teacherId_fkey`;

-- DropIndex
DROP INDEX `class_enrollments_classId_studentId_key` ON `class_enrollments`;

-- AlterTable
ALTER TABLE `class_enrollments` DROP COLUMN `classId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `class_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `student_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `classes` DROP COLUMN `subjectId`,
    DROP COLUMN `teacherId`,
    ADD COLUMN `subject_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `teacher_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `createdAt`,
    DROP COLUMN `specialty`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `class_enrollments_class_id_student_id_key` ON `class_enrollments`(`class_id`, `student_id`);

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `classes` ADD CONSTRAINT `classes_subject_id_fkey` FOREIGN KEY (`subject_id`) REFERENCES `subjects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_enrollments` ADD CONSTRAINT `class_enrollments_class_id_fkey` FOREIGN KEY (`class_id`) REFERENCES `classes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `class_enrollments` ADD CONSTRAINT `class_enrollments_student_id_fkey` FOREIGN KEY (`student_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
