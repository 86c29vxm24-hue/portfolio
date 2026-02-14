const mobileProjectsQuery = window.matchMedia("(max-width: 680px)");
const tabletProjectsQuery = window.matchMedia("(min-width: 681px) and (max-width: 980px)");
let portfolioScrollObserver = null;

const getPortfolioRows = () => Array.from(document.querySelectorAll(".project-row"));
const getRowTrigger = (row) => row.querySelector(".project-card-image");
const getPortfolioTargets = (rows) => rows.map(getRowTrigger).filter(Boolean);

const syncPortfolioRowExpandedState = (rows) => {
  rows.forEach((row) => {
    const trigger = getRowTrigger(row);
    if (trigger) {
      trigger.setAttribute("aria-expanded", String(row.classList.contains("is-open")));
    }
  });
};

const setOpenPortfolioRow = (rows, rowToOpen) => {
  rows.forEach((row) => {
    row.classList.toggle("is-open", row === rowToOpen);
  });
  syncPortfolioRowExpandedState(rows);
};

const prepareRowTrigger = (trigger) => {
  trigger.dataset.toggleBound = "true";
  trigger.setAttribute("role", "button");
  trigger.setAttribute("tabindex", "0");
  trigger.setAttribute("aria-expanded", "false");
};

const handleTriggerKeydown = (event, onActivate) => {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }
  event.preventDefault();
  onActivate();
};

const createRowToggleHandler = (row, rows) => () => {
  if (!tabletProjectsQuery.matches) {
    return;
  }
  const shouldOpen = !row.classList.contains("is-open");
  setOpenPortfolioRow(rows, shouldOpen ? row : null);
};

const bindPortfolioRowTrigger = (row, rows) => {
  const trigger = getRowTrigger(row);
  if (!trigger || trigger.dataset.toggleBound === "true") {
    return;
  }
  const toggleRow = createRowToggleHandler(row, rows);
  prepareRowTrigger(trigger);
  trigger.addEventListener("click", toggleRow);
  trigger.addEventListener("keydown", (event) => handleTriggerKeydown(event, toggleRow));
};

const bindPortfolioRowTriggers = (rows) => {
  rows.forEach((row) => {
    bindPortfolioRowTrigger(row, rows);
  });
};

const clearPortfolioObserver = () => {
  if (!portfolioScrollObserver) {
    return;
  }
  portfolioScrollObserver.disconnect();
  portfolioScrollObserver = null;
};

const resetPortfolioRows = (rows) => {
  rows.forEach((row) => {
    row.classList.remove("is-inview", "is-open");
  });
  syncPortfolioRowExpandedState(rows);
};

const revealAllPortfolioRows = (rows) => {
  rows.forEach((row) => {
    row.classList.add("is-inview");
  });
};

const handlePortfolioEntries = (entries) => {
  entries.forEach((entry) => {
    const row = entry.target.closest(".project-row");
    if (!row) {
      return;
    }
    row.classList.toggle("is-inview", entry.isIntersecting);
  });
};

const createPortfolioObserver = () =>
  new IntersectionObserver(handlePortfolioEntries, {
    threshold: 0.28,
    rootMargin: "0px 0px -8% 0px",
  });

const setupPortfolioScrollReveal = (rows, targets) => {
  clearPortfolioObserver();
  resetPortfolioRows(rows);
  if (!mobileProjectsQuery.matches) {
    return;
  }
  if (!("IntersectionObserver" in window)) {
    revealAllPortfolioRows(rows);
    return;
  }
  portfolioScrollObserver = createPortfolioObserver();
  targets.forEach((target) => portfolioScrollObserver.observe(target));
};

const bindMediaQueryChange = (query, handler) => {
  if (typeof query.addEventListener === "function") {
    query.addEventListener("change", handler);
    return;
  }
  if (typeof query.addListener === "function") {
    query.addListener(handler);
  }
};

const initPortfolio = () => {
  const rows = getPortfolioRows();
  if (!rows.length) {
    return;
  }
  const targets = getPortfolioTargets(rows);
  const refreshPortfolioState = () => setupPortfolioScrollReveal(rows, targets);
  bindPortfolioRowTriggers(rows);
  refreshPortfolioState();
  bindMediaQueryChange(mobileProjectsQuery, refreshPortfolioState);
  bindMediaQueryChange(tabletProjectsQuery, refreshPortfolioState);
};

window.initPortfolio = initPortfolio;
