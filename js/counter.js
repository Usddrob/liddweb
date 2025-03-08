document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.dataset.target);
          const duration = parseInt(counter.dataset.duration) || 2000;
          let startTime = null;
          const extra = counter.dataset.extra || "";
          const step = timestamp => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const progressRatio = Math.min(progress / duration, 1);
            const currentVal = Math.floor(progressRatio * target);
            counter.innerHTML = currentVal + extra;
            if (progress < duration) requestAnimationFrame(step);
            else counter.innerHTML = target + extra;
          };
          requestAnimationFrame(step);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      const span = counter.querySelector("span");
      counter.dataset.extra = span ? span.outerHTML : "";
      if (span) span.remove();
      if (!counter.dataset.target) counter.dataset.target = counter.textContent;
      if (!counter.dataset.duration) counter.dataset.duration = "2000";
      counter.innerHTML = "0" + counter.dataset.extra;
      observer.observe(counter);
    });
  });
  