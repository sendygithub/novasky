"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);
  }

  return (
    <Card className="border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label>Email</Label>

            <Input name="email" type="email" placeholder="trader@email.com" />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>

            <Input name="password" type="password" placeholder="********" />
          </div>

          <Button
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600"
          >
            {loading ? "Loading..." : "Masuk"}
          </Button>

          <div className="text-center">
            <p className="text-xs text-zinc-500">
              Belum punya akun?{" "}
              <Link
                href="/register"
                className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Daftar di sini
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
