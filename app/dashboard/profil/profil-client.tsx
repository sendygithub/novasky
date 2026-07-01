"use client";

import { useState } from "react";
import {
  UserCircle,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Shield,
  Save,
  Loader2,
  Camera,
  Heart,
  Droplets,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { ROLE_LABELS } from "@/constants";

interface ProfilClientProps {
  session: any;
  user: any;
}

export function ProfilClient({ session, user }: ProfilClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    // Patient fields
    nik: user.patient?.nik || "",
    tempatLahir: user.patient?.tempatLahir || "",
    tanggalLahir: user.patient?.tanggalLahir
      ? format(new Date(user.patient.tanggalLahir), "yyyy-MM-dd")
      : "",
    alamat: user.patient?.alamat || "",
    golonganDarah: user.patient?.golonganDarah || "",
    bpjs: user.patient?.bpjs || "",
    asuransi: user.patient?.asuransi || "",
    kontakDarurat: user.patient?.kontakDarurat || "",
    kontakDaruratPhone: user.patient?.kontakDaruratPhone || "",
  });

  const getInitials = (name: string) => {
    return name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const data = await res.json();
        alert(data.error || "Gagal menyimpan profil");
      }
    } catch {
      alert("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const roleLabel = ROLE_LABELS[user.role] || user.role;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profil</h1>
          <p className="text-sm text-gray-500 mt-1">
            Kelola informasi profil Anda
          </p>
        </div>
        <Button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={saving}
          className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Menyimpan...
            </>
          ) : isEditing ? (
            <>
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </>
          ) : (
            <>
              <UserCircle className="h-4 w-4 mr-2" />
              Edit Profil
            </>
          )}
        </Button>
      </div>

      {success && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
          <CheckCircle2 className="h-5 w-5" />
          <span className="text-sm font-medium">
            Profil berhasil diperbarui!
          </span>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl">
                      {getInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-blue-600 text-white hover:bg-blue-700">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-gray-900 mt-4">
                  {user.name}
                </h2>
                <Badge className="mt-1">{roleLabel}</Badge>
                <p className="text-sm text-gray-500 mt-2">{user.email}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Bergabung{" "}
                  {format(new Date(user.createdAt), "dd MMMM yyyy", {
                    locale: id,
                  })}
                </p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {user.isVerified ? "Terverifikasi" : "Belum Verifikasi"}
                  </span>
                  {user.isVerified ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                {user.patient?.noRM && (
                  <div className="flex items-center gap-3 text-sm">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">
                      No. RM: {user.patient.noRM}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detail Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informasi Akun */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informasi Akun</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama Lengkap
                  </label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input value={user.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    No. Telepon
                  </label>
                  <Input
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informasi Pribadi (for PASIEN role) */}
          {user.role === "PASIEN" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      NIK
                    </label>
                    <Input
                      value={formData.nik}
                      onChange={(e) =>
                        setFormData({ ...formData, nik: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tempat Lahir
                    </label>
                    <Input
                      value={formData.tempatLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tempatLahir: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tanggal Lahir
                    </label>
                    <Input
                      type="date"
                      value={formData.tanggalLahir}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          tanggalLahir: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Golongan Darah
                    </label>
                    <select
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
                      value={formData.golonganDarah}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          golonganDarah: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    >
                      <option value="">Pilih Golongan Darah</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="AB">AB</option>
                      <option value="O">O</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alamat
                    </label>
                    <textarea
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] disabled:bg-gray-50 disabled:text-gray-500"
                      value={formData.alamat}
                      onChange={(e) =>
                        setFormData({ ...formData, alamat: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informasi BPJS / Asuransi (for PASIEN role) */}
          {user.role === "PASIEN" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">BPJS & Asuransi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. BPJS
                    </label>
                    <Input
                      value={formData.bpjs}
                      onChange={(e) =>
                        setFormData({ ...formData, bpjs: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asuransi Lain
                    </label>
                    <Input
                      value={formData.asuransi}
                      onChange={(e) =>
                        setFormData({ ...formData, asuransi: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Kontak Darurat (for PASIEN role) */}
          {user.role === "PASIEN" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Kontak Darurat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Kontak
                    </label>
                    <Input
                      value={formData.kontakDarurat}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kontakDarurat: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      No. Telepon
                    </label>
                    <Input
                      value={formData.kontakDaruratPhone}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          kontakDaruratPhone: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tombol Aksi */}
          {isEditing && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsEditing(false)}
              >
                Batal
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Simpan Perubahan
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
