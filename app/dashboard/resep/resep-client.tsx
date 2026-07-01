"use client";

import { useState } from "react";
import {
  FileText,
  Search,
  Pill,
  Clock,
  Calendar,
  Stethoscope,
  User,
  Eye,
  X,
  CheckCircle2,
  AlertCircle,
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
import { PRESCRIPTION_STATUS_LABELS } from "@/constants";

interface PrescriptionItem {
  id: string;
  jumlah: number;
  aturanMinum: string | null;
  catatan: string | null;
  medicine: {
    name: string;
    satuan: string | null;
    harga: number;
  };
}

interface PrescriptionData {
  id: string;
  nomorResep: string;
  status: string;
  catatan: string | null;
  qrCode: string | null;
  createdAt: Date;
  doctor: {
    name: string;
    specialization: string | null;
  };
  medicalRecord: {
    patient: { name: string; noRM: string };
    keluhan: string | null;
  };
  items: PrescriptionItem[];
}

interface ResepClientProps {
  session: any;
  prescriptions: PrescriptionData[];
}

const statusColors: Record<string, string> = {
  MENUNGGU: "bg-yellow-100 text-yellow-800 border-yellow-200",
  DIPROSES: "bg-blue-100 text-blue-800 border-blue-200",
  SIAP_DIAMBIL: "bg-green-100 text-green-800 border-green-200",
  SUDAH_DIAMBIL: "bg-gray-100 text-gray-800 border-gray-200",
};

export function ResepClient({ session, prescriptions }: ResepClientProps) {
  const role = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedPrescription, setSelectedPrescription] =
    useState<PrescriptionData | null>(null);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredPrescriptions = prescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.medicalRecord.patient.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      prescription.medicalRecord.patient.noRM
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      prescription.nomorResep.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "ALL" || prescription.status === statusFilter;

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

  const totalHarga = (items: PrescriptionItem[]) => {
    return items.reduce(
      (sum, item) => sum + item.medicine.harga * item.jumlah,
      0,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resep</h1>
          <p className="text-sm text-gray-500 mt-1">Kelola resep obat pasien</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Resep</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {prescriptions.length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-blue-600" />
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
                  {prescriptions.filter((p) => p.status === "MENUNGGU").length}
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
                <p className="text-xs text-gray-500 font-medium">Diproses</p>
                <p className="text-xl font-bold text-blue-600 mt-1">
                  {prescriptions.filter((p) => p.status === "DIPROSES").length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Siap Diambil
                </p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {
                    prescriptions.filter((p) => p.status === "SIAP_DIAMBIL")
                      .length
                  }
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
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
                placeholder="Cari pasien, No. RM, atau No. Resep..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[
                "ALL",
                "MENUNGGU",
                "DIPROSES",
                "SIAP_DIAMBIL",
                "SUDAH_DIAMBIL",
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
                    : PRESCRIPTION_STATUS_LABELS[status] || status}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prescriptions Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No. Resep</TableHead>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Jumlah Item</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-12 text-gray-500"
                  >
                    <FileText className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Belum ada resep</p>
                    <p className="text-xs mt-1">Belum ada data resep obat</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell>
                      <span className="text-sm font-mono font-medium text-gray-900">
                        {prescription.nomorResep}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {getInitials(
                              prescription.medicalRecord.patient.name,
                            )}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {prescription.medicalRecord.patient.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {prescription.medicalRecord.patient.noRM}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {prescription.doctor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {prescription.doctor.specialization || "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {format(
                            new Date(prescription.createdAt),
                            "dd MMM yyyy",
                            { locale: id },
                          )}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-900">
                        {prescription.items.length} item
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-gray-900">
                        {formatCurrency(totalHarga(prescription.items))}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          statusColors[prescription.status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {PRESCRIPTION_STATUS_LABELS[prescription.status] ||
                          prescription.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPrescription(prescription)}
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

      {/* Detail Resep Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Detail Resep
                </h2>
                <p className="text-sm text-gray-500 font-mono mt-1">
                  {selectedPrescription.nomorResep}
                </p>
              </div>
              <button
                onClick={() => setSelectedPrescription(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pasien</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedPrescription.medicalRecord.patient.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPrescription.medicalRecord.patient.noRM}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Dokter</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedPrescription.doctor.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedPrescription.doctor.specialization || "-"}
                  </p>
                </div>
              </div>

              {selectedPrescription.medicalRecord.keluhan && (
                <div>
                  <p className="text-xs text-gray-500 font-medium">Keluhan</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedPrescription.medicalRecord.keluhan}
                  </p>
                </div>
              )}

              {/* Items */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Daftar Obat
                </h3>
                <div className="space-y-2">
                  {selectedPrescription.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-blue-500" />
                          <p className="text-sm font-medium text-gray-900">
                            {item.medicine.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>
                            {item.jumlah} {item.medicine.satuan || "unit"}
                          </span>
                          {item.aturanMinum && (
                            <span>· {item.aturanMinum}</span>
                          )}
                        </div>
                        {item.catatan && (
                          <p className="text-xs text-gray-400 mt-1">
                            Catatan: {item.catatan}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatCurrency(item.medicine.harga * item.jumlah)}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{formatCurrency(item.medicine.harga)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-900">
                    Total Harga
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(totalHarga(selectedPrescription.items))}
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="border-t pt-4 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Status</p>
                <Badge
                  variant="outline"
                  className={`text-xs ${
                    statusColors[selectedPrescription.status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {PRESCRIPTION_STATUS_LABELS[selectedPrescription.status] ||
                    selectedPrescription.status}
                </Badge>
              </div>

              {selectedPrescription.catatan && (
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Catatan Resep
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedPrescription.catatan}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedPrescription(null)}
                >
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
