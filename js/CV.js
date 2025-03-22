const modalMain1 = document.getElementById("modal_main3");
const modalSuccess1 = document.getElementById("modal_main2");
const closeModal1 = document.getElementById("closeModal3");
const form1 = document.getElementById("form_main_big3");
const submitButton1 = document.getElementById("form_main_submit3");
const successButton1 = document.getElementById("contact_button");
const openModalButtons1 = document.querySelectorAll(".form_cv");
let modalTransitioning1 = false;

const updateScrollLock1 = () => {
  const isLocked =
    modalMain1.classList.contains("active") ||
    modalSuccess1.classList.contains("active") ||
    modalTransitioning1;
  if (isLocked) {
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");
  } else {
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
  }
};

const closeModalFunction1 = modal => {
  if (!modal) return;
  modal.classList.remove("active");
  setTimeout(() => {
    modal.style.display = "none";
    updateScrollLock1();
  }, 350);
};

const openModal1 = modal => {
  if (!modal) return;
  modal.style.display = "flex";
  requestAnimationFrame(() => {
    modal.classList.add("active");
    updateScrollLock1();
  });
};

openModalButtons1.forEach(button => {
  button.addEventListener("click", e => {
    e.stopPropagation();
    if (window.innerWidth <= 950) {
      window.location.href = "../page/mobileFormCV.html";
    } else {
      openModal1(modalMain1);
    }
  });
});

closeModal1.addEventListener("click", e => {
  e.stopPropagation();
  e.preventDefault();
  closeModalFunction1(modalMain1);
});

modalMain1.addEventListener("click", e => {
  if (e.target === modalMain1) {
    closeModalFunction1(modalMain1);
  }
});

modalSuccess1.addEventListener("click", e => {
  if (e.target === modalSuccess1) {
    closeModalFunction1(modalSuccess1);
  }
});

submitButton1.addEventListener("click", e => {
  e.preventDefault();
  e.stopPropagation();
  modalTransitioning1 = true;
  closeModalFunction1(modalMain1);
  setTimeout(() => {
    openModal1(modalSuccess1);
    modalTransitioning1 = false;
  }, 400);
});

successButton1.addEventListener("click", e => {
  e.stopPropagation();
  closeModalFunction1(modalSuccess1);
});

function select_file() {
  const container = document.querySelector('.select_file');
  let input = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  document.body.appendChild(input);

  const resetContainer = () => {
    container.innerHTML = `<p><button>Select file,</button> or drag & drop here</p>`;
    const btn = container.querySelector('button');
    btn.addEventListener('click', e => {
      e.preventDefault();
      
      const newInput = document.createElement('input');
      newInput.type = 'file';
      newInput.style.display = 'none';
      document.body.appendChild(newInput);
      newInput.addEventListener('change', e => handleFiles(e.target.files));
      
      document.body.removeChild(input);
      input = newInput;
      
      input.click();
    });
  };

  resetContainer();

  const handleFiles = files => {
    if (!files.length) return;
    const file = files[0];
    let icon = '';
    const ext = file.name.split('.').pop().toLowerCase();
    if (["pdf"].includes(ext)) icon = "../assets/icon/pdf-icon.svg";
    else if (["doc", "docx"].includes(ext)) icon = "../assets/icon/doc-icon.svg";
    else if (["png"].includes(ext)) icon = "../assets/icon/png-icon.svg";
    else if (["jpg", "jpeg"].includes(ext)) icon = "../assets/icon/jpg-icon.svg";
    else icon = 'assets/icon/file-icon.svg';

    const objectUrl = URL.createObjectURL(file);
    
    container.innerHTML = '';
    const preview = document.createElement('div');
    preview.className = 'file-preview';
    preview.innerHTML = `
      <img src="${icon}" alt="icon" />
      <span>${file.name}</span>
      <button class="open-file">Open</button>
      <button class="remove-file">Remove</button>
    `;
    container.appendChild(preview);

    preview.querySelector('.open-file').addEventListener('click', e => {
      e.preventDefault();
      window.open(objectUrl, '_blank');
    });

    preview.querySelector('.remove-file').addEventListener('click', e => {
      e.preventDefault();
      URL.revokeObjectURL(objectUrl);
      resetContainer();
    });

    setTimeout(() => preview.classList.add('active'), 10);
  };

  container.addEventListener('dragover', e => {
    e.preventDefault();
    container.classList.add('dragover');
  });
  container.addEventListener('dragleave', e => {
    e.preventDefault();
    container.classList.remove('dragover');
  });
  container.addEventListener('drop', e => {
    e.preventDefault();
    container.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
  });
  input.addEventListener('change', e => handleFiles(e.target.files));
}

select_file();