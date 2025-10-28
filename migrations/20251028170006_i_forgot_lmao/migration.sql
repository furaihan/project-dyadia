/*
  Warnings:

  - Added the required column `anggota_dewan_id` to the `activity` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activity" ADD COLUMN     "anggota_dewan_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "anggota_dewan" (
    "id_anggota" UUID NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT,
    "periode" TEXT,
    "partai_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "anggota_dewan_pkey" PRIMARY KEY ("id_anggota")
);

-- CreateTable
CREATE TABLE "partai_politik" (
    "id_partai" UUID NOT NULL,
    "nama_partai" TEXT NOT NULL,
    "singkatan" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "partai_politik_pkey" PRIMARY KEY ("id_partai")
);

-- CreateTable
CREATE TABLE "staff_anggota" (
    "id_staff" UUID NOT NULL,
    "id_user" UUID NOT NULL,
    "id_anggota" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staff_anggota_pkey" PRIMARY KEY ("id_staff")
);

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_anggota_dewan_id_fkey" FOREIGN KEY ("anggota_dewan_id") REFERENCES "anggota_dewan"("id_anggota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota_dewan" ADD CONSTRAINT "anggota_dewan_partai_id_fkey" FOREIGN KEY ("partai_id") REFERENCES "partai_politik"("id_partai") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_anggota" ADD CONSTRAINT "staff_anggota_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "anggota_dewan"("id_anggota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff_anggota" ADD CONSTRAINT "staff_anggota_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user_account"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
