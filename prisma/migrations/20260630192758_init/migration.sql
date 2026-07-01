/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('ADMIN', 'DOKTER', 'PASIEN', 'APOTEKER', 'KASIR', 'PERAWAT');

-- CreateEnum
CREATE TYPE "public"."Gender" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "public"."BloodType" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('MENUNGGU', 'DIKONFIRMASI', 'CHECKED_IN', 'SELESAI', 'BATAL');

-- CreateEnum
CREATE TYPE "public"."QueueStatus" AS ENUM ('MENUNGGU', 'DIPANGGIL', 'DALAM_PEMERIKSAAN', 'SELESAI', 'TIDAK_HADIR');

-- CreateEnum
CREATE TYPE "public"."PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "public"."PaymentMethod" AS ENUM ('CASH', 'DEBIT', 'KREDIT', 'QRIS', 'TRANSFER');

-- CreateEnum
CREATE TYPE "public"."PrescriptionStatus" AS ENUM ('MENUNGGU', 'DIPROSES', 'SIAP_DIAMBIL', 'SUDAH_DIAMBIL');

-- CreateEnum
CREATE TYPE "public"."RoomStatus" AS ENUM ('KOSONG', 'TERISI', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "public"."RoomClass" AS ENUM ('VIP', 'KELAS_1', 'KELAS_2', 'KELAS_3');

-- CreateEnum
CREATE TYPE "public"."LabStatus" AS ENUM ('MENUNGGU', 'DIPROSES', 'SELESAI');

-- CreateEnum
CREATE TYPE "public"."RadiologyStatus" AS ENUM ('MENUNGGU', 'DIPROSES', 'SELESAI');

-- CreateEnum
CREATE TYPE "public"."DayOfWeek" AS ENUM ('SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU');

-- CreateEnum
CREATE TYPE "public"."DoctorStatus" AS ENUM ('AKTIF', 'TIDAK_AKTIF', 'CUTI');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "image" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" "public"."UserRole" NOT NULL DEFAULT 'PASIEN',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "public"."Patient" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "noRM" TEXT NOT NULL,
    "nik" TEXT,
    "name" TEXT NOT NULL,
    "gender" "public"."Gender",
    "tempatLahir" TEXT,
    "tanggalLahir" TIMESTAMP(3),
    "alamat" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "golonganDarah" "public"."BloodType",
    "bpjs" TEXT,
    "asuransi" TEXT,
    "kontakDarurat" TEXT,
    "kontakDaruratPhone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Doctor" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sip" TEXT,
    "str" TEXT,
    "name" TEXT NOT NULL,
    "specialization" TEXT,
    "pengalaman" TEXT,
    "pendidikan" TEXT,
    "foto" TEXT,
    "status" "public"."DoctorStatus" NOT NULL DEFAULT 'AKTIF',
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Specialization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Specialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DoctorSpecialization" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "specializationId" TEXT NOT NULL,

    CONSTRAINT "DoctorSpecialization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Department" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Schedule" (
    "id" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "day" "public"."DayOfWeek" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "kuota" INTEGER NOT NULL DEFAULT 10,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "scheduleId" TEXT NOT NULL,
    "departmentId" TEXT,
    "specializationId" TEXT,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingTime" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'MENUNGGU',
    "keluhan" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Queue" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "queueNumber" INTEGER NOT NULL,
    "status" "public"."QueueStatus" NOT NULL DEFAULT 'MENUNGGU',
    "calledAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CheckIn" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "checkedInAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MedicalRecord" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "bookingId" TEXT,
    "keluhan" TEXT,
    "tekananDarah" TEXT,
    "beratBadan" DOUBLE PRECISION,
    "tinggiBadan" DOUBLE PRECISION,
    "suhuTubuh" DOUBLE PRECISION,
    "catatan" TEXT,
    "tindakan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Diagnosis" (
    "id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,
    "penyakit" TEXT NOT NULL,
    "icdCode" TEXT,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnosis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DiseaseHistory" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "diagnosisId" TEXT NOT NULL,
    "penyakit" TEXT NOT NULL,
    "icdCode" TEXT,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiseaseHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Prescription" (
    "id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,
    "doctorId" TEXT NOT NULL,
    "nomorResep" TEXT NOT NULL,
    "status" "public"."PrescriptionStatus" NOT NULL DEFAULT 'MENUNGGU',
    "catatan" TEXT,
    "qrCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Prescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PrescriptionItem" (
    "id" TEXT NOT NULL,
    "prescriptionId" TEXT NOT NULL,
    "medicineId" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "aturanMinum" TEXT,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrescriptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Medicine" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "kategori" TEXT,
    "satuan" TEXT,
    "harga" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "stok" INTEGER NOT NULL DEFAULT 0,
    "deskripsi" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Medicine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Pharmacist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sip" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pharmacist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Cashier" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cashier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Nurse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sip" TEXT,
    "phone" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Payment" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "biayaKonsultasi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "biayaObat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "biayaLab" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "biayaRadiologi" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "biayaRawatInap" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "total" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "metode" "public"."PaymentMethod",
    "status" "public"."PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,
    "nomorInvoice" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Room" (
    "id" TEXT NOT NULL,
    "nomorKamar" TEXT NOT NULL,
    "kelas" "public"."RoomClass" NOT NULL,
    "harga" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "status" "public"."RoomStatus" NOT NULL DEFAULT 'KOSONG',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Inpatient" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "tanggalMasuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalKeluar" TIMESTAMP(3),
    "diagnosaAwal" TEXT,
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inpatient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Laboratory" (
    "id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,
    "jenisPemeriksaan" TEXT NOT NULL,
    "hasil" TEXT,
    "fileUrl" TEXT,
    "status" "public"."LabStatus" NOT NULL DEFAULT 'MENUNGGU',
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laboratory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Radiology" (
    "id" TEXT NOT NULL,
    "medicalRecordId" TEXT NOT NULL,
    "jenisPemeriksaan" TEXT NOT NULL,
    "hasil" TEXT,
    "fileUrl" TEXT,
    "status" "public"."RadiologyStatus" NOT NULL DEFAULT 'MENUNGGU',
    "catatan" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Radiology_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Notification" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "type" TEXT,
    "link" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AuditLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "public"."Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "public"."Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "public"."Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "public"."Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "public"."VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "public"."VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_userId_key" ON "public"."Patient"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_noRM_key" ON "public"."Patient"("noRM");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_nik_key" ON "public"."Patient"("nik");

-- CreateIndex
CREATE INDEX "Patient_noRM_idx" ON "public"."Patient"("noRM");

-- CreateIndex
CREATE INDEX "Patient_nik_idx" ON "public"."Patient"("nik");

-- CreateIndex
CREATE INDEX "Patient_name_idx" ON "public"."Patient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_userId_key" ON "public"."Doctor"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_sip_key" ON "public"."Doctor"("sip");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_str_key" ON "public"."Doctor"("str");

-- CreateIndex
CREATE INDEX "Doctor_name_idx" ON "public"."Doctor"("name");

-- CreateIndex
CREATE INDEX "Doctor_specialization_idx" ON "public"."Doctor"("specialization");

-- CreateIndex
CREATE UNIQUE INDEX "Specialization_name_key" ON "public"."Specialization"("name");

-- CreateIndex
CREATE INDEX "Specialization_name_idx" ON "public"."Specialization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "DoctorSpecialization_doctorId_specializationId_key" ON "public"."DoctorSpecialization"("doctorId", "specializationId");

-- CreateIndex
CREATE UNIQUE INDEX "Department_name_key" ON "public"."Department"("name");

-- CreateIndex
CREATE INDEX "Department_name_idx" ON "public"."Department"("name");

-- CreateIndex
CREATE INDEX "Schedule_doctorId_idx" ON "public"."Schedule"("doctorId");

-- CreateIndex
CREATE INDEX "Schedule_day_idx" ON "public"."Schedule"("day");

-- CreateIndex
CREATE INDEX "Booking_patientId_idx" ON "public"."Booking"("patientId");

-- CreateIndex
CREATE INDEX "Booking_doctorId_idx" ON "public"."Booking"("doctorId");

-- CreateIndex
CREATE INDEX "Booking_bookingDate_idx" ON "public"."Booking"("bookingDate");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "public"."Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_queueNumber_idx" ON "public"."Booking"("queueNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_bookingId_key" ON "public"."Queue"("bookingId");

-- CreateIndex
CREATE INDEX "Queue_queueNumber_idx" ON "public"."Queue"("queueNumber");

-- CreateIndex
CREATE INDEX "Queue_status_idx" ON "public"."Queue"("status");

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_bookingId_key" ON "public"."CheckIn"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalRecord_bookingId_key" ON "public"."MedicalRecord"("bookingId");

-- CreateIndex
CREATE INDEX "MedicalRecord_patientId_idx" ON "public"."MedicalRecord"("patientId");

-- CreateIndex
CREATE INDEX "MedicalRecord_doctorId_idx" ON "public"."MedicalRecord"("doctorId");

-- CreateIndex
CREATE INDEX "MedicalRecord_createdAt_idx" ON "public"."MedicalRecord"("createdAt");

-- CreateIndex
CREATE INDEX "Diagnosis_medicalRecordId_idx" ON "public"."Diagnosis"("medicalRecordId");

-- CreateIndex
CREATE INDEX "Diagnosis_penyakit_idx" ON "public"."Diagnosis"("penyakit");

-- CreateIndex
CREATE UNIQUE INDEX "DiseaseHistory_diagnosisId_key" ON "public"."DiseaseHistory"("diagnosisId");

-- CreateIndex
CREATE INDEX "DiseaseHistory_patientId_idx" ON "public"."DiseaseHistory"("patientId");

-- CreateIndex
CREATE INDEX "DiseaseHistory_penyakit_idx" ON "public"."DiseaseHistory"("penyakit");

-- CreateIndex
CREATE UNIQUE INDEX "Prescription_nomorResep_key" ON "public"."Prescription"("nomorResep");

-- CreateIndex
CREATE INDEX "Prescription_nomorResep_idx" ON "public"."Prescription"("nomorResep");

-- CreateIndex
CREATE INDEX "Prescription_status_idx" ON "public"."Prescription"("status");

-- CreateIndex
CREATE INDEX "Prescription_medicalRecordId_idx" ON "public"."Prescription"("medicalRecordId");

-- CreateIndex
CREATE INDEX "PrescriptionItem_prescriptionId_idx" ON "public"."PrescriptionItem"("prescriptionId");

-- CreateIndex
CREATE INDEX "PrescriptionItem_medicineId_idx" ON "public"."PrescriptionItem"("medicineId");

-- CreateIndex
CREATE INDEX "Medicine_name_idx" ON "public"."Medicine"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Pharmacist_userId_key" ON "public"."Pharmacist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cashier_userId_key" ON "public"."Cashier"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_userId_key" ON "public"."Nurse"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "public"."Payment"("bookingId");

-- CreateIndex
CREATE INDEX "Payment_status_idx" ON "public"."Payment"("status");

-- CreateIndex
CREATE INDEX "Payment_createdAt_idx" ON "public"."Payment"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_paymentId_key" ON "public"."Invoice"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_nomorInvoice_key" ON "public"."Invoice"("nomorInvoice");

-- CreateIndex
CREATE INDEX "Invoice_nomorInvoice_idx" ON "public"."Invoice"("nomorInvoice");

-- CreateIndex
CREATE UNIQUE INDEX "Room_nomorKamar_key" ON "public"."Room"("nomorKamar");

-- CreateIndex
CREATE INDEX "Room_kelas_idx" ON "public"."Room"("kelas");

-- CreateIndex
CREATE INDEX "Room_status_idx" ON "public"."Room"("status");

-- CreateIndex
CREATE INDEX "Inpatient_patientId_idx" ON "public"."Inpatient"("patientId");

-- CreateIndex
CREATE INDEX "Inpatient_roomId_idx" ON "public"."Inpatient"("roomId");

-- CreateIndex
CREATE INDEX "Inpatient_tanggalMasuk_idx" ON "public"."Inpatient"("tanggalMasuk");

-- CreateIndex
CREATE INDEX "Laboratory_medicalRecordId_idx" ON "public"."Laboratory"("medicalRecordId");

-- CreateIndex
CREATE INDEX "Laboratory_status_idx" ON "public"."Laboratory"("status");

-- CreateIndex
CREATE INDEX "Radiology_medicalRecordId_idx" ON "public"."Radiology"("medicalRecordId");

-- CreateIndex
CREATE INDEX "Radiology_status_idx" ON "public"."Radiology"("status");

-- CreateIndex
CREATE INDEX "Notification_userId_idx" ON "public"."Notification"("userId");

-- CreateIndex
CREATE INDEX "Notification_isRead_idx" ON "public"."Notification"("isRead");

-- CreateIndex
CREATE INDEX "Notification_createdAt_idx" ON "public"."Notification"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "public"."AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entity_idx" ON "public"."AuditLog"("entity");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "public"."AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- AddForeignKey
ALTER TABLE "public"."Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DoctorSpecialization" ADD CONSTRAINT "DoctorSpecialization_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DoctorSpecialization" ADD CONSTRAINT "DoctorSpecialization_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "public"."Specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Schedule" ADD CONSTRAINT "Schedule_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "public"."Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_specializationId_fkey" FOREIGN KEY ("specializationId") REFERENCES "public"."Specialization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Queue" ADD CONSTRAINT "Queue_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CheckIn" ADD CONSTRAINT "CheckIn_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicalRecord" ADD CONSTRAINT "MedicalRecord_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicalRecord" ADD CONSTRAINT "MedicalRecord_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MedicalRecord" ADD CONSTRAINT "MedicalRecord_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diagnosis" ADD CONSTRAINT "Diagnosis_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "public"."MedicalRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DiseaseHistory" ADD CONSTRAINT "DiseaseHistory_diagnosisId_fkey" FOREIGN KEY ("diagnosisId") REFERENCES "public"."Diagnosis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prescription" ADD CONSTRAINT "Prescription_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "public"."MedicalRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prescription" ADD CONSTRAINT "Prescription_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "public"."Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrescriptionItem" ADD CONSTRAINT "PrescriptionItem_prescriptionId_fkey" FOREIGN KEY ("prescriptionId") REFERENCES "public"."Prescription"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."PrescriptionItem" ADD CONSTRAINT "PrescriptionItem_medicineId_fkey" FOREIGN KEY ("medicineId") REFERENCES "public"."Medicine"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Pharmacist" ADD CONSTRAINT "Pharmacist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Cashier" ADD CONSTRAINT "Cashier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Nurse" ADD CONSTRAINT "Nurse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "public"."Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inpatient" ADD CONSTRAINT "Inpatient_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "public"."Patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Inpatient" ADD CONSTRAINT "Inpatient_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "public"."Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Laboratory" ADD CONSTRAINT "Laboratory_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "public"."MedicalRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Radiology" ADD CONSTRAINT "Radiology_medicalRecordId_fkey" FOREIGN KEY ("medicalRecordId") REFERENCES "public"."MedicalRecord"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
