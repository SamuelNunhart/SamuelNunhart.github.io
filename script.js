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
