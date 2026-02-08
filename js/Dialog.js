export const Dialog = (id, options = {}) => {
  const normalized = typeof options === 'boolean' ? { modal: options } : options;

  const config = {
    selector: id,
    modal: false,
    closeOnBackdrop: false,
    ...normalized,
  };

  const { selector, modal, closeOnBackdrop } = config;

  const btnOpen = document.querySelector(`[data-dialog-open="${selector}"]`);
  const btnClose = document.querySelector(`[data-dialog-close="${selector}"]`);
  const dialog = document.querySelector(`[data-dialog="${selector}"]`);

  if (!btnOpen || !btnClose || !dialog) return;

  // 열기/닫기
  const showDialog = () => (modal ? dialog.showModal() : dialog.show());
  const hideDialog = () => dialog.close();

  btnOpen.addEventListener('click', showDialog);
  btnClose.addEventListener('click', hideDialog);

  // 백드랍 클릭 시 닫기 (옵션)
  if (closeOnBackdrop) {
    let isBackdropDown = false;

    dialog.addEventListener('pointerdown', (e) => {
      isBackdropDown = e.target === dialog;
    });

    dialog.addEventListener('pointerup', (e) => {
      if (isBackdropDown && e.target === dialog) {
        dialog.close();
      }
      isBackdropDown = false;
    });
  }

  return { show: showDialog, hide: hideDialog };
};

export const Popover = (callback) => {
  const popovers = document.querySelectorAll('[popover]');
  if (popovers.length == 0) return;

  popovers.forEach((popover) => {
    const btnClose = popover.querySelector('.btn-dialog-close');
    const popoverID = popover.getAttribute('id');

    if (!btnClose) return;

    btnClose.addEventListener('click', () => {
      if (callback) callback(popoverID);
    });
  });
};
