import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "session_token";
const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "DOKTER" | "PASIEN" | "APOTEKER" | "KASIR" | "PERAWAT";
  image: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createSession(user: SessionUser): Promise<void> {
  const cookieStore = await cookies();
  const sessionData = JSON.stringify({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    image: user.image,
    expires: Date.now() + SESSION_MAX_AGE * 1000,
  });

  // Encode to base64
  const encoded = Buffer.from(sessionData).toString("base64");

  cookieStore.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE)?.value;

    if (!sessionCookie) return null;

    const decoded = Buffer.from(sessionCookie, "base64").toString("utf-8");
    const session = JSON.parse(decoded);

    // Check if session is expired
    if (session.expires < Date.now()) {
      await destroySession();
      return null;
    }

    return {
      id: session.id,
      email: session.email,
      name: session.name,
      role: session.role,
      image: session.image,
    };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requireRole(...roles: string[]): Promise<SessionUser> {
  const session = await requireAuth();
  if (!roles.includes(session.role)) {
    redirect("/dashboard");
  }
  return session;
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<SessionUser> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      patient: true,
      doctor: true,
    },
  });

  if (!user) {
    throw new Error("Email tidak terdaftar");
  }

  if (!user.isActive) {
    throw new Error("Akun Anda telah dinonaktifkan");
  }

  const validPassword = await verifyPassword(password, user.password);
  if (!validPassword) {
    throw new Error("Password salah");
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as SessionUser["role"],
    image: user.image,
  };
}
