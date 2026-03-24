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

const decorateMessageLines = (container) => {
  const messages = container.querySelectorAll('.hero-slide-content .message');

  messages.forEach((message) => {
    const lines = message.innerHTML
      .split(/<br\s*\/?\s*>/i)
      .map((line) => line.replace(/\s+/g, ' ').trim())
      .filter(Boolean);

    message.innerHTML = lines
      .map((line, index) => `<span class="message-line" style="--line-index:${index};">${line}</span>`)
      .join('');
  });
};

export const initHeroSwiper = (selector = '.hero-swiper') => {
  const container = document.querySelector(selector);

  if (!container) return;

  decorateMessageLines(container);

  const paginationEl = container.querySelector('.pagination');
  const pauseButton = container.querySelector('.pause');
  const playButton = container.querySelector('.play');
  const slideContents = Array.from(container.querySelectorAll('.hero-slide-content'));
  const videos = Array.from(container.querySelectorAll('video'));

  const swiper = new Swiper(container, {
    modules: [Autoplay, Pagination],
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true,
    },
    pagination: {
      el: paginationEl,
      type: 'bullets',
      clickable: true,
    },
  });

  const updateActiveSlide = () => {
    const activeSlide = container.querySelector('.swiper-slide-active');
    slideContents.forEach((content) => {
      content.classList.remove('is-active');
    });
    activeSlide?.querySelector('.hero-slide-content')?.classList.add('is-active');

    videos.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });

    const activeVideo = activeSlide?.querySelector('video');
    if (activeVideo) {
      const playPromise = activeVideo.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch((error) => {
          console.warn('Video play was interrupted.', error);
        });
      }
    }
  };

  if (!swiper.autoplay) return;

  setControlState(pauseButton, playButton, false);

  updateActiveSlide();

  swiper.on('slideChangeTransitionStart', () => {
    updateActiveSlide();
  });

  pauseButton?.addEventListener('click', () => {
    swiper.autoplay.pause();
    setControlState(pauseButton, playButton, true);
  });

  playButton?.addEventListener('click', () => {
    swiper.autoplay.resume();
    setControlState(pauseButton, playButton, false);
  });
};
