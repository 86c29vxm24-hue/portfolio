const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form && statusEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = form.elements.namedItem("name");
    const email = form.elements.namedItem("email");
    const message = form.elements.namedItem("message");

    const errors = [];

    if (!name.value.trim() || name.value.trim().length < 2) {
      errors.push("Bitte gib einen gueltigen Namen ein.");
    }

    if (!email.validity.valid) {
      errors.push("Bitte gib eine gueltige E-Mail-Adresse ein.");
    }

    if (!message.value.trim() || message.value.trim().length < 10) {
      errors.push("Deine Nachricht sollte mindestens 10 Zeichen haben.");
    }

    if (errors.length > 0) {
      statusEl.textContent = errors[0];
      statusEl.classList.remove("success");
      statusEl.classList.add("error");
      return;
    }

    statusEl.textContent = "Danke. Deine Nachricht wurde lokal validiert.";
    statusEl.classList.remove("error");
    statusEl.classList.add("success");
    form.reset();
  });
}
