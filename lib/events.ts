import { prisma } from "@/lib/prisma";

const defaultEvents = [
  {
    title: "Thanatos Tower",
    type: "Instance",
    description: "Rassemblement à 20 h 45. Départ à 21 h 00.",
    startsAt: new Date("2026-07-25T19:00:00.000Z"),
    capacity: 12,
    organizer: "Troupa",
    location: "Point de rendez-vous de la guilde"
  },
  {
    title: "Chasse aux MVP",
    type: "MVP",
    description: "Une soirée libre et détendue pour chasser en groupe.",
    startsAt: new Date("2026-07-27T19:00:00.000Z"),
    capacity: 12,
    organizer: "La Confrérie",
    location: "Discord — salon sorties"
  },
  {
    title: "Soirée entraide",
    type: "Guilde",
    description: "Quêtes, équipements et conseils selon les besoins des membres.",
    startsAt: new Date("2026-07-30T19:00:00.000Z"),
    capacity: 20,
    organizer: "La Confrérie",
    location: "Discord — salon général"
  }
];

export async function ensureDefaultEvents() {
  const count = await prisma.event.count();
  if (count > 0) return;

  await prisma.event.createMany({ data: defaultEvents });
}
