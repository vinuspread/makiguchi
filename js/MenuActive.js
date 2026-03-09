export function setMenuActive(selector = '.gnb a') {
  const links = document.querySelectorAll(selector);

  links.forEach((link) => {
    link.parentElement.classList.remove('active');
  });

  const filename = window.location.pathname.split('/').pop();

  const match = filename.match(/sub(\d+)_/);

  if (!match) return;

  const index = Number(match[1]) - 1;
  if (links[index]) {
    links[index].parentElement.classList.add('active');
  }
}
