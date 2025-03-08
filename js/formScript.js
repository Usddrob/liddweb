//modal--
const modalMain = document.getElementById("modal_main1");
const modalSuccess = document.getElementById("modal_main2");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("form_main_big");
const submitButton = document.getElementById("form_main_submit");
const successButton = document.getElementById("contact_button");
const openModalButtons = document.querySelectorAll(".form_main");
let modalTransitioning = false;

const updateScrollLock = () => {
  const isLocked =
    modalMain.classList.contains("active") ||
    modalSuccess.classList.contains("active") ||
    modalTransitioning;
  if (isLocked) {
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  }
};

const closeModalFunction = modal => {
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    updateScrollLock();
  }, 350);
};

const openModal = modal => {
  if (!modal) return;
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("active");
    updateScrollLock();
  });
};

openModalButtons.forEach(button => {
  button.addEventListener("click", e => {
    e.stopPropagation();

    if (window.innerWidth <= 950) {
      window.location.href = "../page/mobileForm.html"; 
    } else {
      openModal(modalMain);
    }
  });
});


closeModal.addEventListener("click", e => {
  e.stopPropagation();
  e.preventDefault();
  closeModalFunction(modalMain);
});

modalMain.addEventListener("click", e => {
  if (e.target === modalMain) {
    closeModalFunction(modalMain);
  }
});

modalSuccess.addEventListener("click", e => {
  if (e.target === modalSuccess) {
    closeModalFunction(modalSuccess);
  }
});

submitButton.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  modalTransitioning = true;
  closeModalFunction(modalMain);
  setTimeout(() => {
    openModal(modalSuccess);
    modalTransitioning = false;
  }, 400);
});

successButton.addEventListener("click", e => {
  e.stopPropagation();
  closeModalFunction(modalSuccess);
});
