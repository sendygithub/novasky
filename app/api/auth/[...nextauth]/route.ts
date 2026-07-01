import { NextRequest, NextResponse } from "next/server";
import {
  authenticateUser,
  createSession,
  destroySession,
  getSession,
} from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nextauth: string[] }> },
) {
  const segments = (await params).nextauth;
  const path = segments.join("/");

  // Handle session endpoint
  if (path === "session") {
    const session = await getSession();
    return NextResponse.json(
      session
        ? {
            user: session,
            expires: new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000,
            ).toISOString(),
          }
        : null,
    );
  }

  // Handle CSRF token endpoint
  if (path === "csrf") {
    return NextResponse.json({ csrfToken: "csrf-token" });
  }

  // Handle providers endpoint
  if (path === "providers") {
    return NextResponse.json({
      credentials: {
        id: "credentials",
        name: "Credentials",
        type: "credentials",
        credentials: {
          email: { label: "Email", type: "email" },
          password: { label: "Password", type: "password" },
        },
      },
    });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ nextauth: string[] }> },
) {
  const segments = (await params).nextauth;
  const path = segments.join("/");

  // Handle signin endpoint
  if (path === "callback/credentials") {
    try {
      const body = await request.json();
      const { email, password } = body;

      const user = await authenticateUser(email, password);
      await createSession(user);

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        },
        url: "/dashboard",
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message || "Authentication failed" },
        { status: 401 },
      );
    }
  }

  // Handle signout endpoint
  if (path === "signout") {
    await destroySession();
    return NextResponse.json({ success: true });
  }

  // Handle session update
  if (path === "session") {
    return NextResponse.json({});
  }

  // Handle CSRF
  if (path === "csrf") {
    return NextResponse.json({ csrfToken: "csrf-token" });
  }

  return NextResponse.json({ error: "Not found" }, { status: 404 });
}
