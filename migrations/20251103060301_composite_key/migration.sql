/*
  Warnings:

  - The primary key for the `staff_anggota` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_staff` on the `staff_anggota` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "activity" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "staff_anggota" DROP CONSTRAINT "staff_anggota_pkey",
DROP COLUMN "id_staff",
ADD CONSTRAINT "staff_anggota_pkey" PRIMARY KEY ("id_user", "id_anggota");
