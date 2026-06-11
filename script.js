//Role Heading Function

const roles = [
  "Full-Stack Developer",
  "MERN Stack Developer",
  "Back-End Developer",
  "Front-End Developer",
  "Mobile App Developer",
  "UI/UX Designer",
];
const typingElement = document.getElementById("typing-role");
let roleIndex = 0;
let charIndex = 0;

function typeRole() {
  if (charIndex < roles[roleIndex].length) {
    typingElement.innerHTML += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 100); // Typing speed
  } else {
    setTimeout(eraseRole, 2000); // Wait before erasing
  }
}

function eraseRole() {
  if (charIndex > 0) {
    typingElement.innerHTML = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 50); // Erase speed
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 1000); // Delay before typing next role
  }
}
// Delay typing start (e.g., 1.5s after page load)
setTimeout(typeRole, 1500);

// Run scripts after DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Contact form submission
  const form = document.getElementById("contact-form");
  const msg = document.getElementById("msg");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const msgError = document.getElementById("msgError");
  const subjectError = document.getElementById("subjectError");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const inputName = document.getElementById("inputName").value.trim();
      const inputEmail = document.getElementById("inputEmail").value.trim();
      const inputSubject = document.getElementById("inputSubject").value.trim();
      const inputMessage = document.getElementById("inputMessage").value.trim();

      // Reset errors
      nameError.textContent = "";
      nameError.style.opacity = "0";
      emailError.textContent = "";
      emailError.style.opacity = "0";
      subjectError.textContent = "";
      subjectError.style.opacity = "0";
      msgError.textContent = "";
      msgError.style.opacity = "0";

      let isValid = true;

      // Name validation
      if (!inputName) {
        nameError.textContent = "Name is required.";
        nameError.style.opacity = "1";
        isValid = false;
        setTimeout(() => {
          nameError.style.opacity = "0";
        }, 5000);
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!inputEmail) {
        emailError.textContent = "Email is required.";
        emailError.style.opacity = "1";
        isValid = false;
        setTimeout(() => {
          emailError.style.opacity = "0";
        }, 5000);
      } else if (!emailRegex.test(inputEmail)) {
        emailError.textContent = "Please enter a valid email address.";
        emailError.style.opacity = "1";
        isValid = false;
        setTimeout(() => {
          emailError.style.opacity = "0";
        }, 5000);
      }

      // Subject validation
      if (!inputSubject) {
        subjectError.textContent = "Subject is required.";
        subjectError.style.opacity = "1";
        isValid = false;
        setTimeout(() => {
          subjectError.style.opacity = "0";
        }, 5000);
      }

      // Message validation (min 5 words)
      const wordCount = inputMessage.split(/\s+/).filter(Boolean).length;
      if (wordCount < 5) {
        msgError.textContent = "Please enter at least 5 words.";
        msgError.style.opacity = "1";
        isValid = false;
        setTimeout(() => {
          msgError.style.opacity = "0";
        }, 5000);
      }

      if (!isValid) return;

      // Construct mailto link
      const recipientEmail = "mauryasurya22@gmail.com";
      const subject = encodeURIComponent(inputSubject);
      const body = encodeURIComponent(
        `Name: ${inputName}\n` +
          `Email: ${inputEmail}\n\n` +
          `Message:\n${inputMessage}`
      );
      const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

      // UI feedback
      msg.style.color = "#0783ff";
      msg.textContent = "✅ Success! Opening your email client...";
      msg.style.opacity = "1";

      // Open email client and reset form
      window.location.href = mailtoLink;
      setTimeout(() => {
        form.reset();
        msg.style.opacity = "0";
      }, 5000);
    });
  }

  // Side menu (mobile)
  const sidemenu = document.getElementById("sidemenu");
  const openMenuBtn = document.querySelector("nav .fa-bars");
  const closeMenuBtn = document.querySelector("nav .fa-times");

  if (sidemenu && openMenuBtn && closeMenuBtn) {
    openMenuBtn.addEventListener("click", () => {
      sidemenu.classList.add("menu-open");
    });
    closeMenuBtn.addEventListener("click", () => {
      sidemenu.classList.remove("menu-open");
    });
  }

  // About section tabs
  const tabLinks = document.querySelectorAll(".tab-links");
  const tabContents = document.querySelectorAll(".tab-contents");

  tabLinks.forEach((tabLink) => {
    tabLink.addEventListener("click", () => {
      const tabName = tabLink.dataset.tab;
      if (!tabName) return;

      tabLinks.forEach((link) => link.classList.remove("active-link"));
      tabContents.forEach((content) => content.classList.remove("active-tab"));

      tabLink.classList.add("active-link");
      document.getElementById(tabName).classList.add("active-tab");
    });
  });

  // Service card "Read More" toggle
  const serviceButtons = document.querySelectorAll(".toggle-btn");
  serviceButtons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const card = this.closest(".service-card");
      card.classList.toggle("expanded");

      // Toggle button text
      this.textContent = card.classList.contains("expanded")
        ? "Read Less"
        : "Read More";
    });
  });

  // "See More" projects toggle
  const seeMoreBtn = document.getElementById("seeMoreBtn");
  const extraProjects = document.querySelector(".extra-projects");
  if (seeMoreBtn && extraProjects) {
    seeMoreBtn.addEventListener("click", () => {
      extraProjects.classList.toggle("show");
      seeMoreBtn.textContent = extraProjects.classList.contains("show")
        ? "See Less"
        : "See More";
    });
  }

  // Fade-in animation for sections on scroll
  const sections = document.querySelectorAll(
    "#about, #services, #projects, #contact"
  );
  if (sections.length > 0) {
    const observerOptions = {
      root: null, // relative to document viewport
      rootMargin: "0px",
      threshold: 0.1, // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });
  }

  // Theme switcher
  const themeIcon = document.getElementById("theme-icon");
  if (themeIcon) {
    // On page load, check for saved theme in localStorage
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-theme");
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }

    themeIcon.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const isLightTheme = document.body.classList.contains("light-theme");

      themeIcon.classList.toggle("fa-sun", isLightTheme);
      themeIcon.classList.toggle("fa-moon", !isLightTheme);

      localStorage.setItem("theme", isLightTheme ? "light" : "dark");
    });
  }
});
