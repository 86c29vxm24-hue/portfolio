const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
  de: {
    about_title: "About me",
    about_text:
      "Ich entwickle Frontends, die nicht nur gut aussehen, sondern messbar funktionieren: klare Nutzerfuehrung, saubere Komponenten und stabile Performance. Ich arbeite strukturiert, denke produktorientiert und bringe Aufgaben verlässlich vom Konzept bis zum Release. Mein Ziel ist es, Teams mit hoher Umsetzungsqualitaet und klarer Kommunikation zu unterstuetzen.",
    based_in: "Based in Köln",
    remote_preferred: "Remote bevorzugt",
    lets_talk: "Let's talk",
    portfolio_lead: "Eine Auswahl meiner Projekte mit Fokus auf Frontend-Umsetzung und UX.",
    project_1: "Projekt 01 Screenshot",
    project_2: "Projekt 02 Screenshot",
    project_3: "Projekt 03 Screenshot",
    project_4: "Projekt 04 Screenshot",
    references_title: "References",
    references_lead: "Ich arbeite eigenstaendig und gleichzeitig teamorientiert. Kurzes Feedback aus Projekten:",
    contact_lead: "Du suchst Unterstuetzung fuer ein Frontend-Projekt? Schreib mir.",
    label_name: "Dein Name",
    label_email: "Deine E-Mail",
    label_message: "Deine Nachricht",
    privacy_text: "Ich habe die Datenschutzerklaerung gelesen und stimme zu.",
    send_message: "Nachricht senden",
    error_name: "Bitte gib einen gueltigen Namen ein.",
    error_email: "Bitte gib eine gueltige E-Mail-Adresse ein.",
    error_message: "Deine Nachricht sollte mindestens 10 Zeichen haben.",
    error_privacy: "Bitte akzeptiere die Datenschutzerklaerung.",
    status_fix_fields: "Bitte korrigiere die markierten Felder.",
    status_sending: "Nachricht wird gesendet...",
    status_success: "Danke. Deine Nachricht wurde erfolgreich versendet.",
    status_failed: "Senden fehlgeschlagen. Bitte spaeter erneut versuchen.",
  },
  en: {
    about_title: "About me",
    about_text:
      "I build frontends that not only look good but also deliver measurable results: clear user flows, clean components, and reliable performance. I work in a structured way, think product-first, and ship from concept to release with ownership. My goal is to support teams with high execution quality and clear communication.",
    based_in: "Based in Cologne",
    remote_preferred: "Remote preferred",
    lets_talk: "Let's talk",
    portfolio_lead: "A selection of projects focused on frontend implementation and UX.",
    project_1: "Project 01 Screenshot",
    project_2: "Project 02 Screenshot",
    project_3: "Project 03 Screenshot",
    project_4: "Project 04 Screenshot",
    references_title: "References",
    references_lead: "I work independently while staying highly collaborative. A few project references:",
    contact_lead: "Looking for frontend support on your project? Let's talk.",
    label_name: "Your name",
    label_email: "Your e-mail",
    label_message: "Your message",
    privacy_text: "I have read the privacy policy and agree.",
    send_message: "Send message",
    error_name: "Please enter a valid name.",
    error_email: "Please enter a valid e-mail address.",
    error_message: "Your message should be at least 10 characters.",
    error_privacy: "Please accept the privacy policy.",
    status_fix_fields: "Please fix the highlighted fields.",
    status_sending: "Sending message...",
    status_success: "Thank you. Your message was sent successfully.",
    status_failed: "Sending failed. Please try again later.",
  },
};

const getLanguage = () => localStorage.getItem("portfolio_lang") || "de";
const t = (key) => translations[getLanguage()][key] || key;

const applyLanguage = (lang) => {
  const safeLang = translations[lang] ? lang : "de";
  localStorage.setItem("portfolio_lang", safeLang);
  document.documentElement.lang = safeLang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (key && translations[safeLang][key]) {
      element.textContent = translations[safeLang][key];
    }
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.getAttribute("data-i18n-aria");
    if (key && translations[safeLang][key]) {
      element.setAttribute("aria-label", translations[safeLang][key]);
    }
  });

  langButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.lang === safeLang);
  });
};

