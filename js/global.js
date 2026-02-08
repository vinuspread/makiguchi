import { ScrollTab, Tab } from './Tab.js';
import { IncludeHTML } from './IncludeHTML.js';
import { NotOpenDialog } from './NotOpenDialog.js';
import { Dialog } from './Dialog.js';

Tab('tab', false);
Tab('tab2');
IncludeHTML('../pages/include/header.html', '.header');
IncludeHTML('../pages/include/footer.html', '.footer');
ScrollTab('.tab-type2');
// NotOpenDialog();

// Dialog('popup', {
//   modal: true,
//   closeOnBackdrop: true,
// });
