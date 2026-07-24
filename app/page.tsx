import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { ensureDefaultEvents } from "@/lib/events";
import { prisma } from "@/lib/prisma";
import { AuthButton } from "@/components/AuthButton";

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris"
  }).format(date);
}

export default async function Home() {
  await ensureDefaultEvents();

  const [session, events] = await Promise.all([
    auth(),
    prisma.event.findMany({
      orderBy: { startsAt: "asc" },
      include: {
        registrations: {
          include: { member: true },
          orderBy: { createdAt: "asc" }
        }
      }
    })
  ]);

  return (
    <main>
      <section className="hero">
        <div className="heroAtmosphere" />
        <div className="container heroContent">
          <div>
            <p className="eyebrow">Guilde francophone • uaRO</p>
            <h1>Le quartier général de <span>La Confrérie</span></h1>
            <p className="welcomeLine">
              « Ici, chacun avance à son rythme, mais personne n&apos;avance seul. »
            </p>
            <p className="heroText">
              Connecte-toi avec Discord, consulte les sorties et inscris-toi
              au roster en quelques secondes.
            </p>
            <div className="heroActions">
              <a className="button buttonPrimary" href="#evenements">
                Voir les évènements
              </a>
              {!session?.user && <AuthButton />}
            </div>
            <div className="heroStats">
              <div><strong>{events.length}</strong><span>évènements</span></div>
              <div>
                <strong>{events.reduce((sum, event) => sum + event.registrations.length, 0)}</strong>
                <span>inscriptions</span>
              </div>
              <div><strong>100 %</strong><span>chill & entraide</span></div>
            </div>
          </div>
          <div className="heroEmblem">
            <Image src="/crest.svg" alt="Blason de La Confrérie" width={270} height={326} priority />
          </div>
        </div>
      </section>

      <section className="section" id="evenements">
        <div className="container">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Tableau des missions</p>
              <h2>Les prochains rendez-vous</h2>
            </div>
            <p>Les rosters affichés ici sont partagés : tous les membres voient la même liste.</p>
          </div>

          <div className="eventGrid">
            {events.map((event) => (
              <article className="eventCard" key={event.id}>
                <div className="eventTop">
                  <div>
                    <span className="tag">{event.type}</span>
                    <h3>{event.title}</h3>
                    <p className="dateText">{formatDate(event.startsAt)}</p>
                  </div>
                  <div className="capacity">
                    <strong>{event.registrations.length}/{event.capacity}</strong>
                    <span>aventuriers</span>
                  </div>
                </div>

                <p>{event.description}</p>
                <div className="miniRoster">
                  {event.registrations.length === 0 ? (
                    <span className="emptyRoster">Aucun inscrit pour le moment.</span>
                  ) : (
                    event.registrations.slice(0, 6).map(({ member }) => (
                      <span className="memberChip" key={member.id}>
                        {member.image ? (
                          <Image src={member.image} alt="" width={28} height={28} unoptimized />
                        ) : (
                          <b>{member.name.slice(0, 1).toUpperCase()}</b>
                        )}
                        {member.name}
                      </span>
                    ))
                  )}
                  {event.registrations.length > 6 && (
                    <span className="memberChip">+{event.registrations.length - 6}</span>
                  )}
                </div>
                <Link className="button buttonSecondary" href={`/evenements/${event.id}`}>
                  Voir le roster
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionGuild" id="guilde">
        <div className="container twoColumns">
          <div>
            <p className="eyebrow">Salle de la guilde</p>
            <h2>Une vraie guilde, sans deuxième travail</h2>
            <p>
              Instances, entraide et progression tranquille. Les débutants et
              les joueurs de retour sont les bienvenus.
            </p>
          </div>
          <aside className="parchment">
            <h3>Notre charte</h3>
            <p>Jouer pour le plaisir.</p>
            <p>Respecter le rythme de chacun.</p>
            <p>S&apos;entraider sans obligation.</p>
            <p>Partager nos plus belles aventures.</p>
          </aside>
        </div>
      </section>

      <section className="section" id="galerie">
        <div className="container">
          <div className="sectionHeading">
            <div>
              <p className="eyebrow">Galerie des souvenirs</p>
              <h2>Les aventures de La Confrérie</h2>
            </div>
          </div>
          <div className="galleryGrid">
            <div>🏰<span>Sorties de guilde</span></div>
            <div>👑<span>Victoires MVP</span></div>
            <div>✨<span>Moments mémorables</span></div>
          </div>
        </div>
      </section>

      <section className="section recruitment" id="recrutement">
        <div className="container recruitmentCard">
          <Image src="/crest.svg" alt="" width={100} height={120} />
          <div>
            <p className="eyebrow">L&apos;appel de la Confrérie</p>
            <h2>Prêt à rejoindre l&apos;aventure ?</h2>
            <p>Connecte-toi avec Discord pour participer aux sorties de la guilde.</p>
          </div>
          <AuthButton />
        </div>
      </section>
    </main>
  );
}
