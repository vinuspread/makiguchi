import { header } from './header.js';

const getData = async () => {
  try {
    const response = await fetch('/guide/data/gnb.json');
    const data = await response.json();
    return data;
  } catch (error) {
    return null;
  }
};

export const GNB = async () => {
  const gnbEl = document.querySelector('#gnb');
  if (!gnbEl) return;
  const data = await getData();

  gnbEl.innerHTML = data
    .map(({ summary, items }) => {
      return /* html */ `
          <details name="gnb">
            <summary>${summary}</summary>
            <ul>
              ${items
                .map(({ text, href }) => {
                  if (href) {
                    return /*html*/ `
                      <li><a href="${href}" target="frame">${text}</a></li>
                    `;
                  }
                })
                .join('')}
            </ul>
          </details>  
      `;
    })
    .join('');

  const links = gnbEl.querySelectorAll('a');
  header(links);
};
