const buttons = document.querySelectorAll(".quote_btn");
const texts = document.querySelectorAll(".quote_text h2");
const quoteTextContainer = document.querySelector(".quote_text");

function updateQuoteContainerHeight() {
  let maxHeight = 0;
  texts.forEach(text => {
    const currentDisplay = text.style.display;
    if (getComputedStyle(text).display === "none") {
      text.style.display = "block";
    }
    const h = text.offsetHeight;
    if (h > maxHeight) maxHeight = h;
    text.style.display = currentDisplay;
  });
  quoteTextContainer.style.minHeight = maxHeight + "px";
}

if (buttons.length && texts.length) {
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      buttons.forEach(btn => btn.classList.remove("quote_active"));
      button.classList.add("quote_active");

      texts.forEach(text => {
        text.style.opacity = "0";
        text.style.transform = "translateY(10px)";
      });

      setTimeout(() => {
        texts.forEach(text => (text.style.display = "none"));
        texts[index].style.display = "block";
        setTimeout(() => {
          texts[index].style.opacity = "1";
          texts[index].style.transform = "translateY(0)";
        }, 10);
      }, 300);
    });
  });

  buttons[0].classList.add("quote_active");
  texts.forEach((text, i) => {
    text.style.opacity = i === 0 ? "1" : "0";
    text.style.display = i === 0 ? "block" : "none";
  });
}

window.addEventListener("load", updateQuoteContainerHeight);
window.addEventListener("resize", updateQuoteContainerHeight);

  