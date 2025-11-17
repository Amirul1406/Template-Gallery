import { useState } from 'react';
import { Component } from '../../types/component';
import gearIcon from '/assets/settingpanel/cog-sharp 1.png';
import volumeOnIcon from '/assets/settingpanel/volume-high-sharp 1.png';
import volumeMuteIcon from '/assets/settingpanel/volume-mute-sharp 1.png';
import './slide-up-reveal-button.css';

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className={`slide-up-reveal ${isOpen ? 'slide-up-reveal--open' : ''}`}>
      <button
        className="slide-up-reveal__button slide-up-reveal__button--action"
        type="button"
        aria-pressed={isMuted}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={handleToggleMute}
      >
        <img
          src={isMuted ? volumeMuteIcon : volumeOnIcon}
          alt={isMuted ? 'Unmute sound' : 'Mute sound'}
        />
      </button>

      <button
        className={`slide-up-reveal__button slide-up-reveal__button--toggle${
          isOpen ? ' slide-up-reveal__button--toggle-open' : ''
        }`}
        type="button"
        aria-expanded={isOpen}
        onClick={handleTogglePanel}
      >
        <img src={gearIcon} alt={isOpen ? 'Close settings' : 'Open settings'} />
      </button>
    </div>
  );
};

const ReactCode = `import { useState } from 'react';
import gearIcon from '/assets/settingpanel/cog-sharp 1.png';
import volumeOnIcon from '/assets/settingpanel/volume-high-sharp 1.png';
import volumeMuteIcon from '/assets/settingpanel/volume-mute-sharp 1.png';
import './slide-up-reveal-button.css';

const SlideUpRevealButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleTogglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className={\`slide-up-reveal \${isOpen ? 'slide-up-reveal--open' : ''}\`}>
      <button
        className="slide-up-reveal__button slide-up-reveal__button--action"
        type="button"
        aria-pressed={isMuted}
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={handleToggleMute}
      >
        <img
          src={isMuted ? volumeMuteIcon : volumeOnIcon}
          alt={isMuted ? 'Unmute sound' : 'Mute sound'}
        />
      </button>

      <button
        className={\`slide-up-reveal__button slide-up-reveal__button--toggle\${
          isOpen ? ' slide-up-reveal__button--toggle-open' : ''
        }\`}
        type="button"
        aria-expanded={isOpen}
        onClick={handleTogglePanel}
      >
        <img src={gearIcon} alt={isOpen ? 'Close settings' : 'Open settings'} />
      </button>
    </div>
  );
};

export default SlideUpRevealButton;`;

const ReactStylesCode = `.slide-up-reveal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  z-index: 99;
}

.slide-up-reveal__button {
  width: 52px;
  height: 52px;
  border: none;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease, translate 0.3s ease;

  &:hover {
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
  }

  &:active {
    transform: scale(0.96);
  }

  img {
    width: 26px;
    height: 26px;
    display: block;
    object-fit: contain;
  }
}

.slide-up-reveal__button--action {
  opacity: 0;
  pointer-events: none;
  transform: translateY(12px);
}

.slide-up-reveal__button--toggle {
  transform: translateY(0);

  img {
    transition: transform 0.35s ease;
  }
}

.slide-up-reveal__button--toggle-open {
  img {
    transform: rotate(180deg);
  }
}

.slide-up-reveal--open .slide-up-reveal__button--action {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

@media (max-width: 1304px) {
  .slide-up-reveal {
    gap: 12px;
  }

  .slide-up-reveal__button {
    width: 48px;
    height: 48px;

    img {
      width: 24px;
      height: 24px;
    }
  }
}

@media (max-width: 800px) {
  .slide-up-reveal__button {
    width: 44px;
    height: 44px;

    img {
      width: 22px;
      height: 22px;
    }
  }
}`;

