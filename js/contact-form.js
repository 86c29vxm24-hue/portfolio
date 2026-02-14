const CONTACT_FIELD_NAMES = ["name", "email", "message", "privacy"];
const translate = (key) => (window.t ? window.t(key) : key);

const getContactControls = (form) => ({
  name: form.elements.namedItem("name"),
  email: form.elements.namedItem("email"),
  message: form.elements.namedItem("message"),
  privacy: form.elements.namedItem("privacy"),
});

const createTouchedState = () => ({
  name: false,
  email: false,
  message: false,
  privacy: false,
});

const getFormParts = () => {
  const form = document.getElementById("contact-form");
  const statusEl = document.getElementById("form-status");
  if (!form || !statusEl) {
    return null;
  }
  return {
    form,
    statusEl,
    submitButton: form.querySelector("button[type='submit']"),
    controls: getContactControls(form),
  };
};

const getErrorElement = (form, fieldName) =>
  form.querySelector(`[data-error-for="${fieldName}"]`);

const setFieldError = (form, fieldName, message) => {
  const errorEl = getErrorElement(form, fieldName);
  if (errorEl) {
    errorEl.textContent = message;
  }
};

const validateName = (control) =>
  control.value.trim().length < 2 ? translate("error_name") : "";

const validateEmail = (control) =>
  !control.validity.valid ? translate("error_email") : "";

const validateMessage = (control) =>
  control.value.trim().length < 10 ? translate("error_message") : "";

const validatePrivacy = (control) =>
  !control.checked ? translate("error_privacy") : "";

const FIELD_VALIDATORS = {
  name: validateName,
  email: validateEmail,
  message: validateMessage,
  privacy: validatePrivacy,
};

const validateField = (fieldName, controls) => {
  const control = controls[fieldName];
  const validator = FIELD_VALIDATORS[fieldName];
  if (!control || !validator) {
    return "";
  }
  return validator(control);
};

const validateTouchedFields = (form, controls, touched) => {
  let hasErrors = false;
  CONTACT_FIELD_NAMES.forEach((fieldName) => {
    if (!touched[fieldName]) {
      return;
    }
    const message = validateField(fieldName, controls);
    setFieldError(form, fieldName, message);
    hasErrors = hasErrors || Boolean(message);
  });
  return hasErrors;
};

const isFormValid = (controls) =>
  CONTACT_FIELD_NAMES.every((fieldName) => !validateField(fieldName, controls));

const updateSubmitState = (submitButton, controls) => {
  if (!submitButton) {
    return;
  }
  submitButton.disabled = !isFormValid(controls);
};

const showFormStatus = (statusEl, message, type) => {
  statusEl.textContent = message;
  statusEl.classList.remove("error", "success");
  if (type) {
    statusEl.classList.add(type);
  }
};

const syncTouchedFieldState = (context) => {
  validateTouchedFields(context.form, context.controls, context.touched);
  updateSubmitState(context.submitButton, context.controls);
};

const markFieldTouched = (touched, fieldName) => {
  touched[fieldName] = true;
};

const bindPrivacyChange = (control, fieldName, context) => {
  if (fieldName !== "privacy") {
    return;
  }
  control.addEventListener("change", () => {
    markFieldTouched(context.touched, fieldName);
    syncTouchedFieldState(context);
  });
};

const bindFieldEvents = (fieldName, context) => {
  const control = context.controls[fieldName];
  if (!control) {
    return;
  }
  control.addEventListener("blur", () => {
    markFieldTouched(context.touched, fieldName);
    syncTouchedFieldState(context);
  });
  control.addEventListener("input", () => updateSubmitState(context.submitButton, context.controls));
  bindPrivacyChange(control, fieldName, context);
};

const bindControlEvents = (context) => {
  CONTACT_FIELD_NAMES.forEach((fieldName) => {
    bindFieldEvents(fieldName, context);
  });
};

const setAllTouched = (touched) => {
  CONTACT_FIELD_NAMES.forEach((fieldName) => {
    touched[fieldName] = true;
  });
};

const hasBlockingErrors = (context) => {
  setAllTouched(context.touched);
  const hasErrors = validateTouchedFields(context.form, context.controls, context.touched);
  return hasErrors || !isFormValid(context.controls);
};

const getContactPayload = (controls) => ({
  name: controls.name.value.trim(),
  email: controls.email.value.trim(),
  message: controls.message.value.trim(),
});

const readJsonResponse = async (response) => {
  try {
    return await response.json();
  } catch (error) {
    return null;
  }
};

const sendContactRequest = async (payload) => {
  const response = await fetch("send_mail.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await readJsonResponse(response);
  if (!response.ok || !result || !result.success) {
    throw new Error("Mail delivery failed");
  }
};

const resetContactErrors = (form, touched) => {
  CONTACT_FIELD_NAMES.forEach((fieldName) => {
    touched[fieldName] = false;
    setFieldError(form, fieldName, "");
  });
};

const finalizeSuccessState = (context) => {
  context.form.reset();
  resetContactErrors(context.form, context.touched);
  showFormStatus(context.statusEl, translate("status_success"), "success");
  updateSubmitState(context.submitButton, context.controls);
};

const finalizeErrorState = (context) => {
  showFormStatus(context.statusEl, translate("status_failed"), "error");
  updateSubmitState(context.submitButton, context.controls);
};

const submitContactForm = async (context) => {
  showFormStatus(context.statusEl, translate("status_sending"), "");
  if (context.submitButton) {
    context.submitButton.disabled = true;
  }
  try {
    await sendContactRequest(getContactPayload(context.controls));
    finalizeSuccessState(context);
  } catch (error) {
    finalizeErrorState(context);
  }
};

const showInvalidFormState = (context) => {
  showFormStatus(context.statusEl, translate("status_fix_fields"), "error");
  updateSubmitState(context.submitButton, context.controls);
};

const handleFormSubmit = async (event, context) => {
  event.preventDefault();
  if (hasBlockingErrors(context)) {
    showInvalidFormState(context);
    return;
  }
  await submitContactForm(context);
};

const buildContactContext = () => {
  const parts = getFormParts();
  if (!parts) {
    return null;
  }
  return { ...parts, touched: createTouchedState() };
};

const initContactForm = () => {
  const context = buildContactContext();
  if (!context) {
    return;
  }
  bindControlEvents(context);
  context.form.addEventListener("submit", (event) => handleFormSubmit(event, context));
  updateSubmitState(context.submitButton, context.controls);
};

window.initContactForm = initContactForm;
