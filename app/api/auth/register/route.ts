import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { registerSchema } from "@/schemas/auth";

function generateNoRM(): string {
  const year = new Date().getFullYear();
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 99999)
    .toString()
    .padStart(5, "0");
  return `RM-${year}${month}-${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      const firstError = validated.error.issues[0];
      return NextResponse.json({ error: firstError.message }, { status: 400 });
    }

    const { name, email, password } = validated.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const noRM = generateNoRM();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "PASIEN",
        patient: {
          create: {
            name,
            email,
            noRM,
          },
        },
      },
    });

    return NextResponse.json(
      {
        message: "Registrasi berhasil",
        user: { id: user.id, name: user.name, email: user.email },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 },
    );
  }
}
