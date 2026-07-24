"use client";

import { useEffect, useState } from "react";

const lines = [
  "Les portes de La Confrérie vous sont ouvertes. Entrez et prenez place près du feu.",
  "Aucun héros n'entre seul dans une légende.",
  "Une nouvelle aventure commence aujourd'hui.",
  "Ici, chacun avance à son rythme, mais personne n'avance seul.",
  "Les plus belles victoires sont celles que l'on partage.",
  "Le chemin est plus agréable lorsqu'il est parcouru ensemble."
];

export function WelcomeLine() {
  const [line, setLine] = useState(lines[0]);

  useEffect(() => {
    setLine(lines[Math.floor(Math.random() * lines.length)]);
  }, []);

  return <p className="welcomeLine">« {line} »</p>;
}
