import { useState } from 'react';
import { Component } from '../../types/component';

const Preview = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg hover:bg-dark-border transition-colors flex items-center gap-2"
      >
        Menu
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-lg overflow-hidden">
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">Home</a>
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">About</a>
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">Contact</a>
        </div>
      )}
    </div>
  );
};

const ReactCode = `import React, { useState } from 'react';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg hover:bg-dark-border transition-colors flex items-center gap-2"
      >
        Menu
        <svg className={\`w-4 h-4 transition-transform \${isOpen ? 'rotate-180' : ''}\`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-lg overflow-hidden">
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">Home</a>
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">About</a>
          <a href="#" className="block px-4 py-2 hover:bg-dark-border transition-colors">Contact</a>
        </div>
      )}
    </div>
  );
}`;

const VueCode = `<template>
  <div class="relative">
    <button
      @click="isOpen = !isOpen"
      class="px-4 py-2 bg-dark-surface border border-dark-border rounded-lg hover:bg-dark-border transition-colors flex items-center gap-2"
    >
      Menu
      <svg :class="['w-4 h-4 transition-transform', { 'rotate-180': isOpen }]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="isOpen" class="absolute top-full mt-2 w-48 bg-dark-surface border border-dark-border rounded-lg shadow-lg overflow-hidden">
      <a href="#" class="block px-4 py-2 hover:bg-dark-border transition-colors">Home</a>
      <a href="#" class="block px-4 py-2 hover:bg-dark-border transition-colors">About</a>
      <a href="#" class="block px-4 py-2 hover:bg-dark-border transition-colors">Contact</a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isOpen = ref(false);
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .menu-container {
      position: relative;
    }
    .menu-btn {
      padding: 0.5rem 1rem;
      background-color: #141414;
      border: 1px solid #262626;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .menu-btn:hover {
      background-color: #262626;
    }
    .menu-dropdown {
      position: absolute;
      top: 100%;
      margin-top: 0.5rem;
      width: 12rem;
      background-color: #141414;
      border: 1px solid #262626;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      display: none;
    }
    .menu-dropdown.show {
      display: block;
    }
    .menu-item {
      display: block;
      padding: 0.5rem 1rem;
      color: white;
      text-decoration: none;
    }
    .menu-item:hover {
      background-color: #262626;
    }
  </style>
</head>
<body>
  <div class="menu-container">
    <button class="menu-btn" onclick="toggleMenu()">
      Menu
      <svg class="arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div id="menu" class="menu-dropdown">
      <a href="#" class="menu-item">Home</a>
      <a href="#" class="menu-item">About</a>
      <a href="#" class="menu-item">Contact</a>
    </div>
  </div>
  
  <script>
    function toggleMenu() {
      document.getElementById('menu').classList.toggle('show');
    }
  </script>
</body>
</html>`;

export const dropdownMenu: Component = {
  id: 'menu-dropdown',
  title: 'Dropdown Menu',
  description: 'An interactive dropdown menu component with smooth animations.',
  category: 'Menu',
  tags: ['menu', 'dropdown', 'navigation'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Dropdown Toggle Mechanism:</strong>

The dropdown menu uses conditional rendering combined with CSS transforms to create a smooth reveal animation.

<strong>How It Works:</strong>

1. <strong>State Management:</strong> Uses \`useState\` to track \`isOpen\` state, controlling menu visibility.

2. <strong>Chevron Rotation:</strong> The chevron icon rotates 180 degrees when opened using:
   - Conditional class: \`\${isOpen ? 'rotate-180' : ''}\`
   - CSS transition: \`transition-transform\`
   - Transform: \`rotate(180deg)\`

3. <strong>Menu Positioning:</strong> The dropdown menu uses absolute positioning:
   - \`absolute top-full mt-2\`: Positions below the button with margin
   - \`w-48\`: Fixed width of 12rem (192px)

4. <strong>Conditional Rendering:</strong> Menu only renders when \`isOpen\` is true, creating instant show/hide effect.

5. <strong>Hover Effects:</strong> Menu items have hover states with background color transitions for better UX.

<strong>Key Features:</strong>

- Shadow effect (\`shadow-lg\`) for depth
- Overflow hidden for clean rounded corners
- Smooth transitions on all interactive elements`,
  author: 'UI Library',
  createdAt: '2024-01-03',
};



