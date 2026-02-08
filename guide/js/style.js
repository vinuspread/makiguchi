import { frame } from './frame.js';
import { navigation } from './navigation.js';
import { centered } from './centered.js';
import { Theme } from './theme.js';

(async () => {
  const nav = await navigation();
  frame();
  centered();
  Theme('.btn-theme');
})();
