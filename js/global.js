import { ScrollTab, Tab } from './Tab.js';
import { IncludeHTML } from './IncludeHTML.js';
import { NotOpenDialog } from './NotOpenDialog.js';
import { Dialog } from './Dialog.js';
import { setMenuActive } from './MenuActive.js';
import { setTabActive } from './TabActive.js';

Tab('tab', false);
Tab('tab2');
IncludeHTML('../pages/include/header.html', '.header').then(() => {
  setMenuActive('.gnb a');
});
IncludeHTML('../pages/include/footer.html', '.footer');
ScrollTab('.tab-type2');
setTabActive('.tab-type1 a');

// NotOpenDialog();

// Dialog('popup', {
//   modal: true,
//   closeOnBackdrop: true,
// });
