"use client";

import { useState } from "react";
import {
  ClipboardList,
  Search,
  Calendar,
  Stethoscope,
  User,
  Eye,
  X,
  Heart,
  Weight,
  Thermometer,
  Activity,
  Pill,
  FileText,
  AlertCircle,
  Syringe,
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

interface DiagnosisData {
  penyakit: string;
  icdCode: string | null;
  catatan: string | null;
}

interface PrescriptionItemData {
  medicine: { name: string };
  jumlah: number;
  aturanMinum: string | null;
}

interface PrescriptionData {
  nomorResep: string;
  status: string;
  items: PrescriptionItemData[];
}

interface MedicalRecordData {
  id: string;
  keluhan: string | null;
  tekananDarah: string | null;
  beratBadan: number | null;
  tinggiBadan: number | null;
  suhuTubuh: number | null;
  catatan: string | null;
  tindakan: string | null;
  createdAt: Date;
  patient: {
    name: string;
    noRM: string;
    gender: string | null;
    golonganDarah: string | null;
  };
  doctor: {
    name: string;
    specialization: string | null;
  };
  diagnoses: DiagnosisData[];
  prescriptions: PrescriptionData[];
}

interface RekamMedisClientProps {
  session: any;
  records: MedicalRecordData[];
}

export function RekamMedisClient({ session, records }: RekamMedisClientProps) {
  const role = session?.user?.role;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] =
    useState<MedicalRecordData | null>(null);

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.patient.noRM.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Rekam Medis</h1>
          <p className="text-sm text-gray-500 mt-1">
            Riwayat pemeriksaan dan rekam medis pasien
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
                  Total Rekam Medis
                </p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {records.length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <ClipboardList className="h-4 w-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Dengan Diagnosa
                </p>
                <p className="text-xl font-bold text-purple-600 mt-1">
                  {records.filter((r) => r.diagnoses.length > 0).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">
                <Activity className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Dengan Resep
                </p>
                <p className="text-xl font-bold text-green-600 mt-1">
                  {records.filter((r) => r.prescriptions.length > 0).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Pill className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Dengan Tindakan
                </p>
                <p className="text-xl font-bold text-amber-600 mt-1">
                  {records.filter((r) => r.tindakan).length}
                </p>
              </div>
              <div className="h-8 w-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <Syringe className="h-4 w-4 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Cari pasien, No. RM, atau dokter..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Records Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pasien</TableHead>
                <TableHead>Dokter</TableHead>
                <TableHead>Tanggal</TableHead>
                <TableHead>Diagnosa</TableHead>
                <TableHead>Tindakan</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-gray-500"
                  >
                    <ClipboardList className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm font-medium">Belum ada rekam medis</p>
                    <p className="text-xs mt-1">Belum ada data rekam medis</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">
                            {getInitials(record.patient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {record.patient.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {record.patient.noRM}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-900">
                            {record.doctor.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {record.doctor.specialization || "-"}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">
                          {format(new Date(record.createdAt), "dd MMM yyyy", {
                            locale: id,
                          })}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {record.diagnoses.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {record.diagnoses.slice(0, 2).map((d, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                            >
                              {d.penyakit}
                            </Badge>
                          ))}
                          {record.diagnoses.length > 2 && (
                            <span className="text-xs text-gray-400">
                              +{record.diagnoses.length - 2}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {record.tindakan ? (
                        <span className="text-sm text-gray-900">
                          {record.tindakan.length > 30
                            ? record.tindakan.substring(0, 30) + "..."
                            : record.tindakan}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedRecord(record)}
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

      {/* Detail Rekam Medis Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-semibold text-gray-900">
                Detail Rekam Medis
              </h2>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {getInitials(selectedRecord.patient.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedRecord.patient.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedRecord.patient.noRM}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {selectedRecord.patient.gender === "LAKI_LAKI"
                          ? "Laki-laki"
                          : selectedRecord.patient.gender === "PEREMPUAN"
                            ? "Perempuan"
                            : "-"}
                      </Badge>
                      {selectedRecord.patient.golonganDarah && (
                        <Badge variant="outline" className="text-xs">
                          Gol. Darah: {selectedRecord.patient.golonganDarah}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Dokter</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">
                    {selectedRecord.doctor.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedRecord.doctor.specialization || "-"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {format(
                      new Date(selectedRecord.createdAt),
                      "dd MMMM yyyy, HH:mm",
                      { locale: id },
                    )}
                  </p>
                </div>
              </div>

              {/* Vital Signs */}
              <div className="border-t pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Tanda Vital
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {selectedRecord.tekananDarah && (
                    <div className="p-3 rounded-lg bg-red-50">
                      <div className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-gray-500">
                          Tekanan Darah
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedRecord.tekananDarah}
                      </p>
                    </div>
                  )}
                  {selectedRecord.beratBadan && (
                    <div className="p-3 rounded-lg bg-blue-50">
                      <div className="flex items-center gap-2">
                        <Weight className="h-4 w-4 text-blue-500" />
                        <span className="text-xs text-gray-500">
                          Berat Badan
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedRecord.beratBadan} kg
                      </p>
                    </div>
                  )}
                  {selectedRecord.tinggiBadan && (
                    <div className="p-3 rounded-lg bg-green-50">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-gray-500">
                          Tinggi Badan
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedRecord.tinggiBadan} cm
                      </p>
                    </div>
                  )}
                  {selectedRecord.suhuTubuh && (
                    <div className="p-3 rounded-lg bg-amber-50">
                      <div className="flex items-center gap-2">
                        <Thermometer className="h-4 w-4 text-amber-500" />
                        <span className="text-xs text-gray-500">
                          Suhu Tubuh
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-gray-900 mt-1">
                        {selectedRecord.suhuTubuh}°C
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Keluhan */}
              {selectedRecord.keluhan && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 font-medium">Keluhan</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedRecord.keluhan}
                  </p>
                </div>
              )}

              {/* Diagnoses */}
              {selectedRecord.diagnoses.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Diagnosa
                  </h3>
                  <div className="space-y-2">
                    {selectedRecord.diagnoses.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-purple-50 border border-purple-100"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {d.penyakit}
                          </p>
                          {d.icdCode && (
                            <Badge
                              variant="outline"
                              className="text-xs bg-purple-100 text-purple-700"
                            >
                              {d.icdCode}
                            </Badge>
                          )}
                        </div>
                        {d.catatan && (
                          <p className="text-xs text-gray-500 mt-1">
                            {d.catatan}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tindakan */}
              {selectedRecord.tindakan && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 font-medium">Tindakan</p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedRecord.tindakan}
                  </p>
                </div>
              )}

              {/* Catatan */}
              {selectedRecord.catatan && (
                <div className="border-t pt-4">
                  <p className="text-xs text-gray-500 font-medium">
                    Catatan Dokter
                  </p>
                  <p className="text-sm text-gray-900 mt-1">
                    {selectedRecord.catatan}
                  </p>
                </div>
              )}

              {/* Prescriptions */}
              {selectedRecord.prescriptions.length > 0 && (
                <div className="border-t pt-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Resep Obat
                  </h3>
                  <div className="space-y-3">
                    {selectedRecord.prescriptions.map((prescription, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg bg-gray-50 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-mono font-medium text-gray-900">
                            {prescription.nomorResep}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              prescription.status === "MENUNGGU"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : prescription.status === "DIPROSES"
                                  ? "bg-blue-50 text-blue-700 border-blue-200"
                                  : prescription.status === "SIAP_DIAMBIL"
                                    ? "bg-green-50 text-green-700 border-green-200"
                                    : "bg-gray-50 text-gray-700 border-gray-200"
                            }`}
                          >
                            {PRESCRIPTION_STATUS_LABELS[prescription.status] ||
                              prescription.status}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {prescription.items.map((item, j) => (
                            <div
                              key={j}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Pill className="h-3 w-3 text-blue-500" />
                              <span className="text-gray-900">
                                {item.medicine.name}
                              </span>
                              <span className="text-gray-500">
                                {item.jumlah}x
                              </span>
                              {item.aturanMinum && (
                                <span className="text-gray-400">
                                  · {item.aturanMinum}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setSelectedRecord(null)}
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
