const SCROLL_ANIMATE_SELECTOR = '.scroll-animate, .fade-in-left, .fade-in-right, .fade-in-up';

const parseStaggerValue = (value) => {
  if (!value) {
    return null;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }
  if (trimmed.endsWith('ms')) {
    const parsed = Number.parseFloat(trimmed.replace('ms', ''));
    return Number.isNaN(parsed) ? null : parsed;
  }
  if (trimmed.endsWith('s')) {
    const parsed = Number.parseFloat(trimmed.replace('s', ''));
    return Number.isNaN(parsed) ? null : parsed * 1000;
  }
  const numeric = Number.parseFloat(trimmed);
  return Number.isNaN(numeric) ? null : numeric;
};

const getStaggerGroup = (target) => {
  let group = target.closest('[data-stagger]');
  if (group === target) {
    group = target.parentElement?.closest('[data-stagger]') ?? null;
  }
  return group;
};

const getStaggerDelay = (target) => {
  const group = getStaggerGroup(target);
  if (!group) {
    return 0;
  }

  const groupDelay = parseStaggerValue(group.dataset.stagger);
  if (groupDelay === null) {
    return 0;
  }

  const groupTargets = Array.from(group.querySelectorAll(SCROLL_ANIMATE_SELECTOR)).filter(
    (element) => getStaggerGroup(element) === group,
  );
  const index = groupTargets.indexOf(target);
  if (index < 0) {
    return 0;
  }

  return Math.max(0, groupDelay * index);
};

let scrollObserver = null;

const activateScrollAnimation = (target) => {
  if (target.classList.contains('is-visible')) {
    return;
  }
  const delay = getStaggerDelay(target);
  if (delay > 0) {
    target.style.animationDelay = `${delay}ms`;
  } else {
    target.style.removeProperty('animation-delay');
  }
  target.classList.add('is-visible');
};

const getScrollObserver = () => {
  if (scrollObserver) {
    return scrollObserver;
  }
  scrollObserver = new IntersectionObserver(
    (entries, io) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          continue;
        }
        activateScrollAnimation(entry.target);
        io.unobserve(entry.target);
      }
    },
    {
      threshold: 0,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  return scrollObserver;
};

const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) {
    return false;
  }
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.bottom >= 0 &&
    rect.right >= 0 &&
    rect.top <= viewportHeight * 0.9 &&
    rect.left <= viewportWidth
  );
};

export const initScrollAnimations = () => {
  const targets = Array.from(document.querySelectorAll(SCROLL_ANIMATE_SELECTOR));
  if (targets.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    for (const target of targets) {
      activateScrollAnimation(target);
    }
    return;
  }

  const observer = getScrollObserver();

  for (const target of targets) {
    observer.observe(target);
  }

  refreshScrollAnimations();
};

export const refreshScrollAnimations = () => {
  const targets = Array.from(document.querySelectorAll(SCROLL_ANIMATE_SELECTOR)).filter(
    (target) => !target.classList.contains('is-visible'),
  );
  if (targets.length === 0) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    for (const target of targets) {
      activateScrollAnimation(target);
    }
    return;
  }

  const observer = getScrollObserver();

  for (const target of targets) {
    if (isElementInViewport(target)) {
      activateScrollAnimation(target);
      observer.unobserve(target);
      continue;
    }
    observer.observe(target);
  }
};
