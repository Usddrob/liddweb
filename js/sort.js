document.addEventListener("DOMContentLoaded", () => {
  const btnSort = document.getElementById('btn-sort'),
        popupSort = document.getElementById('popup-sort'),
        closeBtn = popupSort.querySelector('.close'),
        popupContent = popupSort.querySelector('.popup_content');
  
  const openPopup = () => {
    popupSort.style.visibility = 'visible';
    setTimeout(() => popupSort.style.opacity = '1', 10);
  };
  
  const closePopup = () => {
    popupSort.style.opacity = '0';
    setTimeout(() => popupSort.style.visibility = 'hidden', 300);
  };
  
  btnSort.addEventListener('click', e => { e.stopPropagation(); openPopup(); });
  closeBtn.addEventListener('click', e => { e.stopPropagation(); closePopup(); });
  
  
});
