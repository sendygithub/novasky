"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  XCircle,
  ArrowRight,
  User,
  Mail,
  Lock,
} from "lucide-react";

export default function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Password validation states
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChecks = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasMatch: password === confirmPassword && confirmPassword.length > 0,
  };

  const allChecksPassed = Object.values(passwordChecks).every(Boolean);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!allChecksPassed) {
      setError("Pastikan semua persyaratan password terpenuhi.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const passwordValue = formData.get("password");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password: passwordValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registrasi gagal. Silakan coba lagi.");
        setLoading(false);
        return;
      }

      setSuccess(true);

      // Auto-login after 1.5s delay
      setTimeout(async () => {
        await signIn("credentials", {
          email,
          password: passwordValue,
          callbackUrl: "/dashboard",
        });
      }, 1500);
    } catch {
      setError("Terjadi kesalahan jaringan. Silakan coba lagi.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card className="border-emerald-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <CardContent className="p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/20">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-100">
            Registrasi Berhasil!
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            Akun Anda telah dibuat. Mengarahkan ke dashboard...
          </p>
          <div className="mt-4 flex justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-emerald-400" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-zinc-300 text-xs uppercase tracking-wider"
            >
              Nama Lengkap
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Nova Haryanto"
                className="pl-9 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                required
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-zinc-300 text-xs uppercase tracking-wider"
            >
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="trader@email.com"
                className="pl-9 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-zinc-300 text-xs uppercase tracking-wider"
            >
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-10 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-zinc-300 text-xs uppercase tracking-wider"
            >
              Konfirmasi Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-9 border-zinc-800 bg-zinc-900/50 text-zinc-100 placeholder:text-zinc-600 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                required
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="space-y-1.5 rounded-lg border border-zinc-800/60 bg-zinc-900/30 p-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-zinc-500 mb-2">
              Persyaratan Password
            </p>
            {[
              { label: "Minimal 8 karakter", check: passwordChecks.minLength },
              { label: "Huruf besar (A-Z)", check: passwordChecks.hasUpper },
              { label: "Huruf kecil (a-z)", check: passwordChecks.hasLower },
              { label: "Angka (0-9)", check: passwordChecks.hasNumber },
              {
                label: "Konfirmasi password cocok",
                check: passwordChecks.hasMatch,
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                {item.check ? (
                  <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                ) : (
                  <XCircle className="h-3 w-3 text-zinc-600 shrink-0" />
                )}
                <span
                  className={`text-[11px] ${
                    item.check ? "text-emerald-400/80" : "text-zinc-500"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 px-3 py-2">
              <p className="text-xs text-rose-400">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            disabled={loading || !allChecksPassed}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold h-10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mendaftarkan...
              </>
            ) : (
              <>
                Daftar Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-xs text-zinc-500">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
