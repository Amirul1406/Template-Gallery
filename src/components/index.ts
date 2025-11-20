// Auto-import all components from their respective folders
// When you add a new component file, just import and export it here

// Buttons
import { primaryButton } from './buttons/primary-button';
import { secondaryButton } from './buttons/secondary-button';
import { redButton } from './buttons/red-button';
import { slideUpRevealButton } from './buttons/slide-up-reveal-button';

// Cards
import { basicCard } from './cards/basic-card';

// Menus
import { dropdownMenu } from './menus/dropdown-menu';
import { bottomMenu } from './menus/bottom-menu';
import { macosDock } from './menus/macos-dock';

// Sliders
import { rangeSlider } from './sliders/range-slider';

// Loading
import { spinner } from './loaders/spinner';
import { skeletonLoader } from './loaders/skeleton-loader';
import { dotsLoader } from './loaders/dots-loader';
import { fullscreenLoading } from './loaders/fullscreen-loading';

// Compass
import { interactiveCompass } from './compass/interactive-compass';

// Scroll
import { horizontalScroller } from './scroll/horizontal-scroller';

// Gallery
import { fadeGallery } from './Gallery/fade-gallery-component';

//Conditional Buttons
import { conditionalButtons } from './buttons/conditional-buttons';
export { conditionalButtons};

// Export all components as an array
// The gallery will automatically pick up new components added here
export const components = [
  primaryButton,
  secondaryButton,
  redButton,
  slideUpRevealButton,
  basicCard,
  dropdownMenu,
  bottomMenu,
  macosDock,
  rangeSlider,
  spinner,
  skeletonLoader,
  dotsLoader,
  fullscreenLoading,
  interactiveCompass,
  horizontalScroller,
  conditionalButtons,
  fadeGallery,
];

