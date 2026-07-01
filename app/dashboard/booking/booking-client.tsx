"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Search,
  Plus,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Phone,
  FileText,
  X,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  MoreHorizontal,
  ArrowUpDown,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { BOOKING_STATUS_LABELS, BOOKING_STATUS_COLORS } from "@/constants";

interface BookingData {
  id: string;
  patientId: string;
  doctorId: string;
  scheduleId: string;
  departmentId: string | null;
  specializationId: string | null;
  bookingDate: Date;
  bookingTime: string;
  queueNumber: number;
  status: string;
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
    status: string;
  } | null;
}

interface DoctorData {
  id: string;
  name: string;
  specialization: string | null;
}

interface SpecializationData {
  id: string;
  name: string;
}

interface DepartmentData {
  id: string;
  name: string;
}

interface BookingClientProps {
  session: any;
  bookings: BookingData[];
  doctors: DoctorData[];
  specializations: SpecializationData[];
  departments: DepartmentData[];
}

const statusColors: Record<string, string> = {
  MENUNGGU: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DIKONFIRMASI: "bg-blue-100 text-blue-800 border-blue-200",
  CHECKED_IN: "bg-green-100 text-green-800 border-green-200",
  SELESAI: "bg-gray-100 text-gray-800 border-gray-200",
  BATAL: "bg-red-100 text-red-800 border-red-200",
};

export function BookingClient({
  session,
  bookings,
  doctors,
  specializations,
  departments,
}: BookingClientProps) {
  const role = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );

  // New booking form state
  const [formData, setFormData] = useState({
    doctorId: "",
    specializationId: "",
    departmentId: "",
    bookingDate: "",
    bookingTime: "",
    keluhan: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.patient.noRM.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.doctor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleNewBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        const data = await res.json();
        alert(data.error || "Gagal membuat booking");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Yakin ingin membatalkan booking ini?")) return;
    try {
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "BATAL" }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch {
      alert("Gagal membatalkan booking");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booking</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola janji temu pasien dengan dokter
          </p>
        </div>
        <div className="flex items-center gap-3">
          {role === "PASIEN" && (
            <Button
              onClick={() => setShowNewBooking(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Booking Baru
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {bookings.length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <CalendarCheck className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Menunggu</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {bookings.filter((b) => b.status === "MENUNGGU").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Selesai</p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {bookings.filter((b) => b.status === "SELESAI").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Batal</p>
                <p className="text-xl font-bold text-red-600 mt-1">
                  {bookings.filter((b) => b.status === "BATAL").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="h-4 w-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari pasien, dokter, atau No. RM..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                "ALL",
                "MENUNGGU",
                "DIKONFIRMASI",
                "CHECKED_IN",
                "SELESAI",
                "BATAL",
              ].map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="whitespace-nowrap"
                >
                  {status === "ALL"
                    ? "Semua"
                    : BOOKING_STATUS_LABELS[status] || status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jam</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pembayaran</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-500"
                  >
                    <CalendarCheck className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Belum ada booking</p>
                    <p className="text-xs mt-1">
                      {role === "PASIEN"
                        ? "Buat booking baru untuk memulai"
                        : "Belum ada data booking"}
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredBookings.map((booking, index) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {getInitials(booking.patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {booking.patient.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.patient.noRM}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {booking.doctor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.doctor.specialization || "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {format(
                            new Date(booking.bookingDate),
                            "dd MMM yyyy",
                            { locale: id },
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{booking.bookingTime}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          statusColors[booking.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {BOOKING_STATUS_LABELS[booking.status] ||
                          booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {booking.payment ? (
                        <Badge
                          variant={
                            booking.payment.status === "PAID"
                              ? "success"
                              : "warning"
                          }
                          className="text-xs"
                        >
                          {booking.payment.status === "PAID"
                            ? "Lunas"
                            : "Pending"}
                        </Badge>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {(role === "ADMIN" ||
                          (role === "PASIEN" &&
                            booking.status === "MENUNGGU")) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleCancelBooking(booking.id)}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* New Booking Modal */}
      {showNewBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Booking Baru
              </h2>
              <button
                onClick={() => setShowNewBooking(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleNewBooking} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dokter
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.doctorId}
                  onChange={(e) =>
                    setFormData({ ...formData, doctorId: e.target.value })
                  }
                  required
                >
                  <option value="">Pilih Dokter</option>
                  {doctors.map((doctor) => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialization || "Umum"}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Poli / Spesialisasi
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.specializationId}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      specializationId: e.target.value,
                    })
                  }
                >
                  <option value="">Pilih Poli</option>
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.id}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal
                </label>
                <Input
                  type="date"
                  value={formData.bookingDate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bookingDate: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Jam
                </label>
                <Input
                  type="time"
                  value={formData.bookingTime}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      bookingTime: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Keluhan
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Jelaskan keluhan Anda..."
                  value={formData.keluhan}
                  onChange={(e) =>
                    setFormData({ ...formData, keluhan: e.target.value })
                  }
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowNewBooking(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Buat Booking"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Detail Booking
              </h2>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pasien</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedBooking.patient.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedBooking.patient.noRM}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    No. Antrian
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    #{selectedBooking.queueNumber}
                  </p>
                </div>
              </div>
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Dokter</p>
                    <p className="text-sm text-gray-900">
                      {selectedBooking.doctor.name}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Tanggal & Jam</p>
                    <p className="text-sm text-gray-900">
                      {format(
                        new Date(selectedBooking.bookingDate),
                        "dd MMMM yyyy",
                        { locale: id },
                      )}{" "}
                      · {selectedBooking.bookingTime}
                    </p>
                  </div>
                </div>
                {selectedBooking.keluhan && (
                  <div className="flex items-start gap-3">
                    <FileText className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Keluhan</p>
                      <p className="text-sm text-gray-900">
                        {selectedBooking.keluhan}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 font-medium">Status</p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      statusColors[selectedBooking.status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {BOOKING_STATUS_LABELS[selectedBooking.status] ||
                      selectedBooking.status}
                  </Badge>
                </div>
                {selectedBooking.payment && (
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-gray-500 font-medium">
                      Pembayaran
                    </p>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(selectedBooking.payment.total)}
                      </p>
                      <Badge
                        variant={
                          selectedBooking.payment.status === "PAID"
                            ? "success"
                            : "warning"
                        }
                        className="text-xs mt-1"
                      >
                        {selectedBooking.payment.status === "PAID"
                          ? "Lunas"
                          : "Pending"}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedBooking(null)}
                >
                  Tutup
                </Button>
                {(role === "ADMIN" ||
                  (role === "PASIEN" &&
                    selectedBooking.status === "MENUNGGU")) && (
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleCancelBooking(selectedBooking.id);
                      setSelectedBooking(null);
                    }}
                  >
                    Batalkan Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
