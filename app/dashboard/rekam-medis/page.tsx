import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { RekamMedisClient } from "./rekam-medis-client";

async function getMedicalRecords(userId: string, role: string) {
  const whereClause: any = {};

  if (role === "PASIEN") {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });
    if (patient) {
      whereClause.patientId = patient.id;
    }
  } else if (role === "DOKTER") {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });
    if (doctor) {
      whereClause.doctorId = doctor.id;
    }
  }

  const records = await prisma.medicalRecord.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      patient: {
        select: { name: true, noRM: true, gender: true, golonganDarah: true },
      },
      doctor: {
        select: { name: true, specialization: true },
      },
      diagnoses: {
        select: { penyakit: true, icdCode: true, catatan: true },
      },
      prescriptions: {
        select: {
          nomorResep: true,
          status: true,
          items: {
            select: {
              medicine: { select: { name: true } },
              jumlah: true,
              aturanMinum: true,
            },
          },
        },
      },
    },
  });

  return records;
}

export default async function RekamMedisPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const records = await getMedicalRecords(session.id, session.role);

  return <RekamMedisClient session={session} records={records} />;
}
