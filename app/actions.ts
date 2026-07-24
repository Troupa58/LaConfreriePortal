"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginWithDiscord() {
  await signIn("discord", { redirectTo: "/#evenements" });
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}

async function requireMember() {
  const session = await auth();
  const discordId = session?.user?.discordId;

  if (!discordId) {
    await signIn("discord", { redirectTo: "/#evenements" });
    throw new Error("Redirection vers Discord");
  }

  const member = await prisma.member.findUnique({
    where: { discordId }
  });

  if (!member) {
    throw new Error("Membre introuvable. Déconnecte-toi puis reconnecte-toi.");
  }

  return member;
}

export async function registerForEvent(formData: FormData) {
  const eventId = String(formData.get("eventId") ?? "");
  if (!eventId) throw new Error("Événement invalide.");

  const member = await requireMember();
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { registrations: true }
  });

  if (!event) throw new Error("Événement introuvable.");

  const alreadyRegistered = event.registrations.some(
    (registration) => registration.memberId === member.id
  );

  if (!alreadyRegistered && event.registrations.length >= event.capacity) {
    throw new Error("Le roster est complet.");
  }

  await prisma.registration.upsert({
    where: {
      eventId_memberId: {
        eventId,
        memberId: member.id
      }
    },
    update: {},
    create: {
      eventId,
      memberId: member.id
    }
  });

  revalidatePath("/");
  revalidatePath(`/evenements/${eventId}`);
  redirect(`/evenements/${eventId}?message=inscrit`);
}

export async function unregisterFromEvent(formData: FormData) {
  const eventId = String(formData.get("eventId") ?? "");
  if (!eventId) throw new Error("Événement invalide.");

  const member = await requireMember();

  await prisma.registration.deleteMany({
    where: {
      eventId,
      memberId: member.id
    }
  });

  revalidatePath("/");
  revalidatePath(`/evenements/${eventId}`);
  redirect(`/evenements/${eventId}?message=desinscrit`);
}
