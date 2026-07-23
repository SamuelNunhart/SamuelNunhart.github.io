const year = document.querySelector("#year");

if (year) {
  year.textContent = new Date().getFullYear();
}

const emailToggle = document.querySelector(".contact-toggle");
const emailPanel = document.querySelector("#email-panel");
const emailCopyButton = document.querySelector("[data-copy-email]");
const emailStatus = document.querySelector(".email-status");
const contactSection = emailPanel?.closest(".contact");

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

if (emailToggle && emailPanel) {
  emailToggle.addEventListener("click", () => {
    const isOpen = emailToggle.getAttribute("aria-expanded") === "true";
    const nextState = !isOpen;

    emailToggle.setAttribute("aria-expanded", String(nextState));
    emailPanel.classList.toggle("is-open", nextState);
    emailPanel.setAttribute("aria-hidden", String(!nextState));
    contactSection?.classList.toggle("email-open", nextState);
  });
}

if (emailCopyButton) {
  emailCopyButton.addEventListener("click", async () => {
    const email = emailCopyButton.value;
    emailCopyButton.select();

    try {
      await copyText(email);
      if (emailStatus) {
        emailStatus.textContent = "Copied";
      }
      window.setTimeout(() => {
        if (emailStatus) {
          emailStatus.textContent = "";
        }
      }, 1600);
    } catch {
      if (emailStatus) {
        emailStatus.textContent = "";
      }
    }
  });
}

const modalOpeners = document.querySelectorAll("[data-open-modal]");
const modalClosers = document.querySelectorAll("[data-close-modal]");
let activeModal = null;
let lastModalTrigger = null;

function hideModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");

  modal.querySelectorAll("video").forEach((video) => {
    video.pause();
  });
}

function closeModal(modal = activeModal) {
  if (!modal) {
    return;
  }

  hideModal(modal);
  document.body.classList.remove("modal-open");

  activeModal = null;
  lastModalTrigger?.focus();
  lastModalTrigger = null;
}

function openModal(modal, trigger) {
  if (!modal) {
    return;
  }

  if (activeModal && activeModal !== modal) {
    hideModal(activeModal);
  }

  activeModal = modal;
  lastModalTrigger = trigger;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close")?.focus();
}

modalOpeners.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.getElementById(button.dataset.openModal);
    openModal(modal, button);
  });
});

modalClosers.forEach((button) => {
  button.addEventListener("click", () => {
    closeModal(button.closest(".media-modal"));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeModal) {
    closeModal();
  }
});
