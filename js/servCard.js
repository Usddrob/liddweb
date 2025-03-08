// FAQ ----------
document.addEventListener("DOMContentLoaded", function () {
  const faqItems = document.querySelectorAll(".faq_item");
  let activeItem = null;

  faqItems.forEach((item) => {
    const content = item.querySelector(".faq_content");
    const text = content.querySelector("p");
    text.style.opacity = "0";

    item.addEventListener("click", function () {
      if (item === activeItem) {
        closeItem(item, content, text);
        activeItem = null;
      } else {
        if (activeItem) {
          const activeContent = activeItem.querySelector(".faq_content");
          const activeText = activeContent.querySelector("p");
          closeItem(activeItem, activeContent, activeText);
        }
        openItem(item, content, text);
        activeItem = item;
      }
    });
  });

  function openItem(item, content, text) {
    item.classList.add("active");
    content.style.maxHeight = content.scrollHeight + "px";
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
    setTimeout(() => {
      text.style.opacity = "1";
      text.style.transition = "opacity 0.35s ease-in-out";
    }, 400);
  }

  function closeItem(item, content, text) {
    text.style.opacity = "0";
    setTimeout(() => {
      content.style.maxHeight = "0px";
      content.style.opacity = "0";
      content.style.transform = "translateY(-10px)";
    }, 10);
    setTimeout(() => {
      item.classList.remove("active");
    }, 600);
  }
});

// animate Process
const wrapper = document.querySelector(".wrapper");
const container = document.querySelector(".box_proc");
const progressBar = document.querySelector(".progres .active");

let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationTimeout = null;

wrapper.addEventListener("mousedown", startDrag);
wrapper.addEventListener("touchstart", startDrag, { passive: true });
wrapper.addEventListener("mousemove", onDrag);
wrapper.addEventListener("touchmove", onDrag, { passive: true });
wrapper.addEventListener("mouseup", endDrag);
wrapper.addEventListener("mouseleave", endDrag);
wrapper.addEventListener("touchend", endDrag);

function startDrag(e) {
  clearTimeout(animationTimeout);
  isDragging = true;
  startX = getPositionX(e);
  progressBar.classList.remove("animate");
  container.style.transition = "none";
}

function onDrag(e) {
  if (!isDragging) return;
  const currentX = getPositionX(e);
  const diff = currentX - startX;
  currentTranslate = prevTranslate + diff;
  const containerWidth = container.scrollWidth;
  const wrapperWidth = wrapper.offsetWidth;
  const maxTranslate = 0;
  const minTranslate = wrapperWidth - containerWidth;
  if (currentTranslate > maxTranslate) {
    currentTranslate = maxTranslate;
  }
  if (currentTranslate < minTranslate) {
    currentTranslate = minTranslate;
  }
  container.style.transform = `translateX(${currentTranslate}px)`;
  updateProgress();
}

function endDrag() {
  if (!isDragging) return;
  isDragging = false;
  prevTranslate = currentTranslate;
  container.style.transition = "transform 0.3s ease-out";
  if (currentTranslate === 0) {
    animationTimeout = setTimeout(() => {
      progressBar.classList.add("animate");
    }, 2000);
  }
}

function getPositionX(e) {
  return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function updateProgress() {
  const containerWidth = container.scrollWidth;
  const wrapperWidth = wrapper.offsetWidth;
  const maxScroll = containerWidth - wrapperWidth;
  const scrolled = Math.abs(currentTranslate);
  const percentage = (scrolled / maxScroll) * 100;
  progressBar.style.width = `${percentage}%`;
}

// impact ---------
document.addEventListener("DOMContentLoaded", () => {
  const openDelay = 400;
  const cards = document.querySelectorAll(".impact_cart");
  let activeCard = document.querySelector(".impact_cart.active");
  if (window.innerWidth <= 768 && document.querySelector(".impact_cart.mob")) {
    if (activeCard) activeCard.classList.remove("active");
    activeCard = document.querySelector(".impact_cart.mob");
    activeCard.classList.add("active");
  }
  if (!activeCard) {
    activeCard = cards[0];
    activeCard.classList.add("active");
  }
  resetContent(activeCard);
  setTimeout(() => {
    showContent(activeCard);
    triggerAnimationsWhenVisible(activeCard);
  }, openDelay);
  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (card.classList.contains("active")) return;
      const prevCard = document.querySelector(".impact_cart.active");
      hideContent(prevCard);
      prevCard.classList.remove("active");
      resetContent(card);
      card.classList.add("active");
      setTimeout(() => {
        showContent(card);
        triggerAnimationsWhenVisible(card);
      }, openDelay);
    });
  });
});

function resetContent(card) {
  const numbers = card.querySelectorAll(".value .numberL");
  numbers.forEach(numEl => {
    if (!numEl.hasAttribute("data-final")) {
      const finalValue = numEl.textContent.replace("+", "").replace("%", "").trim();
      numEl.setAttribute("data-final", finalValue);
    }
    numEl.textContent = "+0%";
  });
  const svgPath = card.querySelector(".graph .table svg path");
  if (svgPath) {
    const length = svgPath.getTotalLength();
    svgPath.style.transition = "none";
    svgPath.style.strokeDasharray = length;
    svgPath.style.strokeDashoffset = length;
  }
  const listEl = card.querySelector(".list");
  const infoEl = card.querySelector(".info");
  if (listEl) listEl.classList.remove("visible");
  if (infoEl) infoEl.classList.remove("visible");
}

function showContent(card) {
  const listEl = card.querySelector(".list");
  const infoEl = card.querySelector(".info");
  if (listEl) listEl.classList.add("visible");
  if (infoEl) infoEl.classList.add("visible");
}

function hideContent(card) {
  const listEl = card.querySelector(".list");
  const infoEl = card.querySelector(".info");
  if (listEl) listEl.classList.remove("visible");
  if (infoEl) infoEl.classList.remove("visible");
}

function triggerAnimationsWhenVisible(card) {
  if (isElementInViewport(card)) {
    triggerAnimations(card);
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          triggerAnimations(card);
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(card);
  }
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function triggerAnimations(card) {
  animateNumbers(card);
  animateGraph(card);
}

function animateNumbers(card) {
  // Змінили селектор на .numberL для уніфікації з resetContent
  const numbers = card.querySelectorAll(".value .numberL");
  numbers.forEach(numEl => {
    const finalValue = parseInt(numEl.getAttribute("data-final"));
    const duration = 1500;
    let startTime = null;
    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const current = Math.min(finalValue, Math.floor((progress / duration) * finalValue));
      numEl.textContent = `+${current}%`;
      if (progress < duration) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

function animateGraph(card) {
  const svgPath = card.querySelector(".graph .table svg path");
  if (svgPath) {
    svgPath.style.transition = "stroke-dashoffset 4s ease";
    svgPath.style.strokeDashoffset = "0";
  }
}
