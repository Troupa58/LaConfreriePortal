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
