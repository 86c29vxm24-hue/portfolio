const runInitializer = (name) => {
  const initializer = window[name];
  if (typeof initializer === "function") {
    initializer();
  }
};

[
  "initLanguageSwitcher",
  "initMenu",
  "initContactForm",
  "initSkillSvgInlining",
  "initToTopButton",
  "initPortfolio",
].forEach(runInitializer);
