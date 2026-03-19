export function setHeaderFixed(selector = 'header', scrollY = 100) {
  const header = document.querySelector(selector);

  if (!header) return;

  const toggleClass = () => {
    const currentY = window.scrollY;

    if (currentY > scrollY) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  };

  toggleClass();
  window.addEventListener('scroll', toggleClass, { passive: true });
}
