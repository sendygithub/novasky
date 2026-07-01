export const APP_NAME = "Rumah Sakit Setiabudi";
export const APP_DESCRIPTION =
  "Pelayanan kesehatan modern, cepat, aman, dan terpercaya";
export const APP_TAGLINE =
  "Didukung dokter spesialis terbaik serta sistem digital terpadu";

export const ROLES = {
  ADMIN: "ADMIN" as const,
  DOKTER: "DOKTER" as const,
  PASIEN: "PASIEN" as const,
  APOTEKER: "APOTEKER" as const,
  KASIR: "KASIR" as const,
  PERAWAT: "PERAWAT" as const,
};

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Admin",
  DOKTER: "Dokter",
  PASIEN: "Pasien",
  APOTEKER: "Apoteker",
  KASIR: "Kasir",
  PERAWAT: "Perawat",
};

export const DAYS = [
  { value: "SENIN", label: "Senin" },
  { value: "SELASA", label: "Selasa" },
  { value: "RABU", label: "Rabu" },
  { value: "KAMIS", label: "Kamis" },
  { value: "JUMAT", label: "Jumat" },
  { value: "SABTU", label: "Sabtu" },
  { value: "MINGGU", label: "Minggu" },
];

export const BLOOD_TYPES = [
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "AB", label: "AB" },
  { value: "O", label: "O" },
];

export const ROOM_CLASSES = [
  { value: "VIP", label: "VIP" },
  { value: "KELAS_1", label: "Kelas 1" },
  { value: "KELAS_2", label: "Kelas 2" },
  { value: "KELAS_3", label: "Kelas 3" },
];

export const PAYMENT_METHODS = [
  { value: "CASH", label: "Tunai" },
  { value: "DEBIT", label: "Debit" },
  { value: "KREDIT", label: "Kredit" },
  { value: "QRIS", label: "QRIS" },
  { value: "TRANSFER", label: "Transfer" },
];

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  MENUNGGU: "Menunggu",
  DIKONFIRMASI: "Dikonfirmasi",
  CHECKED_IN: "Check In",
  SELESAI: "Selesai",
  BATAL: "Batal",
};

export const BOOKING_STATUS_COLORS: Record<string, string> = {
  MENUNGGU: "bg-yellow-100 text-yellow-800",
  DIKONFIRMASI: "bg-blue-100 text-blue-800",
  CHECKED_IN: "bg-green-100 text-green-800",
  SELESAI: "bg-gray-100 text-gray-800",
  BATAL: "bg-red-100 text-red-800",
};

export const PRESCRIPTION_STATUS_LABELS: Record<string, string> = {
  MENUNGGU: "Menunggu",
  DIPROSES: "Diproses",
  SIAP_DIAMBIL: "Siap Diambil",
  SUDAH_DIAMBIL: "Sudah Diambil",
};

export const PAYMENT_STATUS_LABELS: Record<string, string> = {
  PENDING: "Pending",
  PAID: "Lunas",
  FAILED: "Gagal",
  REFUNDED: "Refund",
};

export const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/dokter", label: "Dokter" },
  { href: "/layanan", label: "Layanan" },
  { href: "/jadwal", label: "Jadwal" },
  { href: "/tentang", label: "Tentang" },
  { href: "/kontak", label: "Kontak" },
];

export const SERVICES = [
  {
    title: "Rawat Jalan",
    description: "Pelayanan konsultasi dokter spesialis secara langsung",
    icon: "Stethoscope",
  },
  {
    title: "Rawat Inap",
    description:
      "Fasilitas rawat inap dengan kamar nyaman dan perawatan 24 jam",
    icon: "Bed",
  },
  {
    title: "UGD 24 Jam",
    description: "Pelayanan gawat darurat 24 jam dengan tim medis siaga",
    icon: "Ambulance",
  },
  {
    title: "Laboratorium",
    description: "Pemeriksaan laboratorium lengkap dengan hasil akurat",
    icon: "FlaskConical",
  },
  {
    title: "Radiologi",
    description: "Pelayanan radiologi dengan teknologi modern",
    icon: "Scan",
  },
  {
    title: "Apotek",
    description: "Apotek 24 jam dengan obat-obatan lengkap",
    icon: "Pill",
  },
  {
    title: "Medical Check Up",
    description: "Paket medical check up lengkap untuk deteksi dini",
    icon: "HeartPulse",
  },
  {
    title: "Operasi",
    description: "Fasilitas operasi dengan standar internasional",
    icon: "Syringe",
  },
];

export const STATS = [
  { value: 150, suffix: "+", label: "Dokter Spesialis" },
  { value: 50000, suffix: "+", label: "Pasien Setiap Tahun" },
  { value: 200, suffix: "+", label: "Ruangan" },
  { value: 5000, suffix: "+", label: "Operasi Berhasil" },
  { value: 98, suffix: "%", label: "Kepuasan Pasien" },
];

export const CONTACT_INFO = {
  address: "Jl. Setiabudi No. 123, Jakarta Selatan, DKI Jakarta 12910",
  phone: "(021) 1234-5678",
  emergency: "119",
  email: "info@rssetiabudi.co.id",
  whatsapp: "6281212345678",
  hours: {
    weekdays: "08:00 - 20:00",
    weekend: "08:00 - 16:00",
    emergency: "24 Jam",
  },
  social: {
    instagram: "https://instagram.com/rssetiabudi",
    facebook: "https://facebook.com/rssetiabudi",
    youtube: "https://youtube.com/@rssetiabudi",
    twitter: "https://twitter.com/rssetiabudi",
  },
};
