const initToTopButton = () => {
  const toTopButton = document.querySelector(".to-top-btn");
  if (!toTopButton) {
    return;
  }
  toTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

window.initToTopButton = initToTopButton;
