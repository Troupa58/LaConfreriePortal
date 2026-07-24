"use client";

import { useState } from "react";

const links = [
  ["Évènements", "#evenements"],
  ["La guilde", "#guilde"],
  ["Galerie", "#galerie"],
  ["Recrutement", "#recrutement"]
];

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="menuToggle"
        type="button"
        aria-expanded={open}
        aria-controls="main-menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="srOnly">Ouvrir le menu</span>
        <span />
        <span />
        <span />
      </button>

      <div className={`navLinks ${open ? "open" : ""}`} id="main-menu">
        {links.map(([label, href]) => (
          <a href={href} key={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a
          className="button buttonSmall buttonDiscord"
          href="#connexion"
          onClick={() => setOpen(false)}
        >
          Connexion Discord
        </a>
      </div>
    </>
  );
}
