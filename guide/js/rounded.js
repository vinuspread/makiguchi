const buildRoundList = () => {
  const ul = document.querySelector('.rounds');
  if (!ul) return;

  const probe = document.createElement('div');
  Object.assign(probe.style, {
    width: '40px',
    height: '40px',
    position: 'absolute',
    visibility: 'hidden',
    pointerEvents: 'none',
  });
  document.body.appendChild(probe);

  ul.innerHTML = '';
  const frag = document.createDocumentFragment();

  for (let i = 1; i <= 999; i++) {
    probe.className = '';
    probe.classList.add(`rounded-${i}`);

    const r = getComputedStyle(probe).borderTopLeftRadius;
    if (parseFloat(r) > 0) {
      const li = document.createElement('li');
      li.className = `rounded-${i}`;
      li.textContent = `.rounded-${i}`;
      frag.appendChild(li);
    }
  }

  probe.className = '';
  probe.classList.add('rounded-full');
  const liFull = document.createElement('li');
  liFull.className = 'rounded-full';
  liFull.textContent = '.rounded-full';
  frag.appendChild(liFull);

  ul.appendChild(frag);
  probe.remove();
};

buildRoundList();
