const popup = document.createElement('div');
popup.id = 'img-popup';
Object.assign(popup.style, {
  display: 'none',
  position: 'fixed',
  inset: '0',
  background: 'rgba(0,0,0,0.85)',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '9999',
});
document.body.appendChild(popup);

const popupImg = document.createElement('img');
Object.assign(popupImg.style, {
  maxWidth: '90%',
  maxHeight: '90%',
  borderRadius: '6px',
});
popup.appendChild(popupImg);

const modelImg = document.getElementById('model-ref-img');
modelImg.addEventListener('click', () => {
  popupImg.src = modelImg.src;
  popup.style.display = 'flex';
});

popup.addEventListener('click', () => {
  popup.style.display = 'none';
});
