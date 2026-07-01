import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

async function getDashboardStats() {
  const [
    totalPatients,
    totalDoctors,
    totalBookings,
    totalAppointmentsToday,
    totalPayments,
    totalRevenue,
    recentBookings,
    recentPatients,
  ] = await Promise.all([
    prisma.patient.count(),
    prisma.doctor.count({ where: { status: "AKTIF" } }),
    prisma.booking.count(),
    prisma.booking.count({
      where: {
        bookingDate: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lte: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      },
    }),
    prisma.payment.count({ where: { status: "PAID" } }),
    prisma.payment.aggregate({
      _sum: { total: true },
      where: { status: "PAID" },
    }),
    prisma.booking.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        patient: { select: { name: true, noRM: true } },
        doctor: { select: { name: true } },
      },
    }),
    prisma.patient.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        noRM: true,
        gender: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalPatients,
    totalDoctors,
    totalBookings,
    totalAppointmentsToday,
    totalPayments,
    totalRevenue: totalRevenue._sum.total || 0,
    recentBookings: recentBookings.map((b) => ({
      id: b.id,
      patientName: b.patient.name,
      noRM: b.patient.noRM,
      doctorName: b.doctor.name,
      status: b.status,
      date: b.bookingDate,
      queueNumber: b.queueNumber,
    })),
    recentPatients: recentPatients.map((p) => ({
      id: p.id,
      name: p.name,
      noRM: p.noRM,
      gender: p.gender,
      createdAt: p.createdAt,
    })),
  };
}

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const stats = await getDashboardStats();

  return <DashboardClient session={session} stats={stats} />;
}
