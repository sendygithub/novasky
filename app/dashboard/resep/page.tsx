import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ResepClient } from "./resep-client";

async function getPrescriptions(userId: string, role: string) {
  const whereClause: any = {};

  if (role === "PASIEN") {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });
    if (patient) {
      whereClause.medicalRecord = { patientId: patient.id };
    }
  } else if (role === "DOKTER") {
    const doctor = await prisma.doctor.findUnique({
      where: { userId },
    });
    if (doctor) {
      whereClause.doctorId = doctor.id;
    }
  }

  const prescriptions = await prisma.prescription.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      doctor: {
        select: { name: true, specialization: true },
      },
      medicalRecord: {
        select: {
          patient: { select: { name: true, noRM: true } },
          keluhan: true,
        },
      },
      items: {
        include: {
          medicine: { select: { name: true, satuan: true, harga: true } },
        },
      },
    },
  });

  return prescriptions;
}

export default async function ResepPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const prescriptions = await getPrescriptions(session.id, session.role);

  return <ResepClient session={session} prescriptions={prescriptions} />;
}
