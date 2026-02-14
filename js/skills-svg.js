const SKILL_SHAPE_SELECTOR = "path, rect, circle, ellipse, polygon, polyline, line";

const getSkillImages = () =>
  Array.from(document.querySelectorAll(".skill-item img[src$='.svg']"));

const fetchInlineSvg = async (src) => {
  const response = await fetch(src);
  if (!response.ok) {
    return null;
  }
  const svgText = await response.text();
  const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
  return parsed.querySelector("svg");
};

const setSvgAccessibility = (svg, alt) => {
  if (alt) {
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", alt);
    return;
  }
  svg.setAttribute("aria-hidden", "true");
};

const prepareSvgNode = (svg, alt) => {
  svg.classList.add("skill-svg");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  setSvgAccessibility(svg, alt);
};

const getSvgTextStartY = (svg) => {
  const viewBox = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
  return viewBox ? viewBox.y + viewBox.height * 0.74 : 76;
};

const markMaterialDesignLabel = (svg) => {
  const paths = Array.from(svg.querySelectorAll("path"));
  paths.forEach((path) => path.classList.remove("skill-svg-label"));
  const labelPath = paths[paths.length - 1];
  if (labelPath) {
    labelPath.classList.add("skill-svg-label");
  }
};

const markSvgTextShapes = (svg, textStartY) => {
  svg.querySelectorAll(SKILL_SHAPE_SELECTOR).forEach((shape) => {
    try {
      const box = shape.getBBox();
      if (box.y >= textStartY) {
        shape.classList.add("skill-svg-label");
      }
    } catch (error) {
      // Ignore non-rendered shapes without a bounding box.
    }
  });
};

const markSvgLabels = (svg, alt) => {
  if (alt === "Material Design") {
    markMaterialDesignLabel(svg);
    return;
  }
  markSvgTextShapes(svg, getSvgTextStartY(svg));
};

const inlineSkillImageCore = async (img) => {
  const src = img.getAttribute("src");
  if (!src) {
    return;
  }
  const svg = await fetchInlineSvg(src);
  if (!svg) {
    return;
  }
  const alt = img.getAttribute("alt");
  prepareSvgNode(svg, alt);
  img.replaceWith(svg);
  markSvgLabels(svg, alt);
};

const inlineSkillImage = async (img) => {
  try {
    await inlineSkillImageCore(img);
  } catch (error) {
    // Keep the original image if inline conversion fails.
  }
};

const inlineSkillSvgs = async () => {
  const skillImages = getSkillImages();
  if (!skillImages.length) {
    return;
  }
  await Promise.all(skillImages.map(inlineSkillImage));
};

const initSkillSvgInlining = () => {
  inlineSkillSvgs();
};

window.initSkillSvgInlining = initSkillSvgInlining;
