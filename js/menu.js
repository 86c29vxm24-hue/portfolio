const menuButton = document.querySelector(".menu-btn");
const siteMenu = document.getElementById("site-menu");

const isMenuReady = () => Boolean(menuButton && siteMenu);
const isMenuOpen = () => document.body.classList.contains("menu-open");
const closeMenu = () => setMenuOpen(false);

const setMenuOpen = (isOpen) => {
  if (!isMenuReady()) {
    return;
  }
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  siteMenu.setAttribute("aria-hidden", String(!isOpen));
};

const bindMenuLinkHandlers = () => {
  siteMenu.querySelectorAll(".site-menu-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
};

const handleMenuOverlayClick = (event) => {
  if (event.target === siteMenu) {
    closeMenu();
  }
};

const handleMenuEscape = (event) => {
  if (event.key === "Escape" && isMenuOpen()) {
    closeMenu();
  }
};

const initMenu = () => {
  if (!isMenuReady() || menuButton.dataset.menuBound === "true") {
    return;
  }
  menuButton.dataset.menuBound = "true";
  menuButton.addEventListener("click", () => setMenuOpen(!isMenuOpen()));
  bindMenuLinkHandlers();
  siteMenu.addEventListener("click", handleMenuOverlayClick);
  document.addEventListener("keydown", handleMenuEscape);
};

window.initMenu = initMenu;
