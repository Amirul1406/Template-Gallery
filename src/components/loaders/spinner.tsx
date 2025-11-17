import React from 'react';
import { Component } from '../../types/component';

const Preview = () => (
  <div className="flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ReactCode = `import React from 'react';

export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}`;

const VueCode = `<template>
  <div class="flex items-center justify-center">
    <div class="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
</template>

<script setup>
// Component logic here
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .spinner-container {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spinner {
      width: 3rem;
      height: 3rem;
      border: 4px solid #2563eb;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div class="spinner-container">
    <div class="spinner"></div>
  </div>
</body>
</html>`;

export const spinner: Component = {
  id: 'loader-spinner',
  title: 'Spinner',
  description: 'A classic spinning loader indicator perfect for loading states.',
  category: 'Loading',
  tags: ['loading', 'spinner', 'indicator'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Spinning Animation:</strong>

The spinner uses CSS keyframe animations to create a continuous rotation effect.

<strong>How It Works:</strong>

1. <strong>Circle Structure:</strong> A circular div with a thick border (\`border-4\`) where the top border is transparent (\`border-t-transparent\`), creating a partial circle appearance.

2. <strong>Animation:</strong> Uses Tailwind's \`animate-spin\` utility which applies:
   - \`@keyframes spin\`: Rotates from 0deg to 360deg
   - \`animation: spin 1s linear infinite\`: Continuous rotation

3. <strong>Visual Effect:</strong> The transparent top border creates the illusion of a spinning arc, giving visual feedback that something is loading.

<strong>CSS Keyframes:</strong>

\`\`\`css
@keyframes spin {
  to { transform: rotate(360deg); }
}
\`\`\`

<strong>Properties:</strong>

- \`linear\`: Constant speed rotation
- \`infinite\`: Continuous loop
- \`1s\`: One full rotation per second`,
  author: 'UI Library',
  createdAt: '2024-01-05',
};