const VueCode = `<template>
  <div :class="['slide-up-reveal', { 'slide-up-reveal--open': isOpen }]">
    <button
      class="slide-up-reveal__button slide-up-reveal__button--action"
      type="button"
      :aria-pressed="isMuted"
      :aria-hidden="!isOpen"
      :tabindex="isOpen ? 0 : -1"
      @click="handleToggleMute"
    >
      <img
        :src="isMuted ? volumeMuteIcon : volumeOnIcon"
        :alt="isMuted ? 'Unmute sound' : 'Mute sound'"
      />
    </button>

    <button
      :class="[
        'slide-up-reveal__button',
        'slide-up-reveal__button--toggle',
        { 'slide-up-reveal__button--toggle-open': isOpen },
      ]"
      type="button"
      :aria-expanded="isOpen"
      @click="handleTogglePanel"
    >
      <img :src="gearIcon" :alt="isOpen ? 'Close settings' : 'Open settings'" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import gearIcon from '/assets/settingpanel/cog-sharp 1.png';
import volumeOnIcon from '/assets/settingpanel/volume-high-sharp 1.png';
import volumeMuteIcon from '/assets/settingpanel/volume-mute-sharp 1.png';
import './slide-up-reveal-button.css';

const isOpen = ref(false);
const isMuted = ref(true);

const handleTogglePanel = () => {
  isOpen.value = !isOpen.value;
};

const handleToggleMute = () => {
  isMuted.value = !isMuted.value;
};
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .slide-up-reveal {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      z-index: 99;
    }

    .slide-up-reveal__button {
      width: 52px;
      height: 52px;
      border: none;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: transform 0.2s ease, box-shadow 0.2s ease, opacity 0.3s ease, translate 0.3s ease;
    }

    .slide-up-reveal__button:hover {
      box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
    }

    .slide-up-reveal__button:active {
      transform: scale(0.96);
    }

    .slide-up-reveal__button img {
      width: 26px;
      height: 26px;
      display: block;
      object-fit: contain;
    }

    .slide-up-reveal__button--action {
      opacity: 0;
      pointer-events: none;
      transform: translateY(12px);
    }

    .slide-up-reveal__button--toggle img {
      transition: transform 0.35s ease;
    }

    .slide-up-reveal__button--toggle-open img {
      transform: rotate(180deg);
    }

    .slide-up-reveal--open .slide-up-reveal__button--action {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    @media (max-width: 1304px) {
      .slide-up-reveal {
        gap: 12px;
      }

      .slide-up-reveal__button {
        width: 48px;
        height: 48px;
      }

      .slide-up-reveal__button img {
        width: 24px;
        height: 24px;
      }
    }

    @media (max-width: 800px) {
      .slide-up-reveal__button {
        width: 44px;
        height: 44px;
      }

      .slide-up-reveal__button img {
        width: 22px;
        height: 22px;
      }
    }
  </style>
</head>
<body>
  <div id="slideUpReveal" class="slide-up-reveal">
    <button
      class="slide-up-reveal__button slide-up-reveal__button--action"
      type="button"
      aria-pressed="true"
      aria-hidden="true"
      tabindex="-1"
      onclick="toggleMute()"
    >
      <img id="volumeIcon" src="/assets/settingpanel/volume-mute-sharp 1.png" alt="Mute sound" />
    </button>

    <button
      class="slide-up-reveal__button slide-up-reveal__button--toggle"
      type="button"
      aria-expanded="false"
      onclick="togglePanel()"
    >
      <img id="gearIcon" src="/assets/settingpanel/cog-sharp 1.png" alt="Open settings" />
    </button>
  </div>

  <script>
    let isOpen = false;
    let isMuted = true;

    function togglePanel() {
      isOpen = !isOpen;
      const panel = document.getElementById('slideUpReveal');
      const actionButton = panel.querySelector('.slide-up-reveal__button--action');
      const toggleButton = panel.querySelector('.slide-up-reveal__button--toggle');
      const gearIcon = document.getElementById('gearIcon');

      if (isOpen) {
        panel.classList.add('slide-up-reveal--open');
        toggleButton.setAttribute('aria-expanded', 'true');
        actionButton.setAttribute('aria-hidden', 'false');
        actionButton.setAttribute('tabindex', '0');
        gearIcon.setAttribute('alt', 'Close settings');
      } else {
        panel.classList.remove('slide-up-reveal--open');
        toggleButton.setAttribute('aria-expanded', 'false');
        actionButton.setAttribute('aria-hidden', 'true');
        actionButton.setAttribute('tabindex', '-1');
        gearIcon.setAttribute('alt', 'Open settings');
      }
    }

    function toggleMute() {
      isMuted = !isMuted;
      const volumeIcon = document.getElementById('volumeIcon');
      const actionButton = document.querySelector('.slide-up-reveal__button--action');
      
      if (isMuted) {
        volumeIcon.src = '/assets/settingpanel/volume-mute-sharp 1.png';
        volumeIcon.alt = 'Unmute sound';
        actionButton.setAttribute('aria-pressed', 'true');
      } else {
        volumeIcon.src = '/assets/settingpanel/volume-high-sharp 1.png';
        volumeIcon.alt = 'Mute sound';
        actionButton.setAttribute('aria-pressed', 'false');
      }
    }
  </script>
</body>
</html>`;

