import { Component } from '../../types/component';

const Preview = () => (
  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
    Click Me
  </button>
);

const ReactCode = `import React from 'react';

export default function Button() {
  return (
    <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
      Click Me
    </button>
  );
}`;

const VueCode = `<template>
  <button class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
    Click Me
  </button>
</template>

<script setup>
// Component logic here
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .btn {
      padding: 0.75rem 1.5rem;
      background-color: #2563eb;
      color: white;
      font-weight: 500;
      border-radius: 0.5rem;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
    .btn:hover {
      background-color: #1d4ed8;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    }
  </style>
</head>
<body>
  <button class="btn">Click Me</button>
</body>
</html>`;

export const primaryButton: Component = {
  id: 'button-primary',
  title: 'Primary Button',
  description: 'A beautiful primary button with hover effects and smooth transitions.',
  category: 'Button',
  tags: ['button', 'primary', 'hover'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Hover Animation:</strong>

The button uses CSS transitions to create smooth color and shadow changes on hover.

<strong>How It Works:</strong>

1. <strong>Base State:</strong> The button has a blue background (\`bg-blue-600\`) with a shadow (\`shadow-lg\`).

2. <strong>Hover State:</strong> On hover, two properties animate:
   - Background color changes to darker blue (\`hover:bg-blue-700\`)
   - Shadow increases (\`hover:shadow-xl\`) for depth effect

3. <strong>Transition:</strong> The \`transition-colors duration-200\` class ensures smooth color changes over 200ms.

<strong>CSS Properties:</strong>

- \`transition-colors\`: Animates color-related properties
- \`duration-200\`: Sets transition duration to 200ms
- \`shadow-lg\` / \`shadow-xl\`: Creates layered shadow effects`,
  author: 'UI Library',
  createdAt: '2024-01-01',
};



