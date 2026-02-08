document.addEventListener('DOMContentLoaded', () => {
  const lists = document.querySelectorAll('.colors');

  if (!lists.length) return;

  lists.forEach((list) => {
    const className = list.className.replace('colors ', '').trim();
    const colorVars = [];

    const isReserved = className === 'black' || className === 'white';

    const start = isReserved ? 0 : 1;
    const end = isReserved ? 100 : 999;

    for (let i = start; i <= end; i++) {
      const varName = `--${className}${i}`;
      const value = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

      if (isReserved) {
        // black / white 는 0~100 전부 노출
        if (value || i === 0 || i === 100) {
          colorVars.push({ number: i, value: value || 'No color defined' });
        }
      } else {
        // 일반 컬러는 100단위 + 실제 존재하는 값
        if (i % 100 === 0 || value) {
          colorVars.push({ number: i, value: value || 'No color defined' });
        }
      }
    }

    colorVars.forEach(({ number, value }) => {
      const li = document.createElement('li');
      const span = document.createElement('span');

      span.style.backgroundColor =
        value !== 'No color defined' ? `var(--${className}${number})` : 'rgba(0,0,0,0.05)';

      li.append(span, `${number}`);
      span.insertAdjacentHTML('afterend', `<div>${value}</div>`);

      list.append(li);
    });
  });
});
