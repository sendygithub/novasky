import { z } from "zod";

export const patientSchema = z.object({
  nik: z.string().optional(),
  name: z.string().min(1, "Nama wajib diisi"),
  gender: z.enum(["LAKI_LAKI", "PEREMPUAN"]).optional(),
  tempatLahir: z.string().optional(),
  tanggalLahir: z.string().optional(),
  alamat: z.string().optional(),
  phone: z.string().optional(),
  email: z
    .string()
    .email("Format email tidak valid")
    .optional()
    .or(z.literal("")),
  golonganDarah: z.enum(["A", "B", "AB", "O"]).optional(),
  bpjs: z.string().optional(),
  asuransi: z.string().optional(),
  kontakDarurat: z.string().optional(),
  kontakDaruratPhone: z.string().optional(),
});

export const bookingSchema = z.object({
  doctorId: z.string().min(1, "Dokter wajib dipilih"),
  scheduleId: z.string().min(1, "Jadwal wajib dipilih"),
  departmentId: z.string().optional(),
  specializationId: z.string().optional(),
  bookingDate: z.string().min(1, "Tanggal booking wajib diisi"),
  bookingTime: z.string().min(1, "Jam booking wajib diisi"),
  keluhan: z.string().optional(),
});

export const medicalRecordSchema = z.object({
  keluhan: z.string().optional(),
  tekananDarah: z.string().optional(),
  beratBadan: z.number().positive("Berat badan harus positif").optional(),
  tinggiBadan: z.number().positive("Tinggi badan harus positif").optional(),
  suhuTubuh: z.number().optional(),
  catatan: z.string().optional(),
  tindakan: z.string().optional(),
});

export const diagnosisSchema = z.object({
  penyakit: z.string().min(1, "Penyakit wajib diisi"),
  icdCode: z.string().optional(),
  catatan: z.string().optional(),
});

export const prescriptionSchema = z.object({
  items: z
    .array(
      z.object({
        medicineId: z.string().min(1, "Obat wajib dipilih"),
        jumlah: z.number().int().positive("Jumlah harus positif"),
        aturanMinum: z.string().optional(),
        catatan: z.string().optional(),
      }),
    )
    .min(1, "Minimal 1 item obat"),
  catatan: z.string().optional(),
});

export const doctorSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  sip: z.string().optional(),
  str: z.string().optional(),
  specialization: z.string().optional(),
  pengalaman: z.string().optional(),
  pendidikan: z.string().optional(),
  foto: z.string().optional(),
  status: z.enum(["AKTIF", "TIDAK_AKTIF", "CUTI"]).optional(),
});

export const scheduleSchema = z.object({
  doctorId: z.string().min(1, "Dokter wajib dipilih"),
  day: z.enum(["SENIN", "SELASA", "RABU", "KAMIS", "JUMAT", "SABTU", "MINGGU"]),
  startTime: z.string().min(1, "Jam mulai wajib diisi"),
  endTime: z.string().min(1, "Jam selesai wajib diisi"),
  kuota: z.number().int().positive("Kuota harus positif").default(10),
  isActive: z.boolean().default(true),
});

export const specializationSchema = z.object({
  name: z.string().min(1, "Nama spesialisasi wajib diisi"),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const departmentSchema = z.object({
  name: z.string().min(1, "Nama poli wajib diisi"),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const medicineSchema = z.object({
  name: z.string().min(1, "Nama obat wajib diisi"),
  kategori: z.string().optional(),
  satuan: z.string().optional(),
  harga: z.number().positive("Harga harus positif").default(0),
  stok: z.number().int().min(0, "Stok tidak boleh negatif").default(0),
  deskripsi: z.string().optional(),
});

export const roomSchema = z.object({
  nomorKamar: z.string().min(1, "Nomor kamar wajib diisi"),
  kelas: z.enum(["VIP", "KELAS_1", "KELAS_2", "KELAS_3"]),
  harga: z.number().positive("Harga harus positif").default(0),
  status: z.enum(["KOSONG", "TERISI", "MAINTENANCE"]).default("KOSONG"),
});

export const paymentSchema = z.object({
  biayaKonsultasi: z.number().default(0),
  biayaObat: z.number().default(0),
  biayaLab: z.number().default(0),
  biayaRadiologi: z.number().default(0),
  biayaRawatInap: z.number().default(0),
  metode: z.enum(["CASH", "DEBIT", "KREDIT", "QRIS", "TRANSFER"]).optional(),
});

export type PatientInput = z.infer<typeof patientSchema>;
export type BookingInput = z.infer<typeof bookingSchema>;
export type MedicalRecordInput = z.infer<typeof medicalRecordSchema>;
export type DiagnosisInput = z.infer<typeof diagnosisSchema>;
export type PrescriptionInput = z.infer<typeof prescriptionSchema>;
export type DoctorInput = z.infer<typeof doctorSchema>;
export type ScheduleInput = z.infer<typeof scheduleSchema>;
export type SpecializationInput = z.infer<typeof specializationSchema>;
export type DepartmentInput = z.infer<typeof departmentSchema>;
export type MedicineInput = z.infer<typeof medicineSchema>;
export type RoomInput = z.infer<typeof roomSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
