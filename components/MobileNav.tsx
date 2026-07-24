"use client";

import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="menuToggle"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
        <b className="srOnly">Menu</b>
      </button>
      <div className={`navLinks ${open ? "open" : ""}`}>
        <a href="/#evenements" onClick={() => setOpen(false)}>Évènements</a>
        <a href="/#guilde" onClick={() => setOpen(false)}>La guilde</a>
        <a href="/#galerie" onClick={() => setOpen(false)}>Galerie</a>
        <a href="/#recrutement" onClick={() => setOpen(false)}>Recrutement</a>
      </div>
    </>
  );
}
