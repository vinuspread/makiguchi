export const NotOpenDialog = () => {
  const min = 60 * 1000;
  const hour = 60 * 60 * 1000;
  const day = 24 * 60 * 60 * 1000;
  const now = new Date().getTime();

  const check = document.querySelector('.date');
  const btn = document.querySelector('.ok');

  btn.addEventListener('click', () => {
    if (check.checked) {
      document.cookie = `date=${now}`;
      dialog.close();
      console.log(document.cookie);
    } else {
      console.log('체크해주세요');
    }
  });
  const load = document.querySelector('.btn-load-cookie');
  load.addEventListener('click', () => {
    const setTime = getCookie('date');

    if (setTime === null) {
      console.log('쿠키가 없습니다');
    } else {
      const closeDay = Number(setTime) + day;
      if (now >= closeDay) {
        console.log('이미 시간이 지났습니다.');
        dialog.show();
      } else {
        console.log('시간이 남았습니다.');
      }
    }
  });
};
