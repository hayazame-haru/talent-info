(function() {
  const namespace = 'haru-hayazame';
  const key = 'visits';
  const displayId = 'visitor-count';

  function setCount(value) {
    const el = document.getElementById(displayId);
    if (el) el.innerText = value;
  }

  fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
    .then(res => {
      if (!res.ok) throw new Error('Counter not found');
      return res.json();
    })
    .then(data => setCount(data.value))
    .catch(() => {
      fetch(`https://api.countapi.xyz/create?namespace=${namespace}&key=${key}&value=0`)
        .then(res => res.json())
        .then(() => {
          fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`)
            .then(res => res.json())
            .then(data => setCount(data.value))
        });
    });
})();