export const slideUpRevealButton: Component = {
  id: 'button-slide-up-reveal',
  title: 'Slide Up Reveal Button',
  description: 'An expandable button panel with smooth slide-up reveal animation. Action buttons fade in and slide up when the toggle is activated. Perfect for settings panels and expandable action menus.',
  category: 'Button',
  tags: ['button', 'animation', 'reveal', 'slide-up', 'expandable', 'settings'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'react', code: ReactStylesCode, label: 'React Styles' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  images: [
    {
      path: '/assets/settingpanel/cog-sharp 1.png',
      name: 'cog-sharp 1.png',
      description: 'Gear icon for toggle button',
    },
    {
      path: '/assets/settingpanel/volume-high-sharp 1.png',
      name: 'volume-high-sharp 1.png',
      description: 'Volume on icon',
    },
    {
      path: '/assets/settingpanel/volume-mute-sharp 1.png',
      name: 'volume-mute-sharp 1.png',
      description: 'Volume mute icon',
    },
  ],
  explanation: `<strong>Animation Mechanism:</strong>

The slide-up reveal animation uses CSS transitions combined with state management to create a smooth expandable panel effect.

<strong>How It Works:</strong>

1. <strong>Initial State:</strong> Action buttons start with \`opacity: 0\`, \`pointer-events: none\`, and \`transform: translateY(12px)\` to hide them below the toggle button.

2. <strong>Toggle Interaction:</strong> When the gear button is clicked, the component's state changes, adding the \`slide-up-reveal--open\` class to the container.

3. <strong>Reveal Animation:</strong> When opened, action buttons transition to:
   - \`opacity: 1\` (fade in)
   - \`transform: translateY(0)\` (slide up)
   - \`pointer-events: auto\` (become interactive)

4. <strong>Gear Rotation:</strong> The gear icon rotates 180 degrees using \`transform: rotate(180deg)\` with a 0.35s ease transition.

5. <strong>Transition Timing:</strong> All animations use CSS transitions:
   - Opacity: 0.3s ease
   - Transform: 0.3s ease
   - Icon rotation: 0.35s ease

<strong>Key CSS Properties:</strong>

- \`transition\`: Controls animation smoothness
- \`transform: translateY()\`: Creates the slide effect
- \`opacity\`: Handles fade in/out
- \`pointer-events\`: Controls interactivity during animation

<strong>State Management:</strong>

The component uses React state (\`useState\`) to track:
- \`isOpen\`: Controls panel visibility
- \`isMuted\`: Tracks mute/unmute state

When \`isOpen\` changes, CSS classes are conditionally applied, triggering the animations.`,
  author: 'UI Library',
  createdAt: '2024-01-08',
};

