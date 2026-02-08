export const copy = async () => {
  const copyItems = document.querySelectorAll('.copy');

  copyItems.forEach((item) => {
    const btn = document.createElement('button');
    btn.innerText = '복사';
    btn.classList.add('btn-copy');
    item.prepend(btn);
  });

  const buttons = document.querySelectorAll('.btn-copy');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      let content = '';
      let sibling = button.nextElementSibling;

      while (sibling) {
        content += sibling.outerHTML + '\n'; // 모든 다음 형제 요소 HTML 포함
        sibling = sibling.nextElementSibling;
      }

      if (!content.trim()) {
        console.log('복사할 대상이 없습니다.');
        return;
      }

      navigator.clipboard
        .writeText(content)
        .then(() => {
          button.innerText = '복사됨!';
          button.classList.add('active');

          setTimeout(() => {
            button.classList.remove('active');
            button.innerText = '복사';
          }, 1000);
        })
        .catch((err) => console.error('복사 실패:', err));
    });
  });
};

const css = () => {
  const head = document.querySelector('head');
  const style = document.createElement('style');
  const css = /* css */ `
    body {
      padding:2rem;
    }
    .copy-group {
      display:grid;
      grid-template-columns:repeat(auto-fit, minmax(20rem, 1fr));
      gap:1rem;
      margin-block:2rem 3rem;
      .copy {
        margin:0;
      }
    }
    .copy {
      position:relative;
      border:2px dashed gray;
      padding:1rem;
      margin-block:2rem 3rem;
      min-height:1rem;
      .btn-copy {
        position:absolute;
        right:-2px;
        top:-2px;
        z-index:100;
        padding:0.7rem 1rem;
        background:light-dark(#000, #7c7c7c);
        color:light-dark(#fff, #fff);
        font-size:1.4rem;
      }
    }
    .variable {
      font-size:1.4rem;
      summary {
        &::before{
          content:'[변수가이드]';
          margin-right:0.5rem;
          background:light-dark(#f1effd, #7c7c7c);
          color:light-dark(#6a5acd, #fff);
          padding:0.2rem 0.5rem;
          border-radius:0.3rem;
          font-size:1.2rem;
        }
      }
      .list {
        display:grid;
        gap:0.8rem;
        padding-block:2rem 1rem;
        > div {
          color:light-dark(#000, #7c7c7c);
          strong {
            background:light-dark(rgba(255,150,0,0.1), #7c7c7c);
            border-radius:0.3rem;
            padding:0.3rem;
            font-weight:normal;
            font-size:1.2rem;
            line-height:1;
            &::after {
              content:' : ';
            }
          }
        }
      }
    }
  `;
  style.textContent = css;
  if (!head.querySelector('style')) {
    head.append(style);
  }
};
copy();
css();
