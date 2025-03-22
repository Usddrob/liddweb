// Burger Toggle
const toggleMenu = (burgerId, menuId) => {
  const burger = document.getElementById(burgerId);
  const menu = document.getElementById(menuId);

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    const isActive = menu.classList.toggle("active");
    burger.classList.toggle("open", isActive);
    document.body.classList.toggle("no-scroll", isActive);
    document.documentElement.classList.toggle("no-scroll", isActive);
  });
};

toggleMenu("burger", "menu");

toggleMenu("burger_mob", "menu_mob");



// Language Dropdown
const languageButton = document.getElementById("languageButton");
const languageList = document.getElementById("languageList");
const languageText = languageButton?.querySelector("p");
let selectedLanguage = "ua";

if (languageButton && languageList) {
  languageButton.addEventListener("click", (event) => {
    event.stopPropagation();
    languageList.classList.toggle("open");
    document[
      languageList.classList.contains("open")
        ? "addEventListener"
        : "removeEventListener"
    ]("click", handleOutsideClick);
  });

  languageList.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) {
      selectedLanguage = button.dataset.lang;
      if (languageText)
        languageText.textContent = selectedLanguage.toUpperCase();
      updateSelectedLanguage();
      languageList.classList.remove("open");
      document.removeEventListener("click", handleOutsideClick);
    }
  });

  function handleOutsideClick(event) {
    if (
      !languageList.contains(event.target) &&
      !languageButton.contains(event.target)
    ) {
      languageList.classList.remove("open");
      document.removeEventListener("click", handleOutsideClick);
    }
  }

  function updateSelectedLanguage() {
    languageList.querySelectorAll("button").forEach((button) => {
      button.classList.toggle(
        "selected",
        button.dataset.lang === selectedLanguage
      );
    });
  }

  updateSelectedLanguage();
}

// select project
document.querySelectorAll(".select_work").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    button.classList.toggle("checked");
  });
});
//price
document.querySelectorAll(".select_price").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    document
      .querySelectorAll(".select_price")
      .forEach((btn) => btn.classList.remove("checked"));
    button.classList.add("checked");
  });
});
//selector
document.querySelectorAll(".select-box").forEach((selectBox) => {
  selectBox.addEventListener("click", function (e) {
    e.stopPropagation();
    const dropdown = this.closest(".select-wrapper");
    dropdown.classList.toggle("active");
  });
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", function () {
    const selectBox = this.closest(".select-wrapper").querySelector(".selected");

    selectBox.textContent = this.textContent;
    selectBox.dataset.value = this.dataset.value;
    selectBox.classList.add("active"); 

    this.closest(".select-wrapper").classList.remove("active");
  });
});

document.addEventListener("click", function (e) {
  const isDropdown = e.target.closest(".select-wrapper");
  if (!isDropdown) {
    document.querySelectorAll(".select-wrapper.active").forEach((dropdown) => {
      dropdown.classList.remove("active");
    });
  }
});
// Header Scroll Behavior
const style = document.createElement("style");
style.textContent = `
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    transition: transform 0.6s ease-in-out;
  }
  .header.hidden {
    transform: translateY(-100%);
  }
  .nav_sub, .share {
    transition: top 0.6s ease-in-out;
  }
`;
document.head.appendChild(style);

let lastScrollPosition = 0;
let ticking = false;
const header = document.querySelector(".header");
const stickyElements = document.querySelectorAll(".nav_sub, .share");
const SCROLL_THRESHOLD = 40;
const HEADER_HEIGHT = 72;

if (header) {
  window.addEventListener("scroll", () => {
    const currentScrollPosition = window.pageYOffset;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (currentScrollPosition <= 20) {
          header.classList.remove("hidden");
          stickyElements.forEach(el => el.style.top = `${HEADER_HEIGHT + 16}px`);
        } else if (Math.abs(currentScrollPosition - lastScrollPosition) >= SCROLL_THRESHOLD) {
          if (currentScrollPosition > lastScrollPosition) {
            header.classList.add("hidden");
            stickyElements.forEach(el => el.style.top = "16px");
          } else {
            header.classList.remove("hidden");
            stickyElements.forEach(el => el.style.top = `${HEADER_HEIGHT + 16}px`);
          }
          lastScrollPosition = currentScrollPosition;
        }
        ticking = false;
      });
      ticking = true;
    }
  });
  
  document.querySelectorAll('.nav_sub a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {

        const offset = header.classList.contains('hidden') ? 16 : HEADER_HEIGHT + 16;
        let targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({top: targetPosition, behavior: 'smooth'});
        
        setTimeout(() => {
          const updatedOffset = header.classList.contains('hidden') ? 16 : HEADER_HEIGHT + 16;
          targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - updatedOffset;
          window.scrollTo({top: targetPosition, behavior: 'smooth'});
        }, 200);
      }
    });
  });
}
// preloader
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    document.getElementById("preloader").style.opacity = "0";
    setTimeout(function () {
      document.getElementById("preloader").style.display = "none";
    }, 400); 
  }, 1000);
});