const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
  de: {
    about_title: "About me",
    about_text:
      "Ich entwickle Frontends, die nicht nur gut aussehen, sondern messbar funktionieren: klare Nutzerfuehrung, saubere Komponenten und stabile Performance. Ich arbeite strukturiert, denke produktorientiert und bringe Aufgaben verlässlich vom Konzept bis zum Release. Mein Ziel ist es, Teams mit hoher Umsetzungsqualitaet und klarer Kommunikation zu unterstuetzen.",
    based_in: "Based in Köln",
    remote_preferred: "Remote bevorzugt",
    lets_talk: "Let's talk",
    skills_prompt_start: "Dir fehlt noch der passende Skill?",
    skills_contact_link: "Contact me",
    skills_prompt_end: "Ich lerne ihn schnell.",
    skills_contact_aria: "Zum Kontaktbereich springen",
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
    skills_prompt_start: "Don't see the skill you need?",
    skills_contact_link: "Contact me",
    skills_prompt_end: "I'm always ready to learn!",
    skills_contact_aria: "Jump to contact section",
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

const t = (key) => {
  const language = getLanguage();
  return (translations[language] && translations[language][key]) || key;
};

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

const initLanguageSwitcher = () => {
  langButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang || "de");
    });
  });

  applyLanguage(getLanguage());
};

window.t = t;
window.getLanguage = getLanguage;
window.applyLanguage = applyLanguage;
window.initLanguageSwitcher = initLanguageSwitcher;