if (form && statusEl) {
  const nameInput = form.elements.namedItem("name");
  const emailInput = form.elements.namedItem("email");
  const messageInput = form.elements.namedItem("message");
  const privacyInput = form.elements.namedItem("privacy");
  const submitButton = form.querySelector("button[type='submit']");

  const controls = {
    name: nameInput,
    email: emailInput,
    message: messageInput,
    privacy: privacyInput,
  };

  const touched = {
    name: false,
    email: false,
    message: false,
    privacy: false,
  };

  const getErrorElement = (fieldName) =>
    form.querySelector(`[data-error-for="${fieldName}"]`);

  const setFieldError = (fieldName, message) => {
    const errorEl = getErrorElement(fieldName);
    if (!errorEl) {
      return;
    }
    errorEl.textContent = message;
  };

  const validateField = (fieldName) => {
    const control = controls[fieldName];
    if (!control) {
      return "Unbekanntes Feld.";
    }

    if (fieldName === "name") {
      const value = control.value.trim();
      if (value.length < 2) {
        return t("error_name");
      }
      return "";
    }

    if (fieldName === "email") {
      if (!control.validity.valid) {
        return t("error_email");
      }
      return "";
    }

    if (fieldName === "message") {
      const value = control.value.trim();
      if (value.length < 10) {
        return t("error_message");
      }
      return "";
    }

    if (fieldName === "privacy") {
      if (!control.checked) {
        return t("error_privacy");
      }
      return "";
    }

    return "";
  };

  const validateTouchedFields = () => {
    let hasErrors = false;

    Object.keys(touched).forEach((fieldName) => {
      if (!touched[fieldName]) {
        return;
      }
      const message = validateField(fieldName);
      setFieldError(fieldName, message);
      if (message) {
        hasErrors = true;
      }
    });

    return hasErrors;
  };

  const isFormValid = () => {
    const fieldNames = Object.keys(controls);
    return fieldNames.every((fieldName) => !validateField(fieldName));
  };

  const updateSubmitState = () => {
    if (!submitButton) {
      return;
    }
    submitButton.disabled = !isFormValid();
  };

  const showFormStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.classList.remove("error", "success");
    if (type) {
      statusEl.classList.add(type);
    }
  };

  Object.keys(controls).forEach((fieldName) => {
    const control = controls[fieldName];
    if (!control) {
      return;
    }

    control.addEventListener("blur", () => {
      touched[fieldName] = true;
      validateTouchedFields();
      updateSubmitState();
    });

    control.addEventListener("input", () => {
      updateSubmitState();
    });

    if (fieldName === "privacy") {
      control.addEventListener("change", () => {
        touched[fieldName] = true;
        validateTouchedFields();
        updateSubmitState();
      });
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    Object.keys(touched).forEach((fieldName) => {
      touched[fieldName] = true;
    });

    const hasFieldErrors = validateTouchedFields();
    if (hasFieldErrors || !isFormValid()) {
      showFormStatus(t("status_fix_fields"), "error");
      updateSubmitState();
      return;
    }

    showFormStatus(t("status_sending"), "");

    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch("send_mail.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          message: messageInput.value.trim(),
        }),
      });

      let result = null;
      try {
        result = await response.json();
      } catch (error) {
        result = null;
      }

      if (!response.ok || !result || !result.success) {
        throw new Error("Mail delivery failed");
      }

      form.reset();
      Object.keys(touched).forEach((fieldName) => {
        touched[fieldName] = false;
        setFieldError(fieldName, "");
      });
      showFormStatus(t("status_success"), "success");
      updateSubmitState();
    } catch (error) {
      showFormStatus(t("status_failed"), "error");
      updateSubmitState();
    }
  });

  updateSubmitState();
}

langButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang || "de");
  });
});

applyLanguage(getLanguage());
