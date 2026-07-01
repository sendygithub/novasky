"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  Stethoscope,
  CalendarCheck,
  DollarSign,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  UserPlus,
  Calendar,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Search,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { id } from "date-fns/locale";

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalBookings: number;
  totalAppointmentsToday: number;
  totalPayments: number;
  totalRevenue: number;
  recentBookings: {
    id: string;
    patientName: string;
    noRM: string;
    doctorName: string;
    status: string;
    date: Date;
    queueNumber: number;
  }[];
  recentPatients: {
    id: string;
    name: string;
    noRM: string;
    gender: string | null;
    createdAt: Date;
  }[];
}

interface DashboardClientProps {
  session: any;
  stats: DashboardStats;
}

const statusColors: Record<string, string> = {
  MENUNGGU: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DIKONFIRMASI: "bg-blue-100 text-blue-800 border-blue-200",
  CHECKED_IN: "bg-green-100 text-green-800 border-green-200",
  SELESAI: "bg-gray-100 text-gray-800 border-gray-200",
  BATAL: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<string, string> = {
  MENUNGGU: "Menunggu",
  DIKONFIRMASI: "Dikonfirmasi",
  CHECKED_IN: "Check In",
  SELESAI: "Selesai",
  BATAL: "Batal",
};

export function DashboardClient({ session, stats }: DashboardClientProps) {
  const role = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Selamat datang, {session?.user?.name}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(), "EEEE, dd MMMM yyyy", { locale: id })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari..."
              className="pl-9 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Link href="/dashboard/booking">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="h-4 w-4 mr-2" />
              Buat Janji
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Pasien
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPatients}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+12% bulan ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Dokter Aktif
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalDoctors}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+3 dokter baru</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Booking
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalBookings}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <CalendarCheck className="h-5 w-5 text-purple-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+8% minggu ini</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Janji Hari Ini
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalAppointmentsToday}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-amber-600">
              <AlertCircle className="h-3 w-3" />
              <span>{stats.totalAppointmentsToday} menunggu</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-cyan-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pembayaran</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPayments}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cyan-100 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-cyan-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>Lunas</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Pendapatan</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {formatCurrency(stats.totalRevenue)}
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3" />
              <span>+15% bulan ini</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings & Patients */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Booking Terbaru
            </CardTitle>
            <Link href="/dashboard/booking">
              <Button variant="ghost" size="sm" className="text-blue-600">
                Lihat Semua
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentBookings.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <CalendarCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Belum ada booking</p>
                </div>
              ) : (
                stats.recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                          {getInitials(booking.patientName)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {booking.patientName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.doctorName} · No. {booking.queueNumber}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        statusColors[booking.status] ||
                        "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {statusLabels[booking.status] || booking.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Patients */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-semibold">
              Pasien Terbaru
            </CardTitle>
            <Link href="/dashboard/pasien">
              <Button variant="ghost" size="sm" className="text-blue-600">
                Lihat Semua
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {stats.recentPatients.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p className="text-sm">Belum ada pasien</p>
                </div>
              ) : (
                stats.recentPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-green-100 text-green-700 text-xs">
                          {getInitials(patient.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {patient.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {patient.noRM} ·{" "}
                          {format(new Date(patient.createdAt), "dd MMM yyyy", {
                            locale: id,
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className="text-xs bg-green-50 text-green-700 border-green-200"
                    >
                      Baru
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              href="/dashboard/booking"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <CalendarCheck className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-blue-700">
                Booking Baru
              </span>
            </Link>
            <Link
              href="/dashboard/pasien"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <UserPlus className="h-6 w-6 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-green-700">
                Pasien Baru
              </span>
            </Link>
            <Link
              href="/dashboard/antrian"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors group"
            >
              <Activity className="h-6 w-6 text-amber-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-amber-700">
                Antrian
              </span>
            </Link>
            <Link
              href="/dashboard/pembayaran"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors group"
            >
              <DollarSign className="h-6 w-6 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-purple-700">
                Pembayaran
              </span>
            </Link>
            <Link
              href="/dashboard/resep"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-cyan-50 hover:bg-cyan-100 transition-colors group"
            >
              <Eye className="h-6 w-6 text-cyan-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-cyan-700">Resep</span>
            </Link>
            <Link
              href="/dashboard/laporan"
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors group"
            >
              <TrendingUp className="h-6 w-6 text-rose-600 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-rose-700">Laporan</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
