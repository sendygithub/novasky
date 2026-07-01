import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { BookingClient } from "./booking-client";

async function getBookings(userId: string, role: string) {
  const whereClause: any = {};

  if (role === "PASIEN") {
    const patient = await prisma.patient.findUnique({
      where: { userId },
    });
    if (patient) {
      whereClause.patientId = patient.id;
    }
  }

  const bookings = await prisma.booking.findMany({
    where: whereClause,
    orderBy: { bookingDate: "desc" },
    include: {
      patient: {
        select: { name: true, noRM: true, phone: true },
      },
      doctor: {
        select: { name: true, specialization: true },
      },
      schedule: {
        select: { day: true, startTime: true, endTime: true },
      },
      payment: {
        select: { total: true, status: true },
      },
    },
  });

  return bookings;
}

async function getDoctors() {
  return prisma.doctor.findMany({
    where: { status: "AKTIF" },
    select: {
      id: true,
      name: true,
      specialization: true,
    },
    orderBy: { name: "asc" },
  });
}

async function getSpecializations() {
  return prisma.specialization.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

async function getDepartments() {
  return prisma.department.findMany({
    where: { isActive: true },
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
}

export default async function BookingPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [bookings, doctors, specializations, departments] = await Promise.all([
    getBookings(session.id, session.role),
    getDoctors(),
    getSpecializations(),
    getDepartments(),
  ]);

  return (
    <BookingClient
      session={session}
      bookings={bookings}
      doctors={doctors}
      specializations={specializations}
      departments={departments}
    />
  );
}
