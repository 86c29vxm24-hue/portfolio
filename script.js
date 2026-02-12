const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

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
        return "Bitte gib einen gueltigen Namen ein.";
      }
      return "";
    }

    if (fieldName === "email") {
      if (!control.validity.valid) {
        return "Bitte gib eine gueltige E-Mail-Adresse ein.";
      }
      return "";
    }

    if (fieldName === "message") {
      const value = control.value.trim();
      if (value.length < 10) {
        return "Deine Nachricht sollte mindestens 10 Zeichen haben.";
      }
      return "";
    }

    if (fieldName === "privacy") {
      if (!control.checked) {
        return "Bitte akzeptiere die Datenschutzerklaerung.";
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
      showFormStatus("Bitte korrigiere die markierten Felder.", "error");
      updateSubmitState();
      return;
    }

    showFormStatus("Nachricht wird gesendet...", "");

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
      showFormStatus("Danke. Deine Nachricht wurde erfolgreich versendet.", "success");
      updateSubmitState();
    } catch (error) {
      showFormStatus("Senden fehlgeschlagen. Bitte spaeter erneut versuchen.", "error");
      updateSubmitState();
    }
  });

  updateSubmitState();
}
