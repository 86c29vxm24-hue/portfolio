const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");
const translate = window.t || ((key) => key);

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
        return translate("error_name");
      }
      return "";
    }

    if (fieldName === "email") {
      if (!control.validity.valid) {
        return translate("error_email");
      }
      return "";
    }

    if (fieldName === "message") {
      const value = control.value.trim();
      if (value.length < 10) {
        return translate("error_message");
      }
      return "";
    }

    if (fieldName === "privacy") {
      if (!control.checked) {
        return translate("error_privacy");
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
      showFormStatus(translate("status_fix_fields"), "error");
      updateSubmitState();
      return;
    }

    showFormStatus(translate("status_sending"), "");

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
      showFormStatus(translate("status_success"), "success");
      updateSubmitState();
    } catch (error) {
      showFormStatus(translate("status_failed"), "error");
      updateSubmitState();
    }
  });

  updateSubmitState();
}

if (window.initLanguageSwitcher) {
  window.initLanguageSwitcher();
}

const inlineSkillSvgs = async () => {
  const skillImages = document.querySelectorAll(".skill-item img[src$='.svg']");

  if (!skillImages.length) {
    return;
  }

  await Promise.all(
    Array.from(skillImages).map(async (img) => {
      try {
        const src = img.getAttribute("src");
        if (!src) {
          return;
        }

        const response = await fetch(src);
        if (!response.ok) {
          return;
        }

        const svgText = await response.text();
        const parsed = new DOMParser().parseFromString(svgText, "image/svg+xml");
        const svg = parsed.querySelector("svg");

        if (!svg) {
          return;
        }

        svg.classList.add("skill-svg");
        svg.removeAttribute("width");
        svg.removeAttribute("height");

        const alt = img.getAttribute("alt");
        if (alt) {
          svg.setAttribute("role", "img");
          svg.setAttribute("aria-label", alt);
        } else {
          svg.setAttribute("aria-hidden", "true");
        }

        img.replaceWith(svg);

        const viewBox = svg.viewBox && svg.viewBox.baseVal ? svg.viewBox.baseVal : null;
        const textStartY = viewBox ? viewBox.y + viewBox.height * 0.74 : 76;
        const shapeSelector = "path, rect, circle, ellipse, polygon, polyline, line";

        svg.querySelectorAll(shapeSelector).forEach((shape) => {
          try {
            const box = shape.getBBox();
            if (box.y >= textStartY) {
              shape.classList.add("skill-svg-label");
            }
          } catch (error) {
            // Ignore non-rendered shapes that cannot provide a bounding box.
          }
        });
      } catch (error) {
        // Keep the original image if inline conversion fails.
      }
    })
  );
};

inlineSkillSvgs();

const toTopButton = document.querySelector(".to-top-btn");

if (toTopButton) {
  toTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
