import Link from "next/link";

export default function NotFound() {
  return (
    <main className="notFound">
      <div>
        <span>🛡</span>
        <h1>Cette mission est introuvable</h1>
        <Link className="button buttonPrimary" href="/">
          Retour au portail
        </Link>
      </div>
    </main>
  );
}
