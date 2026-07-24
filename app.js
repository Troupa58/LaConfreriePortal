const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-links");
const toast = document.querySelector(".toast");

menuButton?.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

let toastTimer;
document.querySelectorAll(".demo-action").forEach((button) => {
  button.addEventListener("click", () => {
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toast.setAttribute("aria-hidden", "false");
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
      toast.setAttribute("aria-hidden", "true");
    }, 2800);
  });
});


const welcomeLines = [
  "Les portes de La Confrérie vous sont ouvertes. Entrez et prenez place près du feu.",
  "Aucun héros n'entre seul dans une légende.",
  "Une nouvelle aventure commence aujourd'hui.",
  "Ici, chacun avance à son rythme, mais personne n'avance seul.",
  "Les plus belles victoires sont celles que l'on partage.",
  "Le chemin est plus agréable lorsqu'il est parcouru ensemble.",
  "Prenez votre équipement : la prochaine aventure n'attend plus que vous.",
  "Bienvenue parmi ceux qui jouent pour le plaisir et restent pour les compagnons."
];

const welcomeLine = document.querySelector("#welcome-line");
if (welcomeLine) {
  const index = Math.floor(Math.random() * welcomeLines.length);
  welcomeLine.textContent = `« ${welcomeLines[index]} »`;
}

const header = document.querySelector(".site-header");
const updateHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 20);
};
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
