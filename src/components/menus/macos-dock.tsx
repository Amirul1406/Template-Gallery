import { useState } from 'react';
import { Component } from '../../types/component';
import './macos-dock.css';

const Preview = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems = [
    { id: 'finder', label: 'Finder', icon: '📁' },
    { id: 'safari', label: 'Safari', icon: '🌐' },
    { id: 'mail', label: 'Mail', icon: '✉️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const calculateScale = (index: number, hoveredIndex: number | null): number => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return 1.5; // Hovered icon: 100% scale (1.5x)
    if (distance === 1) return 1.25; // Adjacent icons: ~50% of hovered scale
    if (distance === 2) return 1.1;  // Two away: smaller scale
    if (distance === 3) return 1.05; // Three away: even smaller
    return 1; // Further away: no scale
  };

  const calculateTranslateY = (index: number, hoveredIndex: number | null): number => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return -8; // Hovered icon: full lift
    if (distance === 1) return -4; // Adjacent icons: half lift
    if (distance === 2) return -2; // Two away: small lift
    return 0; // Further away: no lift
  };

  return (
    <div className="macos-dock-preview-wrapper">
      <div className="macos-dock">
        {dockItems.map((item, index) => {
          const scale = calculateScale(index, hoveredIndex);
          const translateY = calculateTranslateY(index, hoveredIndex);
          const isActive = activeIcon === item.id;
          
          return (
            <div
              key={item.id}
              className={`macos-dock__item ${isActive ? 'macos-dock__item--active' : ''}`}
              style={{
                transform: `scale(${scale}) translateY(${translateY}px)`,
              }}
              onMouseEnter={() => {
                setActiveIcon(item.id);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                setActiveIcon(null);
                setHoveredIndex(null);
              }}
              onClick={() => setActiveIcon(item.id)}
              title={item.label}
            >
              <div className="macos-dock__icon">{item.icon}</div>
              {isActive && (
                <div className="macos-dock__tooltip">{item.label}</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ReactCode = `import { useState } from 'react';
import './macos-dock.css';

const MacOSDock = () => {
  const [activeIcon, setActiveIcon] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const dockItems = [
    { id: 'finder', label: 'Finder', icon: '📁' },
    { id: 'safari', label: 'Safari', icon: '🌐' },
    { id: 'mail', label: 'Mail', icon: '✉️' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'photos', label: 'Photos', icon: '📷' },
    { id: 'music', label: 'Music', icon: '🎵' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const calculateScale = (index: number, hoveredIndex: number | null): number => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return 1.5; // Hovered icon: 100% scale (1.5x)
    if (distance === 1) return 1.25; // Adjacent icons: ~50% of hovered scale
    if (distance === 2) return 1.1;  // Two away: smaller scale
    if (distance === 3) return 1.05; // Three away: even smaller
    return 1; // Further away: no scale
  };

  const calculateTranslateY = (index: number, hoveredIndex: number | null): number => {
    if (hoveredIndex === null) return 0;
    const distance = Math.abs(index - hoveredIndex);
    
    if (distance === 0) return -8; // Hovered icon: full lift
    if (distance === 1) return -4; // Adjacent icons: half lift
    if (distance === 2) return -2; // Two away: small lift
    return 0; // Further away: no lift
  };

  return (
    <div className="macos-dock">
      {dockItems.map((item, index) => {
        const scale = calculateScale(index, hoveredIndex);
        const translateY = calculateTranslateY(index, hoveredIndex);
        const isActive = activeIcon === item.id;
        
        return (
          <div
            key={item.id}
            className={\`macos-dock__item \${isActive ? 'macos-dock__item--active' : ''}\`}
            style={{
              transform: \`scale(\${scale}) translateY(\${translateY}px)\`,
            }}
            onMouseEnter={() => {
              setActiveIcon(item.id);
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              setActiveIcon(null);
              setHoveredIndex(null);
            }}
            onClick={() => setActiveIcon(item.id)}
            title={item.label}
          >
            <div className="macos-dock__icon">{item.icon}</div>
            {isActive && (
              <div className="macos-dock__tooltip">{item.label}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MacOSDock;`;

const ReactStylesCode = `
.macos-dock {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
}

.macos-dock__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center bottom;
}

.macos-dock__item:hover,
.macos-dock__item--active {
  transform: scale(1.5) translateY(-8px);
}

.macos-dock__item:hover ~ .macos-dock__item,
.macos-dock__item--active ~ .macos-dock__item {
  transform: scale(1.1) translateY(-4px);
}

.macos-dock__icon {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  transition: filter 0.2s ease;
}

.macos-dock__item:hover .macos-dock__icon,
.macos-dock__item--active .macos-dock__icon {
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
}

.macos-dock__tooltip {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  animation: tooltipFadeIn 0.2s ease-out;
}

.macos-dock__tooltip::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(0, 0, 0, 0.8);
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (max-width: 768px) {
  .macos-dock {
    padding: 10px 16px;
    gap: 6px;
  }

  .macos-dock__item {
    width: 48px;
    height: 48px;
  }

  .macos-dock__icon {
    font-size: 24px;
  }
}`;

const VueCode = `<template>
  <div class="macos-dock">
    <div
      v-for="(item, index) in dockItems"
      :key="item.id"
      :class="[
        'macos-dock__item',
        { 'macos-dock__item--active': activeIcon === item.id }
      ]"
      :style="{
        transform: \`scale(\${calculateScale(index, hoveredIndex)}) translateY(\${calculateTranslateY(index, hoveredIndex)}px)\`
      }"
      @mouseenter="handleMouseEnter(item.id, index)"
      @mouseleave="handleMouseLeave"
      @click="activeIcon = item.id"
      :title="item.label"
    >
      <div class="macos-dock__icon">{{ item.icon }}</div>
      <div v-if="activeIcon === item.id" class="macos-dock__tooltip">
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import './macos-dock.css';

const activeIcon = ref(null);
const hoveredIndex = ref(null);

const dockItems = [
  { id: 'finder', label: 'Finder', icon: '📁' },
  { id: 'safari', label: 'Safari', icon: '🌐' },
  { id: 'mail', label: 'Mail', icon: '✉️' },
  { id: 'messages', label: 'Messages', icon: '💬' },
  { id: 'photos', label: 'Photos', icon: '📷' },
  { id: 'music', label: 'Music', icon: '🎵' },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const calculateScale = (index, hoveredIndex) => {
  if (hoveredIndex === null) return 1;
  const distance = Math.abs(index - hoveredIndex);
  
  if (distance === 0) return 1.5;
  if (distance === 1) return 1.25;
  if (distance === 2) return 1.1;
  if (distance === 3) return 1.05;
  return 1;
};

const calculateTranslateY = (index, hoveredIndex) => {
  if (hoveredIndex === null) return 0;
  const distance = Math.abs(index - hoveredIndex);
  
  if (distance === 0) return -8;
  if (distance === 1) return -4;
  if (distance === 2) return -2;
  return 0;
};

const handleMouseEnter = (id, index) => {
  activeIcon.value = id;
  hoveredIndex.value = index;
};

const handleMouseLeave = () => {
  activeIcon.value = null;
  hoveredIndex.value = null;
};
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .macos-dock-preview-wrapper {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 200px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 20px;
    }

    .macos-dock {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 8px;
      padding: 12px 20px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(20px) saturate(180%);
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    }

    .macos-dock__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      cursor: pointer;
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
      transform-origin: center bottom;
    }

    .macos-dock__icon {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
      transition: filter 0.2s ease;
    }

    .macos-dock__item:hover .macos-dock__icon,
    .macos-dock__item--active .macos-dock__icon {
      filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
    }

    .macos-dock__tooltip {
      position: absolute;
      bottom: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      white-space: nowrap;
      pointer-events: none;
      animation: tooltipFadeIn 0.2s ease-out;
    }

    .macos-dock__tooltip::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 4px solid transparent;
      border-right: 4px solid transparent;
      border-top: 4px solid rgba(0, 0, 0, 0.8);
    }

    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(4px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  </style>
</head>
<body>
  <div class="macos-dock-preview-wrapper">
    <div class="macos-dock">
      <div class="macos-dock__item" title="Finder">
        <div class="macos-dock__icon">📁</div>
      </div>
      <div class="macos-dock__item" title="Safari">
        <div class="macos-dock__icon">🌐</div>
      </div>
      <div class="macos-dock__item" title="Mail">
        <div class="macos-dock__icon">✉️</div>
      </div>
      <div class="macos-dock__item" title="Messages">
        <div class="macos-dock__icon">💬</div>
      </div>
      <div class="macos-dock__item" title="Photos">
        <div class="macos-dock__icon">📷</div>
      </div>
      <div class="macos-dock__item" title="Music">
        <div class="macos-dock__icon">🎵</div>
      </div>
      <div class="macos-dock__item" title="Settings">
        <div class="macos-dock__icon">⚙️</div>
      </div>
    </div>
  </div>

  <script>
    const dockItems = Array.from(document.querySelectorAll('.macos-dock__item'));
    let hoveredIndex = null;

    const calculateScale = (index, hoveredIndex) => {
      if (hoveredIndex === null) return 1;
      const distance = Math.abs(index - hoveredIndex);
      
      if (distance === 0) return 1.5;
      if (distance === 1) return 1.25;
      if (distance === 2) return 1.1;
      if (distance === 3) return 1.05;
      return 1;
    };

    const calculateTranslateY = (index, hoveredIndex) => {
      if (hoveredIndex === null) return 0;
      const distance = Math.abs(index - hoveredIndex);
      
      if (distance === 0) return -8;
      if (distance === 1) return -4;
      if (distance === 2) return -2;
      return 0;
    };

    const updateTransforms = () => {
      dockItems.forEach((item, index) => {
        const scale = calculateScale(index, hoveredIndex);
        const translateY = calculateTranslateY(index, hoveredIndex);
        item.style.transform = \`scale(\${scale}) translateY(\${translateY}px)\`;
      });
    };

    dockItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        hoveredIndex = index;
        item.classList.add('macos-dock__item--active');
        updateTransforms();
      });

      item.addEventListener('mouseleave', () => {
        hoveredIndex = null;
        item.classList.remove('macos-dock__item--active');
        updateTransforms();
      });

      item.addEventListener('click', () => {
        dockItems.forEach(i => i.classList.remove('macos-dock__item--active'));
        item.classList.add('macos-dock__item--active');
      });
    });
  </script>
</body>
</html>`;

export const macosDock: Component = {
  id: 'menu-macos-dock',
  title: 'macOS Dock',
  description: 'A beautiful macOS-style dock menu with glassmorphic design, icon scaling animations, and tooltips. Perfect for navigation interfaces.',
  category: 'Menu',
  tags: ['menu', 'dock', 'macos', 'glassmorphism', 'animation'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'react', code: ReactStylesCode, label: 'React Styles' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Glassmorphic Design:</strong>

The dock uses a glassmorphic design with a translucent background and backdrop blur to create depth and visual appeal.

<strong>Wave Animation System:</strong>

The dock implements a sophisticated wave animation that mimics macOS behavior:

1. <strong>Distance-Based Scaling:</strong> Each icon's scale is calculated based on its distance from the hovered icon:
   - Hovered icon (distance 0): Scales to 1.5x (100% of max scale)
   - Adjacent icons (distance 1): Scale to 1.25x (~50% of hovered scale)
   - Two away (distance 2): Scale to 1.1x
   - Three away (distance 3): Scale to 1.05x
   - Further away: No scaling (1x)

2. <strong>Lift Animation:</strong> Icons also translate upward based on distance:
   - Hovered icon: -8px (full lift)
   - Adjacent icons: -4px (half lift)
   - Two away: -2px (small lift)
   - Further: No lift

3. <strong>Smooth Transitions:</strong> Uses \`transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)\` for smooth, bouncy animations.

4. <strong>Transform Origin:</strong> The \`transform-origin: center bottom\` ensures icons scale from their bottom center, creating the classic dock "bounce" effect.

5. <strong>Dynamic Calculation:</strong> The \`calculateScale()\` and \`calculateTranslateY()\` functions dynamically compute transform values based on the hovered icon's index, creating a smooth wave effect that propagates outward.

<strong>Tooltip Animation:</strong>

Tooltips appear above icons on hover with a fade-in and slide-up animation:
- Starts with \`opacity: 0\` and \`translateY(4px)\`
- Animates to \`opacity: 1\` and \`translateY(0)\`
- Duration: 0.2s with ease-out timing

<strong>Backdrop Filter:</strong>

The glassmorphic effect is achieved using:
- \`background: rgba(255, 255, 255, 0.1)\`: Semi-transparent white background
- \`backdrop-filter: blur(20px) saturate(180%)\`: Blurs content behind and increases saturation
- \`border: 1px solid rgba(255, 255, 255, 0.2)\`: Subtle border for definition

<strong>State Management:</strong>

The component uses React state (\`useState\`) to track the active icon:
- \`activeIcon\`: Stores the ID of the currently hovered/clicked icon
- Updates on \`onMouseEnter\`, \`onMouseLeave\`, and \`onClick\` events

<strong>Responsive Design:</strong>

On smaller screens (≤768px):
- Reduced padding and gap
- Smaller icon size (48px instead of 64px)
- Smaller font size (24px instead of 32px)`,
  author: 'UI Library',
  createdAt: '2024-01-08',
};

