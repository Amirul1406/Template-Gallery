import React from 'react';
import { Component } from '../../types/component';

const Preview = () => (
  <div className="w-full max-w-md space-y-4">
    <div className="h-4 bg-dark-border rounded animate-pulse"></div>
    <div className="h-4 bg-dark-border rounded animate-pulse w-5/6"></div>
    <div className="h-4 bg-dark-border rounded animate-pulse w-4/6"></div>
    <div className="h-32 bg-dark-border rounded animate-pulse mt-4"></div>
  </div>
);

const ReactCode = `import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div className="h-4 bg-dark-border rounded animate-pulse"></div>
      <div className="h-4 bg-dark-border rounded animate-pulse w-5/6"></div>
      <div className="h-4 bg-dark-border rounded animate-pulse w-4/6"></div>
      <div className="h-32 bg-dark-border rounded animate-pulse mt-4"></div>
    </div>
  );
}`;

const VueCode = `<template>
  <div class="w-full max-w-md space-y-4">
    <div class="h-4 bg-dark-border rounded animate-pulse"></div>
    <div class="h-4 bg-dark-border rounded animate-pulse w-5/6"></div>
    <div class="h-4 bg-dark-border rounded animate-pulse w-4/6"></div>
    <div class="h-32 bg-dark-border rounded animate-pulse mt-4"></div>
  </div>
</template>

<script setup>
// Component logic here
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .skeleton-container {
      width: 100%;
      max-width: 28rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .skeleton-line {
      height: 1rem;
      background-color: #262626;
      border-radius: 0.25rem;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .skeleton-line.w-5\/6 {
      width: 83.333333%;
    }
    .skeleton-line.w-4\/6 {
      width: 66.666667%;
    }
    .skeleton-box {
      height: 8rem;
      background-color: #262626;
      border-radius: 0.25rem;
      margin-top: 1rem;
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
  </style>
</head>
<body>
  <div class="skeleton-container">
    <div class="skeleton-line"></div>
    <div class="skeleton-line w-5/6"></div>
    <div class="skeleton-line w-4/6"></div>
    <div class="skeleton-box"></div>
  </div>
</body>
</html>`;

export const skeletonLoader: Component = {
  id: 'loader-skeleton',
  title: 'Skeleton Loader',
  description: 'A skeleton loading placeholder that mimics content structure while loading.',
  category: 'Loading',
  tags: ['loading', 'skeleton', 'placeholder'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Pulse Animation:</strong>

The skeleton loader uses a pulsing opacity animation to create a shimmer effect that indicates content is loading.

<strong>How It Works:</strong>

1. <strong>Pulse Animation:</strong> Uses Tailwind's \`animate-pulse\` utility which applies:
   - Opacity transitions from 1 → 0.5 → 1
   - Duration: 2s with cubic-bezier easing
   - Infinite loop

2. <strong>Structure Mimicking:</strong> The skeleton elements mimic the structure of actual content:
   - Lines of varying widths (full, 5/6, 4/6) represent text
   - Box element represents images or larger content blocks

3. <strong>Visual Effect:</strong> The pulsing opacity creates a "breathing" effect that draws attention without being distracting.

<strong>CSS Keyframes:</strong>

\`\`\`css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
\`\`\`

<strong>Benefits:</strong>

- Reduces perceived load time
- Maintains layout structure
- Provides visual feedback that content is loading`,
  author: 'UI Library',
  createdAt: '2024-01-05',
};



