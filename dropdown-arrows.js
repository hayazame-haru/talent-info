document.querySelectorAll('.trigger').forEach(trigger => {
  const nextDropdown = trigger.nextElementSibling;
  if (!nextDropdown || !nextDropdown.classList.contains('dropdown')) return;

  trigger.addEventListener('click', () => {
    setTimeout(() => {
      const text = trigger.textContent.trim();
      const rest = text.slice(1); 

      if (nextDropdown.classList.contains('active')) {
        trigger.textContent = '▽' + rest; 
      } else {
        trigger.textContent = '▷' + rest; 
      }
    }, 0);
  });
});
