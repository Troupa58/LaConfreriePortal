import Image from "next/image";
import { WelcomeLine } from "@/components/WelcomeLine";
import { MobileMenu } from "@/components/MobileMenu";
import { DemoButton } from "@/components/DemoButton";

const events = [
  {
    day: "25",
    month: "JUIL.",
    type: "Instance",
    title: "Thanatos Tower",
    description: "Rassemblement à 20 h 45 • Départ à 21 h 00",
    details: ["8 / 12 aventuriers", "Organisé par Troupa"],
    featured: true
  },
  {
    day: "27",
    month: "JUIL.",
    type: "MVP",
    title: "Chasse aux MVP",
    description: "Une soirée libre et détendue pour chasser en groupe.",
    details: ["5 inscrits", "Débutants bienvenus"]
  },
  {
    day: "30",
    month: "JUIL.",
    type: "Guilde",
    title: "Soirée entraide",
    description:
      "Quêtes, équipements et conseils selon les besoins des membres.",
    details: ["Ouvert à tous", "Sans obligation"]
  }
];

export default function Home() {
  return (
    <>
      <a className="skipLink" href="#contenu">
        Aller au contenu
      </a>

      <header className="siteHeader">
        <nav className="nav container" aria-label="Navigation principale">
          <a className="brand" href="#accueil" aria-label="Retour à l'accueil">
            <Image src="/crest.svg" alt="" width={46} height={54} priority />
            <span>
              <strong>La Confrérie</strong>
              <small>Portail officiel</small>
            </span>
          </a>
          <MobileMenu />
        </nav>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil">
          <div className="heroBackdrop" aria-hidden="true">
            <div className="moon" />
            <div className="castle castleBack" />
            <div className="castle castleFront" />
            <div className="mist mistOne" />
            <div className="mist mistTwo" />
          </div>

          <div className="container heroContent">
            <div className="heroCopy">
              <p className="eyebrow">Guilde francophone • uaRO</p>
              <h1>
                Bienvenue au quartier général de{" "}
                <span>La Confrérie</span>
              </h1>
              <WelcomeLine />
              <p className="heroText">
                Une guilde conviviale, mature et organisée, où l&apos;entraide
                et le plaisir de jouer passent avant la pression.
              </p>
              <div className="heroActions">
                <a className="button buttonPrimary" href="#recrutement">
                  Rejoindre la guilde
                </a>
                <a className="button buttonSecondary" href="#evenements">
                  Voir les évènements
                </a>
              </div>
              <p className="heroNote">
                Aucune obligation de connexion • Débutants bienvenus •
                Progression à votre rythme
              </p>
              <div className="heroStats" aria-label="Aperçu de la guilde">
                <div><strong>3</strong><span>sorties prévues</span></div>
                <div><strong>24</strong><span>membres actifs</span></div>
                <div><strong>100 %</strong><span>chill & entraide</span></div>
              </div>
            </div>

            <div className="heroEmblem" aria-hidden="true">
              <div className="emblemGlow" />
              <Image src="/crest.svg" alt="" width={280} height={330} priority />
              <p>Unis par l&apos;aventure</p>
            </div>
          </div>
        </section>

        <Divider symbol="✦" />

        <section className="section sectionEvents" id="evenements">
          <div className="container">
            <SectionHeading
              eyebrow="Tableau des missions"
              title="Les rendez-vous de la guilde"
              description="Les inscriptions seront bientôt synchronisées avec Discord."
            />
            <div className="eventGrid">
              {events.map((event) => (
                <article
                  className={`eventCard ${event.featured ? "featured missionCard" : ""}`}
                  key={event.title}
                >
                  <div className="eventDate">
                    <strong>{event.day}</strong>
                    <span>{event.month}</span>
                  </div>
                  <div className="eventInfo">
                    {event.featured && (
                      <p className="missionLabel">Ordre de mission prioritaire</p>
                    )}
                    <div className="tag">{event.type}</div>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                    <div className="eventMeta">
                      <span>⚔ {event.details[0]}</span>
                      <span>🛡 {event.details[1]}</span>
                    </div>
                  </div>
                  <DemoButton label={event.featured ? "Voir le roster" : "Détails"} primary={event.featured} />
                </article>
              ))}
            </div>
          </div>
        </section>

        <Divider symbol="⚔" />

        <section className="section sectionGuild" id="guilde">
          <div className="container twoColumns">
            <div className="guildCopy">
              <p className="eyebrow">Salle de la guilde</p>
              <h2>Une vraie guilde, sans deuxième travail</h2>
              <p>
                La Confrérie rassemble des joueurs francophones qui souhaitent
                progresser, découvrir le contenu de uaRO et partager de bons
                moments, chacun à son rythme.
              </p>
              <div className="values">
                <Value icon="🛡" title="Entraide">
                  Conseils, partage d&apos;expérience et soutien entre membres.
                </Value>
                <Value icon="⚔" title="Aventure">
                  Instances, quêtes et sorties organisées quand l&apos;envie est là.
                </Value>
                <Value icon="💙" title="Respect">
                  Aucune pression sur la connexion, le niveau ou l&apos;équipement.
                </Value>
              </div>
            </div>

            <aside className="parchment">
              <div className="parchmentInner">
                <p className="seal">LC</p>
                <h3>La charte de la Confrérie</h3>
                <p>Jouer pour le plaisir.</p>
                <p>Respecter le rythme de chacun.</p>
                <p>S&apos;entraider sans obligation.</p>
                <p>Faire vivre une communauté accueillante.</p>
              </div>
            </aside>
          </div>
        </section>

        <Divider symbol="✦" />

        <section className="section sectionGallery" id="galerie">
          <div className="container">
            <SectionHeading
              eyebrow="Galerie des souvenirs"
              title="Les aventures de La Confrérie"
              description="La galerie accueillera bientôt les captures des membres."
            />
            <div className="galleryGrid">
              <GalleryItem large icon="🏰" label="Sorties de guilde" />
              <GalleryItem icon="👑" label="Victoires MVP" />
              <GalleryItem icon="✨" label="Moments mémorables" />
            </div>
          </div>
        </section>

        <Divider symbol="🛡" />

        <section className="section sectionRecruitment" id="recrutement">
          <div className="container recruitmentCard">
            <Image src="/crest.svg" alt="" width={110} height={130} />
            <div>
              <p className="eyebrow">L&apos;appel de la Confrérie</p>
              <h2>Prêt à rejoindre l&apos;aventure ?</h2>
              <p>
                Débutants, joueurs de retour et aventuriers expérimentés sont
                les bienvenus. Venez jouer tranquillement, progresser et
                partager de bons moments avec nous.
              </p>
            </div>
            <a className="button buttonPrimary" href="#connexion">
              Nous rejoindre
            </a>
          </div>
        </section>

        <section className="section sectionLogin" id="connexion">
          <div className="container loginPanel">
            <div>
              <p className="eyebrow">Espace membre</p>
              <h2>La connexion Discord arrive bientôt</h2>
              <p>
                Elle permettra de s&apos;inscrire aux évènements sans créer de
                nouveau compte, puis de synchroniser les rosters avec le bot actuel.
              </p>
            </div>
            <DemoButton label="Se connecter avec Discord" discord />
          </div>
        </section>
      </main>

      <footer>
        <div className="container footerContent">
          <a className="brand brandFooter" href="#accueil">
            <Image src="/crest.svg" alt="" width={38} height={45} />
            <span>
              <strong>La Confrérie</strong>
              <small>Guilde francophone uaRO</small>
            </span>
          </a>
          <p>Portail Next.js en construction • Le bot Discord reste inchangé.</p>
        </div>
      </footer>
    </>
  );
}

function Divider({ symbol }: { symbol: string }) {
  return <div className="chapterDivider" aria-hidden="true"><span>{symbol}</span></div>;
}

function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="sectionHeading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      <p>{description}</p>
    </div>
  );
}

function Value({
  icon,
  title,
  children
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article>
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}

function GalleryItem({
  icon,
  label,
  large = false
}: {
  icon: string;
  label: string;
  large?: boolean;
}) {
  return (
    <div className={`galleryPlaceholder ${large ? "large" : ""}`}>
      <span>{icon}</span>
      <p>{label}</p>
    </div>
  );
}
