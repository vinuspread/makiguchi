import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs';
import Autoplay from 'https://cdn.jsdelivr.net/npm/swiper@12/modules/autoplay.min.mjs';
import Pagination from 'https://cdn.jsdelivr.net/npm/swiper@12/modules/pagination.min.mjs';

const setControlState = (pauseButton, playButton, isPaused) => {
  if (pauseButton) {
    pauseButton.hidden = isPaused;
    pauseButton.setAttribute('aria-pressed', isPaused ? 'false' : 'true');
  }
  if (playButton) {
    playButton.hidden = !isPaused;
    playButton.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
  }
};

export const initHeroSwiper = (selector = '.hero-swiper') => {
  const container = document.querySelector(selector);

  if (!container) return;

  const paginationEl = container.querySelector('.pagination');
  const pauseButton = container.querySelector('.pause');
  const playButton = container.querySelector('.play');

  const swiper = new Swiper(container, {
    modules: [Autoplay, Pagination],
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: paginationEl,
      type: 'bullets',
      clickable: true,
    },
  });

  if (!swiper.autoplay) return;

  setControlState(pauseButton, playButton, false);

  pauseButton?.addEventListener('click', () => {
    swiper.autoplay.pause();
    setControlState(pauseButton, playButton, true);
  });

  playButton?.addEventListener('click', () => {
    swiper.autoplay.resume();
    setControlState(pauseButton, playButton, false);
  });
};
