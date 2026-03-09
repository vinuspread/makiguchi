export function setTabActive(selector = '.tab-type1 a') {
  const currentPath = window.location.pathname.split('/').pop();

  const links = document.querySelectorAll(selector);

  links.forEach((link) => {
    const li = link.closest('li');
    if (li) li.classList.remove('active');

    const linkPath = link.getAttribute('href').split('/').pop();

    if (linkPath === currentPath) {
      if (li) li.classList.add('active');
    }
  });
}
