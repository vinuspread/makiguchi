const list = document.querySelector('.text-info');
const els = list.querySelectorAll('[class^="text-"]');

els.forEach((el) => {
  const span = document.createElement('span');
  const fs = Number(getComputedStyle(el).fontSize.replace('px', '')) / 10;
  span.textContent = ` / ${fs}rem`;
  el.append(span);
});
