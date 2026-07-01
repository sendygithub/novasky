import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_COOKIE = "session_token";

const publicRoutes = [
  "/",
  "/login",
  "/register",
  "/dokter",
  "/layanan",
  "/jadwal",
  "/tentang",
  "/kontak",
  "/lupa-password",
  "/reset-password",
  "/verifikasi-email",
];

const roleRoutes: Record<string, string[]> = {
  ADMIN: [
    "/dashboard",
    "/dashboard/pasien",
    "/dashboard/dokter",
    "/dashboard/jadwal",
    "/dashboard/poli",
    "/dashboard/booking",
    "/dashboard/antrian",
    "/dashboard/pembayaran",
    "/dashboard/apotek",
    "/dashboard/resep",
    "/dashboard/rekam-medis",
    "/dashboard/laboratorium",
    "/dashboard/radiologi",
    "/dashboard/rawat-inap",
    "/dashboard/kamar",
    "/dashboard/laporan",
    "/dashboard/user",
    "/dashboard/pengaturan",
  ],
  DOKTER: [
    "/dashboard",
    "/dashboard/jadwal",
    "/dashboard/pasien-hari-ini",
    "/dashboard/pemeriksaan",
    "/dashboard/rekam-medis",
    "/dashboard/diagnosa",
    "/dashboard/resep",
    "/dashboard/riwayat",
  ],
  PASIEN: [
    "/dashboard",
    "/dashboard/booking",
    "/dashboard/riwayat-booking",
    "/dashboard/pembayaran",
    "/dashboard/check-in",
    "/dashboard/resep",
    "/dashboard/rekam-medis",
    "/dashboard/profil",
  ],
  APOTEKER: [
    "/dashboard",
    "/dashboard/resep",
    "/dashboard/obat",
    "/dashboard/stok",
    "/dashboard/serahkan-obat",
  ],
  KASIR: [
    "/dashboard",
    "/dashboard/pembayaran",
    "/dashboard/invoice",
    "/dashboard/transaksi",
    "/dashboard/laporan",
  ],
  PERAWAT: [
    "/dashboard",
    "/dashboard/antrian",
    "/dashboard/check-in",
    "/dashboard/pemeriksaan-awal",
  ],
};

function getSessionFromCookie(request: NextRequest): { role?: string } | null {
  const sessionCookie = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionCookie) return null;

  try {
    const decoded = Buffer.from(sessionCookie, "base64").toString("utf-8");
    const session = JSON.parse(decoded);

    // Check if session is expired
    if (session.expires < Date.now()) {
      return null;
    }

    return { role: session.role };
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const session = getSessionFromCookie(request);
  const isLoggedIn = !!session;
  const userRole = session?.role;

  // Allow public routes
  if (publicRoutes.some((route) => nextUrl.pathname === route)) {
    return NextResponse.next();
  }

  // Allow public API routes
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole) {
      const allowedRoutes = roleRoutes[userRole] || [];
      const isAllowed = allowedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      );

      if (!isAllowed) {
        return NextResponse.redirect(new URL("/dashboard", nextUrl));
      }
    }
  }

  // Redirect logged-in users away from auth pages
  if (
    isLoggedIn &&
    (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")
  ) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
};
