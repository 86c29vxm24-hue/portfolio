const langButtons = document.querySelectorAll(".lang-btn");

const translations = {
  de: {
    page_title_index: "Portfolio | Frontend Developer",
    page_title_imprint: "Impressum | Portfolio",
    page_title_privacy: "Datenschutz | Portfolio",
    aria_menu: "Menue",
    aria_scroll_about: "Zu About springen",
    aria_about_photo: "Dein Profilfoto",
    profile_placeholder: "Profilfoto folgt",
    about_title: "Über mich",
    about_text:
      "Ich entwickle Frontends, die nicht nur gut aussehen, sondern messbar funktionieren: klare Nutzerfuehrung, saubere Komponenten und stabile Performance. Ich arbeite strukturiert, denke produktorientiert und bringe Aufgaben verlässlich vom Konzept bis zum Release. Mein Ziel ist es, Teams mit hoher Umsetzungsqualitaet und klarer Kommunikation zu unterstuetzen.",
    based_in: "Based in Köln",
    remote_preferred: "Remote bevorzugt",
    lets_talk: "Let's talk",
    skills_prompt_start: "Dir fehlt noch der passende Skill?",
    skills_contact_link: "Contact me",
    skills_prompt_end: "Ich lerne ihn schnell.",
    skills_contact_aria: "Zum Kontaktbereich springen",
    portfolio_title: "Portfolio",
    portfolio_lead: "Eine Auswahl meiner Projekte mit Fokus auf Frontend-Umsetzung und UX.",
    project_1: "Projekt 01 Screenshot",
    project_2: "Projekt 02 Screenshot",
    project_3: "Projekt 03 Screenshot",
    project_4: "Projekt 04 Screenshot",
    project_join_desc:
      "Task-Manager nach dem Kanban-Prinzip. Aufgaben per Drag-and-drop organisieren, Nutzer zuweisen und Kategorien strukturieren.",
    project_el_pollo_desc:
      "2D Jump-and-Run in Vanilla JavaScript mit Charakteranimationen, Bossfight-Logik und Soundeffekten.",
    project_pokedex_desc:
      "Pokedex mit externer API: Pokemon laden, filtern und Detailansichten in einer klaren UI anzeigen.",
    project_join_github_aria: "Join Repository auf GitHub",
    project_el_pollo_github_aria: "El Pollo Loco Repository auf GitHub",
    project_pokedex_github_aria: "Pokedex Repository auf GitHub",
    references_title: "Referenzen",
    references_lead: "Ich arbeite eigenstaendig und gleichzeitig teamorientiert. Kurzes Feedback aus Projekten:",
    quote_1: "\"Zuverlaessig, stark in der Umsetzung und mit gutem Blick fuer Details. Die Kommunikation war jederzeit klar.\"",
    quote_2: "\"Sehr strukturierte Arbeitsweise. Probleme wurden frueh erkannt und sauber geloest, ohne den Zeitplan zu riskieren.\"",
    quote_3: "\"Hat Verantwortung uebernommen und Features von Idee bis Deployment solide begleitet.\"",
    contact_title: "Say Hi!",
    contact_lead: "Du suchst Unterstuetzung fuer ein Frontend-Projekt? Schreib mir.",
    label_name: "Dein Name",
    label_email: "Deine E-Mail",
    label_message: "Deine Nachricht",
    privacy_text: "Ich habe die Datenschutzerklaerung gelesen und stimme zu.",
    privacy_text_html:
      "Ich habe die <a class=\"privacy-link\" href=\"datenschutz.html\">Datenschutzerklaerung</a> gelesen und stimme zu.",
    send_message: "Nachricht senden",
    error_name: "Bitte gib einen gueltigen Namen ein.",
    error_email: "Bitte gib eine gueltige E-Mail-Adresse ein.",
    error_message: "Deine Nachricht sollte mindestens 10 Zeichen haben.",
    error_privacy: "Bitte akzeptiere die Datenschutzerklaerung.",
    status_fix_fields: "Bitte korrigiere die markierten Felder.",
    status_sending: "Nachricht wird gesendet...",
    status_success: "Danke. Deine Nachricht wurde erfolgreich versendet.",
    status_failed: "Senden fehlgeschlagen. Bitte spaeter erneut versuchen.",
    aria_social_github: "GitHub",
    aria_social_email: "E-Mail",
    aria_social_linkedin: "LinkedIn",
    legal_imprint: "Impressum",
    legal_privacy: "Datenschutz",
    legal_home: "Home",
    imprint_h1: "Impressum",
    imprint_section_1_title: "Angaben gemaess Paragraph 5 TMG",
    imprint_section_1_body_html: "Vorname Nachname<br />Strasse Hausnummer<br />PLZ Ort<br />Deutschland",
    imprint_section_2_title: "Kontakt",
    imprint_section_2_body_html: "Telefon: +49 000 000000<br />E-Mail: deine-mail@example.com",
    imprint_section_3_title: "Verantwortlich fuer den Inhalt",
    imprint_section_3_body_html: "Vorname Nachname<br />Strasse Hausnummer<br />PLZ Ort",
    imprint_section_4_title: "Haftungshinweis",
    imprint_section_4_body:
      "Trotz sorgfaeltiger inhaltlicher Kontrolle uebernehmen wir keine Haftung fuer die Inhalte externer Links. Fuer den Inhalt der verlinkten Seiten sind ausschliesslich deren Betreiber verantwortlich.",
    privacy_h1: "Datenschutzerklaerung",
    privacy_section_1_title: "1. Allgemeine Hinweise",
    privacy_section_1_body:
      "Der Schutz deiner persoenlichen Daten ist wichtig. Diese Webseite verarbeitet nur die Daten, die fuer den Betrieb und die Kontaktaufnahme erforderlich sind.",
    privacy_section_2_title: "2. Verantwortliche Stelle",
    privacy_section_2_body_html: "Vorname Nachname<br />Strasse Hausnummer<br />PLZ Ort<br />E-Mail: deine-mail@example.com",
    privacy_section_3_title: "3. Verarbeitung im Kontaktformular",
    privacy_section_3_body:
      "Wenn du das Kontaktformular nutzt, werden Name, E-Mail-Adresse und Nachricht verarbeitet, um deine Anfrage zu beantworten. Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung.",
    privacy_section_4_title: "4. Speicherdauer",
    privacy_section_4_body:
      "Daten aus Kontaktanfragen werden nur so lange gespeichert, wie es fuer die Bearbeitung der Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
    privacy_section_5_title: "5. Deine Rechte",
    privacy_section_5_body:
      "Du hast das Recht auf Auskunft, Berichtigung, Loeschung, Einschraenkung der Verarbeitung, Datenuebertragbarkeit sowie Widerspruch gegen die Verarbeitung deiner Daten.",
  },
  en: {
    page_title_index: "Portfolio | Frontend Developer",
    page_title_imprint: "Imprint | Portfolio",
    page_title_privacy: "Privacy Policy | Portfolio",
    aria_menu: "Menu",
    aria_scroll_about: "Jump to about section",
    aria_about_photo: "Your profile photo",
    profile_placeholder: "Profile photo coming soon",
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
    portfolio_title: "Portfolio",
    portfolio_lead: "A selection of projects focused on frontend implementation and UX.",
    project_1: "Project 01 Screenshot",
    project_2: "Project 02 Screenshot",
    project_3: "Project 03 Screenshot",
    project_4: "Project 04 Screenshot",
    project_join_desc:
      "Task manager inspired by the Kanban system. Organize tasks with drag and drop, assign users, and structure categories.",
    project_el_pollo_desc:
      "2D jump-and-run game in vanilla JavaScript with character animations, boss-fight logic, and sound effects.",
    project_pokedex_desc:
      "Pokedex powered by an external API: load Pokemon, filter results, and show clean detail views.",
    project_join_github_aria: "Join repository on GitHub",
    project_el_pollo_github_aria: "El Pollo Loco repository on GitHub",
    project_pokedex_github_aria: "Pokedex repository on GitHub",
    references_title: "References",
    references_lead: "I work independently while staying highly collaborative. A few project references:",
    quote_1: "\"Reliable, strong execution, and a sharp eye for detail. Communication was clear throughout.\"",
    quote_2: "\"Very structured way of working. Issues were identified early and solved cleanly without risking the timeline.\"",
    quote_3: "\"Took ownership and delivered features from idea to deployment in a solid way.\"",
    contact_title: "Say Hi!",
    contact_lead: "Looking for frontend support on your project? Let's talk.",
    label_name: "Your name",
    label_email: "Your e-mail",
    label_message: "Your message",
    privacy_text: "I have read the privacy policy and agree.",
    privacy_text_html:
      "I have read the <a class=\"privacy-link\" href=\"datenschutz.html\">privacy policy</a> and agree to the processing of my data as outlined.",
    send_message: "Send message",
    error_name: "Please enter a valid name.",
    error_email: "Please enter a valid e-mail address.",
    error_message: "Your message should be at least 10 characters.",
    error_privacy: "Please accept the privacy policy.",
    status_fix_fields: "Please fix the highlighted fields.",
    status_sending: "Sending message...",
    status_success: "Thank you. Your message was sent successfully.",
    status_failed: "Sending failed. Please try again later.",
    aria_social_github: "GitHub",
    aria_social_email: "Email",
    aria_social_linkedin: "LinkedIn",
    legal_imprint: "Imprint",
    legal_privacy: "Privacy",
    legal_home: "Home",
    imprint_h1: "Imprint",
    imprint_section_1_title: "Information according to Section 5 TMG",
    imprint_section_1_body_html: "First name Last name<br />Street and number<br />ZIP City<br />Germany",
    imprint_section_2_title: "Contact",
    imprint_section_2_body_html: "Phone: +49 000 000000<br />E-mail: your-mail@example.com",
    imprint_section_3_title: "Responsible for content",
    imprint_section_3_body_html: "First name Last name<br />Street and number<br />ZIP City",
    imprint_section_4_title: "Liability notice",
    imprint_section_4_body:
      "Despite careful content control, we assume no liability for the content of external links. The operators of linked pages are solely responsible for their content.",
    privacy_h1: "Privacy Policy",
    privacy_section_1_title: "1. General information",
    privacy_section_1_body:
      "Protecting your personal data is important. This website only processes data required for operation and contact requests.",
    privacy_section_2_title: "2. Responsible entity",
    privacy_section_2_body_html: "First name Last name<br />Street and number<br />ZIP City<br />E-mail: your-mail@example.com",
    privacy_section_3_title: "3. Processing in the contact form",
    privacy_section_3_body:
      "When you use the contact form, your name, e-mail address, and message are processed to reply to your request. Processing is based on your consent.",
    privacy_section_4_title: "4. Storage period",
    privacy_section_4_body:
      "Data from contact requests is stored only as long as necessary to process your request or to comply with legal retention obligations.",
    privacy_section_5_title: "5. Your rights",
    privacy_section_5_body:
      "You have the right to access, rectify, erase, restrict processing, data portability, and object to the processing of your data.",
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

  document.querySelectorAll("[data-i18n-html]").forEach((element) => {
    const key = element.getAttribute("data-i18n-html");
    if (key && translations[safeLang][key]) {
      element.innerHTML = translations[safeLang][key];
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

let isLanguageSwitcherInitialized = false;

const initLanguageSwitcher = () => {
  if (isLanguageSwitcherInitialized || !langButtons.length) {
    return;
  }

  isLanguageSwitcherInitialized = true;

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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initLanguageSwitcher, { once: true });
} else {
  initLanguageSwitcher();
}
