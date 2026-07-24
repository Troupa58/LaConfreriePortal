"use server";

import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/lib/prisma";
import {
  enforceRateLimit,
  requestIpHash,
  writeSecurityLog
} from "@/lib/security";
import { parseEventId } from "@/lib/validation";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function loginWithDiscord() {
  const ipHash = await requestIpHash();
  await enforceRateLimit({ key: ipHash, action: "login", limit: 10, windowSeconds: 60 });
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
    throw new Error("Authentification nécessaire.");
  }

  const member = await prisma.member.findUnique({ where: { discordId } });
  if (!member) throw new Error("Membre introuvable. Reconnecte-toi avec Discord.");
  return member;
}

async function actionContext(action: string) {
  const [member, ipHash] = await Promise.all([requireMember(), requestIpHash()]);
  await Promise.all([
    enforceRateLimit({ key: `member:${member.id}`, action, limit: 10, windowSeconds: 60 }),
    enforceRateLimit({ key: `ip:${ipHash}`, action, limit: 30, windowSeconds: 60 })
  ]);
  return { member, ipHash };
}

export async function registerForEvent(formData: FormData) {
  const eventId = parseEventId(formData.get("eventId"));
  const { member, ipHash } = await actionContext("register");

  const outcome = await prisma.$transaction(async (tx) => {
    const event = await tx.event.findUnique({
      where: { id: eventId },
      include: { registrations: true }
    });
    if (!event) return "missing" as const;

    const alreadyRegistered = event.registrations.some((r) => r.memberId === member.id);
    if (alreadyRegistered) return "already" as const;
    if (event.registrations.length >= event.capacity) return "full" as const;

    await tx.registration.create({ data: { eventId, memberId: member.id } });
    return "created" as const;
  });

  if (outcome === "missing") {
    await writeSecurityLog({ action: "register", outcome: "denied", actorId: member.id, ipHash, targetId: eventId, details: "event_missing" });
    throw new Error("Événement introuvable.");
  }
  if (outcome === "full") {
    await writeSecurityLog({ action: "register", outcome: "denied", actorId: member.id, ipHash, targetId: eventId, details: "roster_full" });
    throw new Error("Le roster est complet.");
  }

  await writeSecurityLog({ action: "register", outcome: "allowed", actorId: member.id, ipHash, targetId: eventId, details: outcome });
  revalidatePath("/");
  revalidatePath(`/evenements/${eventId}`);
  redirect(`/evenements/${eventId}?message=inscrit`);
}

export async function unregisterFromEvent(formData: FormData) {
  const eventId = parseEventId(formData.get("eventId"));
  const { member, ipHash } = await actionContext("unregister");

  // Le memberId vient exclusivement de la session serveur : impossible de désinscrire un autre membre.
  await prisma.registration.deleteMany({ where: { eventId, memberId: member.id } });

  await writeSecurityLog({ action: "unregister", outcome: "allowed", actorId: member.id, ipHash, targetId: eventId });
  revalidatePath("/");
  revalidatePath(`/evenements/${eventId}`);
  redirect(`/evenements/${eventId}?message=desinscrit`);
}
