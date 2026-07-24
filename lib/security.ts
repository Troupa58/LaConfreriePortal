import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export class RateLimitError extends Error {
  constructor() {
    super("Trop de tentatives. Attends quelques instants puis réessaie.");
    this.name = "RateLimitError";
  }
}

function hash(value: string) {
  return createHash("sha256")
    .update(`${process.env.AUTH_SECRET ?? "local"}:${value}`)
    .digest("hex");
}

export async function requestIpHash() {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || requestHeaders.get("x-real-ip") || "unknown";
  return hash(ip);
}

export async function enforceRateLimit({
  key,
  action,
  limit,
  windowSeconds
}: {
  key: string;
  action: string;
  limit: number;
  windowSeconds: number;
}) {
  const since = new Date(Date.now() - windowSeconds * 1000);

  await prisma.$transaction(async (tx) => {
    const count = await tx.rateLimitEvent.count({
      where: { key, action, createdAt: { gte: since } }
    });

    if (count >= limit) throw new RateLimitError();

    await tx.rateLimitEvent.create({ data: { key, action } });
  });

  if (Math.random() < 0.02) {
    const retention = new Date(Date.now() - 24 * 60 * 60 * 1000);
    void prisma.rateLimitEvent.deleteMany({ where: { createdAt: { lt: retention } } });
  }
}

export async function writeSecurityLog(data: {
  action: string;
  outcome: "allowed" | "denied" | "error";
  actorId?: string;
  ipHash?: string;
  targetId?: string;
  details?: string;
}) {
  try {
    await prisma.securityLog.create({
      data: {
        ...data,
        details: data.details?.slice(0, 500)
      }
    });
  } catch {
    // Un échec de journalisation ne doit jamais casser l'action principale.
  }
}
