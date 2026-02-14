const ARROW_OBSERVER_OPTIONS = {
  threshold: 0.26,
  rootMargin: "0px 0px -20% 0px",
};

const getSectionArrowLinks = () =>
  Array.from(document.querySelectorAll(".section-arrow .section-arrow-link"));

const getArrowContainer = (link) => link.closest(".section-arrow");

const setArrowActiveState = (link, isActive) => {
  const container = getArrowContainer(link);
  if (container) {
    container.classList.toggle("is-active", isActive);
  }
};

const clearArrowStates = (links) => {
  links.forEach((link) => setArrowActiveState(link, false));
};

const getArrowTargetSection = (link) => {
  const href = link.getAttribute("href") || "";
  if (!href.startsWith("#")) {
    return null;
  }
  return document.querySelector(href);
};

const handleArrowEntries = (entries, targetMap) => {
  entries.forEach((entry) => {
    const link = targetMap.get(entry.target);
    if (link) {
      setArrowActiveState(link, entry.isIntersecting);
    }
  });
};

const createArrowObserver = (targetMap) =>
  new IntersectionObserver(
    (entries) => handleArrowEntries(entries, targetMap),
    ARROW_OBSERVER_OPTIONS
  );

const registerArrowTarget = (link, targetMap, observer) => {
  const target = getArrowTargetSection(link);
  if (!target) {
    return;
  }
  targetMap.set(target, link);
  observer.observe(target);
};

const observeArrowTargets = (links) => {
  if (!("IntersectionObserver" in window)) {
    return;
  }
  const targetMap = new Map();
  const observer = createArrowObserver(targetMap);
  links.forEach((link) => registerArrowTarget(link, targetMap, observer));
};

const initSectionArrows = () => {
  const links = getSectionArrowLinks();
  if (!links.length) {
    return;
  }
  clearArrowStates(links);
  observeArrowTargets(links);
};

window.initSectionArrows = initSectionArrows;
