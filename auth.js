/* ============================================================
   Stackly Law Firm — Auth pages (Login & Signup)
   Shared validation, password toggles, strength meter, toast
   ============================================================ */

(() => {
  "use strict";

  const setError = (input, errorEl, message) => {
    input.classList.add("is-invalid");
    errorEl.textContent = message;
    errorEl.classList.add("is-visible");
  };

  const clearError = (input, errorEl) => {
    input.classList.remove("is-invalid");
    errorEl.textContent = "";
    errorEl.classList.remove("is-visible");
  };

  const validators = {
    name: (value) => {
      if (!value) return "Full name is required";
      if (!/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(value))
        return "Only alphabets allowed (no numbers or symbols)";
      return "";
    },
    email: (value) => {
      if (!value) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Enter a valid email address";
      return "";
    },
    phone: (value) => {
      if (!value) return "Phone number is required";
      if (!/^[0-9]+$/.test(value)) return "Only numbers allowed";
      if (value.length > 10) return "Phone must be max 10 digits";
      return "";
    },
    password: (value) => {
      if (!value) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return "";
    },
  };

  /* ---------- Success toast ---------- */
  let toastEl = null;

  const showToast = (message) => {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "auth-toast";
      toastEl.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span></span>';
      document.body.appendChild(toastEl);
    }

    toastEl.querySelector("span").textContent = message;
    toastEl.classList.remove("is-hidden");
    toastEl.classList.add("is-visible");

    clearTimeout(toastEl._timer);
    toastEl._timer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
      toastEl.classList.add("is-hidden");
    }, 3000);
  };

  /* ---------- Show / hide password ---------- */
  document.querySelectorAll("[data-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.getAttribute("data-toggle"));
      if (!input) return;
      const show = input.type === "password";
      input.type = show ? "text" : "password";
      button.classList.toggle("is-on", show);
      button.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  });

  /* ---------- Password strength meter ---------- */
  const strengthBars = document.querySelectorAll(".auth-strength-bar");
  const strengthLabel = document.getElementById("signupStrengthLabel");

  const passwordStrength = (value) => {
    let score = 0;
    if (!value) return 0;
    if (value.length >= 6) score++;
    if (value.length >= 10) score++;
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score++;
    if (/\d/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    return score;
  };

  const renderStrength = (value) => {
    const score = passwordStrength(value);
    const filled = score >= 4 ? 3 : score >= 2 ? 2 : score >= 1 ? 1 : 0;
    const words = ["", "Weak", "Medium", "Strong"];
    const label = value ? `Password strength: ${words[filled]}` : "";

    strengthBars.forEach((bar, index) => {
      bar.classList.toggle("is-fill", index < filled);
    });

    if (strengthLabel) {
      strengthLabel.textContent = label;
      strengthLabel.classList.toggle("has-value", Boolean(value));
    }
  };

  if (strengthBars.length && strengthLabel) {
    const pwInput = document.getElementById("signupPassword");
    if (pwInput) {
      pwInput.addEventListener("input", () => renderStrength(pwInput.value));
    }
  }

  /* ---------- Live re-validation helper ---------- */
  const bindLiveValidation = (input, errorEl, validate) => {
    input.addEventListener("blur", () => {
      const message = validate(input.value.trim());
      if (message) setError(input, errorEl, message);
    });
    input.addEventListener("input", () => {
      if (input.classList.contains("is-invalid")) {
        const message = validate(input.value.trim());
        if (message) setError(input, errorEl, message);
        else clearError(input, errorEl);
      }
    });
  };

  /* ---------- Session helpers ---------- */
  const getSelectedRole = () =>
    (document.querySelector('input[name="role"]:checked') || {}).value || "user";

  const displayNameFromEmail = (email) => {
    const local = (email || "").split("@")[0];
    return (
      local
        .split(/[._-]+/)
        .filter(Boolean)
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ") || "User"
    );
  };

  const storeUser = (data) => {
    try {
      localStorage.setItem("stackly_user", JSON.stringify(data));
    } catch (e) {
      /* storage unavailable */
    }
  };

  const redirectByRole = (role) => {
    const target = role === "admin" ? "admin.html" : "dashboard.html";
    setTimeout(() => (window.location.href = target), 1000);
  };

  /* ---------- Login form ---------- */
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    const email = loginForm.querySelector("#loginEmail");
    const emailError = document.getElementById("loginEmailError");
    const password = loginForm.querySelector("#loginPassword");
    const passwordError = document.getElementById("loginPasswordError");

    bindLiveValidation(email, emailError, validators.email);
    bindLiveValidation(password, passwordError, validators.password);

    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      const emailMsg = validators.email(email.value.trim());
      if (emailMsg) {
        setError(email, emailError, emailMsg);
        isValid = false;
      } else {
        clearError(email, emailError);
      }

      const passwordMsg = validators.password(password.value);
      if (passwordMsg) {
        setError(password, passwordError, passwordMsg);
        isValid = false;
      } else {
        clearError(password, passwordError);
      }

      if (!isValid) return;

      const role = getSelectedRole();
      const emailValue = email.value.trim();
      storeUser({
        name: displayNameFromEmail(emailValue),
        email: emailValue,
        phone: "",
        role,
      });
      loginForm.reset();
      showToast("Login successful! Redirecting to your dashboard\u2026");
      redirectByRole(role);
    });
  }

  /* ---------- Signup form ---------- */
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    const name = signupForm.querySelector("#signupName");
    const nameError = document.getElementById("signupNameError");
    const email = signupForm.querySelector("#signupEmail");
    const emailError = document.getElementById("signupEmailError");
    const phone = signupForm.querySelector("#signupPhone");
    const phoneError = document.getElementById("signupPhoneError");
    const password = signupForm.querySelector("#signupPassword");
    const passwordError = document.getElementById("signupPasswordError");
    const confirm = signupForm.querySelector("#signupConfirm");
    const confirmError = document.getElementById("signupConfirmError");

    const validateConfirm = (value) => {
      if (!value) return "Please confirm your password";
      if (value !== password.value) return "Passwords do not match";
      return "";
    };

    bindLiveValidation(name, nameError, validators.name);
    bindLiveValidation(email, emailError, validators.email);
    bindLiveValidation(phone, phoneError, validators.phone);
    bindLiveValidation(password, passwordError, validators.password);
    bindLiveValidation(confirm, confirmError, validateConfirm);

    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isValid = true;

      const fields = [
        { input: name, error: nameError, message: validators.name(name.value.trim()) },
        { input: email, error: emailError, message: validators.email(email.value.trim()) },
        { input: phone, error: phoneError, message: validators.phone(phone.value.trim()) },
        { input: password, error: passwordError, message: validators.password(password.value) },
        { input: confirm, error: confirmError, message: validateConfirm(confirm.value) },
      ];

      fields.forEach((field) => {
        if (field.message) {
          setError(field.input, field.error, field.message);
          isValid = false;
        } else {
          clearError(field.input, field.error);
        }
      });

      if (!isValid) return;

      const role = getSelectedRole();
      storeUser({
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        role,
      });
      signupForm.reset();
      renderStrength("");
      showToast("Account created successfully! Redirecting\u2026");
      redirectByRole(role);
    });
  }
})();
