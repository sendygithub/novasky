import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ProfilClient } from "./profil-client";

async function getProfile(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      patient: true,
      doctor: true,
      pharmacist: true,
      cashier: true,
      nurse: true,
    },
  });
  return user;
}

export default async function ProfilPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await getProfile(session.id);
  if (!user) redirect("/dashboard");

  return <ProfilClient session={session} user={user} />;
}
