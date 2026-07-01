"use client";

import { useState } from "react";
import {
  CreditCard,
  Search,
  Calendar,
  Stethoscope,
  User,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  FileText,
  Printer,
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
import { PAYMENT_STATUS_LABELS, PAYMENT_METHODS } from "@/constants";

interface PaymentData {
  id: string;
  biayaKonsultasi: number;
  biayaObat: number;
  biayaLab: number;
  biayaRadiologi: number;
  biayaRawatInap: number;
  total: number;
  metode: string | null;
  status: string;
  paidAt: Date | null;
  createdAt: Date;
  booking: {
    id: string;
    bookingDate: Date;
    queueNumber: number;
    patient: { name: string; noRM: string };
    doctor: { name: string; specialization: string | null };
  };
  invoice: {
    nomorInvoice: string;
  } | null;
}

interface PenayaranClientProps {
  session: any;
  payments: PaymentData[];
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
  PAID: "bg-green-100 text-green-800 border-green-200",
  FAILED: "bg-red-100 text-red-800 border-red-200",
  REFUNDED: "bg-gray-100 text-gray-800 border-gray-200",
};

export function PenayaranClient({ session, payments }: PenayaranClientProps) {
  const role = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedPayment, setSelectedPayment] = useState<PaymentData | null>(
    null,
  );

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.booking.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      payment.booking.patient.noRM
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (payment.invoice?.nomorInvoice || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || payment.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getMetodeLabel = (metode: string | null) => {
    if (!metode) return "-";
    const found = PAYMENT_METHODS.find((m) => m.value === metode);
    return found?.label || metode;
  };

  const totalRevenue = payments
    .filter((p) => p.status === "PAID")
    .reduce((sum, p) => sum + p.total, 0);

  const totalPending = payments
    .filter((p) => p.status === "PENDING")
    .reduce((sum, p) => sum + p.total, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola pembayaran dan transaksi
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Total Transaksi
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {payments.length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Lunas</p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {payments.filter((p) => p.status === "PAID").length}
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
                <p className="text-xs text-gray-500 font-medium">Pending</p>
                <p className="text-xl font-bold text-yellow-600 mt-1">
                  {payments.filter((p) => p.status === "PENDING").length}
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
                <p className="text-xs text-gray-500 font-medium">Pendapatan</p>
                <p className="text-xl font-bold text-emerald-600 mt-1">
                  {formatCurrency(totalRevenue)}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                <DollarSign className="h-4 w-4 text-emerald-600" />
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
                placeholder="Cari pasien, No. RM, atau No. Invoice..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["ALL", "PENDING", "PAID", "FAILED", "REFUNDED"].map(
                (status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? "default" : "outline"}
                    size="sm"
                    onClick={() => setStatusFilter(status)}
                    className="whitespace-nowrap"
                  >
                    {status === "ALL"
                      ? "Semua"
                      : PAYMENT_STATUS_LABELS[status] || status}
                  </Button>
                ),
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payments Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-500"
                  >
                    <CreditCard className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Belum ada pembayaran</p>
                    <p className="text-xs mt-1">
                      Belum ada data transaksi pembayaran
                    </p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <span className="text-sm font-mono font-medium text-gray-900">
                        {payment.invoice?.nomorInvoice || "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {getInitials(payment.booking.patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {payment.booking.patient.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {payment.booking.patient.noRM}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {payment.booking.doctor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {payment.booking.doctor.specialization || "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {format(new Date(payment.createdAt), "dd MMM yyyy", {
                            locale: id,
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(payment.total)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600">
                        {getMetodeLabel(payment.metode)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          statusColors[payment.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {PAYMENT_STATUS_LABELS[payment.status] ||
                          payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Pembayaran Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Pembayaran
                </h2>
                <p className="text-sm text-gray-500 font-mono mt-1">
                  {selectedPayment.invoice?.nomorInvoice || "No Invoice"}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pasien</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedPayment.booking.patient.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPayment.booking.patient.noRM}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Dokter</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedPayment.booking.doctor.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPayment.booking.doctor.specialization || "-"}
                  </p>
                </div>
              </div>

              {/* Rincian Biaya */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Rincian Biaya
                </h3>
                <div className="space-y-2">
                  {selectedPayment.biayaKonsultasi > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Biaya Konsultasi</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayment.biayaKonsultasi)}
                      </span>
                    </div>
                  )}
                  {selectedPayment.biayaObat > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Biaya Obat</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayment.biayaObat)}
                      </span>
                    </div>
                  )}
                  {selectedPayment.biayaLab > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Biaya Laboratorium</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayment.biayaLab)}
                      </span>
                    </div>
                  )}
                  {selectedPayment.biayaRadiologi > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Biaya Radiologi</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayment.biayaRadiologi)}
                      </span>
                    </div>
                  )}
                  {selectedPayment.biayaRawatInap > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Biaya Rawat Inap</span>
                      <span className="text-gray-900">
                        {formatCurrency(selectedPayment.biayaRawatInap)}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(selectedPayment.total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status & Metode */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      statusColors[selectedPayment.status] ||
                      "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {PAYMENT_STATUS_LABELS[selectedPayment.status] ||
                      selectedPayment.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Metode Pembayaran</p>
                  <span className="text-sm font-medium text-gray-900">
                    {getMetodeLabel(selectedPayment.metode)}
                  </span>
                </div>
                {selectedPayment.paidAt && (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Tanggal Bayar</p>
                    <span className="text-sm text-gray-900">
                      {format(
                        new Date(selectedPayment.paidAt),
                        "dd MMM yyyy, HH:mm",
                        {
                          locale: id,
                        },
                      )}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedPayment(null)}
                >
                  Tutup
                </Button>
                {selectedPayment.status === "PAID" && (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Printer className="h-4 w-4 mr-2" />
                    Cetak Invoice
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
