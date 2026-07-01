import type {
  UserRole,
  BookingStatus,
  PaymentStatus,
  PrescriptionStatus,
} from "@prisma/client";

export interface SessionUser {
  id: string;
  name?: string | null;
  email?: string | null;
  role: UserRole;
  image?: string | null;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalBookings: number;
  totalRevenue: number;
  todayBookings: number;
  pendingPayments: number;
  availableRooms: number;
  satisfactionRate: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface BookingWithRelations {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  bookingDate: Date;
  bookingTime: string;
  queueNumber: number;
  status: BookingStatus;
  keluhan: string | null;
  qrCode: string | null;
  createdAt: Date;
  patient: {
    name: string;
    noRM: string;
    phone: string | null;
  };
  doctor: {
    name: string;
    specialization: string | null;
  };
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  };
  payment: {
    total: number;
    status: PaymentStatus;
  } | null;
}

export interface MedicalRecordWithRelations {
  id: string;
  keluhan: string | null;
  tekananDarah: string | null;
  beratBadan: number | null;
  tinggiBadan: number | null;
  suhuTubuh: number | null;
  catatan: string | null;
  tindakan: string | null;
  createdAt: Date;
  doctor: {
    name: string;
    specialization: string | null;
  };
  diagnoses: {
    penyakit: string;
    icdCode: string | null;
    catatan: string | null;
  }[];
  prescriptions: {
    nomorResep: string;
    status: PrescriptionStatus;
    items: {
      medicine: { name: string };
      jumlah: number;
      aturanMinum: string | null;
    }[];
  }[];
}
