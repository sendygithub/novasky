import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { PenayaranClient } from "../penayaran/penayaran-client";

async function getPayments(userId: string, role: string) {
  const whereClause: any = {};

  if (role === "PASIEN") {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });
    if (patient) {
      whereClause.booking = { patientId: patient.id };
    }
  }

  const payments = await prisma.payment.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    include: {
      booking: {
        select: {
          id: true,
          bookingDate: true,
          queueNumber: true,
          patient: { select: { name: true, noRM: true } },
          doctor: { select: { name: true, specialization: true } },
        },
      },
      invoice: {
        select: { nomorInvoice: true },
      },
    },
  });

  return payments;
}

export default async function PembayaranPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const payments = await getPayments(session.id, session.role);

  return <PenayaranClient session={session} payments={payments} />;
}
