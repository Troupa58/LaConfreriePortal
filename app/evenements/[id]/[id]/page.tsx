import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { RosterActions } from "@/components/RosterActions";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris"
  }).format(date);
}

export default async function EventPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string }>;
}) {
  const { id } = await params;
  const query = await searchParams;

  const [session, event] = await Promise.all([
    auth(),
    prisma.event.findUnique({
      where: { id },
      include: {
        registrations: {
          include: { member: true },
          orderBy: { createdAt: "asc" }
        }
      }
    })
  ]);

  if (!event) notFound();

  const isRegistered = Boolean(
    session?.user?.discordId &&
      event.registrations.some(
        ({ member }) => member.discordId === session.user.discordId
      )
  );
  const isFull = event.registrations.length >= event.capacity;

  return (
    <main className="eventPage">
      <section className="eventHero">
        <div className="container">
          <Link className="backLink" href="/#evenements">← Retour aux évènements</Link>
          <span className="tag">{event.type}</span>
          <h1>{event.title}</h1>
          <p className="eventLead">{event.description}</p>

          {query.message === "inscrit" && (
            <div className="successMessage">Ton inscription est enregistrée. ✅</div>
          )}
          {query.message === "desinscrit" && (
            <div className="successMessage">Ta désinscription est enregistrée.</div>
          )}

          <div className="eventFacts">
            <div><span>Date</span><strong>{formatDate(event.startsAt)}</strong></div>
            <div><span>Organisateur</span><strong>{event.organizer}</strong></div>
            <div><span>Lieu</span><strong>{event.location ?? "À confirmer"}</strong></div>
            <div><span>Places</span><strong>{event.registrations.length}/{event.capacity}</strong></div>
          </div>

          <RosterActions
            eventId={event.id}
            isRegistered={isRegistered}
            isFull={isFull}
            isConnected={Boolean(session?.user)}
          />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Roster partagé</p>
              <h2>Participants</h2>
            </div>
            <p>
              Cette liste est enregistrée dans PostgreSQL et visible par tous les visiteurs.
            </p>
          </div>

          {event.registrations.length === 0 ? (
            <div className="emptyState">
              <span>⚔</span>
              <h3>Le roster est encore vide</h3>
              <p>Sois le premier aventurier à rejoindre cette sortie.</p>
            </div>
          ) : (
            <div className="rosterGrid">
              {event.registrations.map(({ member }, index) => (
                <article className="rosterMember" key={member.id}>
                  <span className="position">{index + 1}</span>
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt=""
                      width={54}
                      height={54}
                      className="avatar"
                      unoptimized
                    />
                  ) : (
                    <div className="avatarFallback">
                      {member.name.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3>{member.name}</h3>
                    <p>Membre de La Confrérie</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
