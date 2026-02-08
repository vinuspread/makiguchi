const mobileSize = 1280;
const frame = document.querySelector('iframe');
const button = document.querySelector('.btn-mobile');
const linkTag = document.querySelector('.blank');

const initNewTab = (links) => {
  if (!linkTag || !button) return;

  const initHref = links[0].getAttribute('href');
  const frameSrc = sessionStorage.getItem('src');
  const responsiveText = sessionStorage.getItem('responsive') || '웹 보기';

  button.textContent = responsiveText;

  frame.removeAttribute('style');
  viewSize(responsiveText);
  linkTag.setAttribute('href', frameSrc || initHref);
};

const newTab = (link) => {
  if (!linkTag) return;
  linkTag.setAttribute('href', link.getAttribute('href'));
};

const viewSize = (text) => {
  if (!frame) return;

  switch (text) {
    case '모바일 보기':
      frame.style.width = '360px';
      button.textContent = '웹 보기';
      break;
    case '타블렛 보기':
      frame.style.width = '768px';
      button.textContent = '모바일 보기';
      break;
    case '웹 보기':
      frame.removeAttribute('style');
      button.textContent = '타블렛 보기';
      break;
  }
};

const viewMobile = () => {
  if (!button) return;

  button.addEventListener('click', () => {
    sessionStorage.setItem('responsive', button.textContent);
    viewSize(button.textContent);
  });
};

const resizeButton = () => {
  if (!button) return;
  button.style.display = window.innerWidth < mobileSize ? 'none' : 'flex';
};

window.addEventListener('resize', resizeButton);
window.addEventListener('load', resizeButton);

export const header = (links) => {
  initNewTab(links);

  links.forEach((link) => {
    link.addEventListener('click', () => {
      newTab(link);
    });
  });

  viewMobile();
};
