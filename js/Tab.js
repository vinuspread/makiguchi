export const Tab = (id, content = true) => {
  const config = {
    tabID: id,
    className: 'active',
    tabContent: content,
  };

  const { className, tabID, tabContent } = config;

  if (tabID == null) {
    return;
  }
  if (typeof tabID != 'string') {
    return;
  }

  const tabs = document.querySelectorAll(`[data-tab=${tabID}] [data-tab-item]`);
  const tabContents = tabContent
    ? document.querySelectorAll(`[data-tab-contents=${tabID}] [data-tab-content]`)
    : [];

  if (tabs.length === 0) {
    return;
  }

  // 탭닫기
  const closeTab = () => {
    tabs.forEach((tab) => {
      tab.classList.remove(className);
    });
  };

  // 탭열기
  const openTab = (event) => {
    event.currentTarget.classList.add(className);
  };

  // 탭콘텐츠 열기
  const openContent = (index) => {
    tabContents.forEach((content, contentIndex) => {
      if (index === contentIndex) {
        content.classList.add(className);
      }
    });
  };

  // 탭콘텐츠 닫기
  const closeContent = () => {
    tabContents.forEach((content) => {
      content.classList.remove(className);
    });
  };

  // 초기셋팅
  const init = () => {
    // tabs.forEach(()=>{
    // })
    // tabs[0].classList.add(className);
    // if (tabContent && tabContents.length > 0) {
    //   tabContents[0].classList.add(className);
    // }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', (event) => {
      closeTab();
      openTab(event);

      if (tabContent && tabContents.length > 0) {
        closeContent();
        openContent(index);
      }
    });
  });

  init();
};

export const ScrollTab = (selector) => {
  const tabContainer = document.querySelector(selector);
  if (!tabContainer) return;

  tabContainer.addEventListener('click', (e) => {
    const tabItem = e.target.closest('li[data-tab-item]');
    if (!tabItem || !tabContainer.contains(tabItem)) return;

    if (window.innerWidth > 768) return;

    const containerRect = tabContainer.getBoundingClientRect();
    const tabRect = tabItem.getBoundingClientRect();

    const containerCenter = containerRect.width / 2;
    const tabCenter = tabRect.left - containerRect.left + tabRect.width / 2;

    const scrollLeft = tabContainer.scrollLeft + (tabCenter - containerCenter);

    tabContainer.scrollTo({
      left: scrollLeft,
      behavior: 'smooth',
    });

    tabContainer
      .querySelectorAll('li[data-tab-item]')
      .forEach((li) => li.classList.remove('active'));

    tabItem.classList.add('active');
  });
};
