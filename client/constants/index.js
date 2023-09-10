// constants에서 관리하는 자원들을 index.js를 통해서만 이동하도록 관리
// - 한 곳에서 자원의 흐름을 확인할 수 있는 장점이 있다.

import icons from './icons';
import images from './images';
// import theme from './theme';
import { COLORS, SIZES, FONTS } from './theme';

export { images, icons, COLORS, SIZES, FONTS };
