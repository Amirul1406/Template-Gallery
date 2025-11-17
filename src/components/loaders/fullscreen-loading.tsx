import { useEffect, useState } from 'react';
import { Component } from '../../types/component';

const Preview = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Auto-increment progress for demo
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center rounded-lg">
      <div className="w-full max-w-[300px]">
        <div className="w-full h-[22px] bg-white rounded-[20px] mb-2.5 box-border p-0.5 shadow-[0_0_40px_5px_rgba(255,255,255,0.78)]">
          <div
            className="rounded-[20px] h-full bg-gradient-to-r from-[#0077ff] to-[#33c2ff] transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-white text-[0.95rem] text-center font-inter font-semibold">Loading...</div>
      </div>
    </div>
  );
};

const ReactCode = `import React from 'react';

interface LoadingProgressProps {
  progress?: number; // Progress from 0-100
  text?: string;
}

const LoadingProgress = ({ progress = 0, text = 'Loading...' }: LoadingProgressProps) => {
  return (
    <div className="w-full max-w-[300px]">
      <div className="w-full h-[22px] bg-white rounded-[20px] mb-2.5 box-border p-0.5 shadow-[0_0_40px_5px_rgba(255,255,255,0.78)]">
        <div
          className="rounded-[20px] h-full bg-gradient-to-r from-[#0077ff] to-[#33c2ff] transition-all duration-300 ease-in-out"
          style={{ width: \`\${progress}%\` }}
        ></div>
      </div>
      <div className="text-white text-[0.95rem] text-center font-semibold">{text}</div>
    </div>
  );
};

export default LoadingProgress;`;

const VueCode = `<template>
  <div class="w-full max-w-[300px]">
    <div class="w-full h-[22px] bg-white rounded-[20px] mb-2.5 box-border p-0.5 shadow-[0_0_40px_5px_rgba(255,255,255,0.78)]">
      <div
        class="rounded-[20px] h-full bg-gradient-to-r from-[#0077ff] to-[#33c2ff] transition-all duration-300 ease-in-out"
        :style="{ width: progress + '%' }"
      ></div>
    </div>
    <div class="text-white text-[0.95rem] text-center font-semibold">{{ text }}</div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    type: Number,
    default: 0
  },
  text: {
    type: String,
    default: 'Loading...'
  }
});
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media screen and (max-width: 610px) {
      .loading-progress-container {
        max-width: 180px;
      }
      .loading-progress-bar {
        height: 18px;
      }
      .loading-progress-text {
        font-size: 0.85rem;
      }
    }
  </style>
</head>
<body class="bg-gray-900 flex items-center justify-center min-h-screen">
  <div class="loading-progress-container w-full max-w-[300px]">
    <div class="loading-progress-bar w-full h-[22px] bg-white rounded-[20px] mb-2.5 box-border p-0.5 shadow-[0_0_40px_5px_rgba(255,255,255,0.78)]">
      <div class="rounded-[20px] h-full bg-gradient-to-r from-[#0077ff] to-[#33c2ff] transition-all duration-300 ease-in-out" id="progressFill" style="width: 0%"></div>
    </div>
    <div class="loading-progress-text text-white text-[0.95rem] text-center font-semibold">Loading...</div>
  </div>
  
  <script>
    let progress = 0;
    const progressFill = document.getElementById('progressFill');
    
    function updateProgress() {
      progress += 1;
      if (progressFill) {
        progressFill.style.width = progress + '%';
      }
      
      if (progress < 100) {
        setTimeout(updateProgress, 50);
      }
    }
    
    updateProgress();
  </script>
</body>
</html>`;

export const fullscreenLoading: Component = {
  id: 'loader-gradient',
  title: 'Loading Gradient',
  description: 'A beautiful animated progress bar with gradient fill. Perfect for showing loading states.',
  category: 'Loading',
  tags: ['loading', 'progress', 'gradient', 'bar', 'indicator'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Progress Bar Animation:</strong>

The loading gradient uses dynamic width changes combined with CSS transitions to create a smooth progress animation.

<strong>How It Works:</strong>

1. <strong>Progress Tracking:</strong> Uses React state (\`useState\`) to track progress from 0-100%.

2. <strong>Dynamic Width:</strong> The progress bar's width is set dynamically using inline styles:
   - \`style={{ width: \`\${progress}%\` }}\`
   - Updates smoothly as progress changes

3. <strong>Gradient Background:</strong> Uses CSS gradient (\`bg-gradient-to-r from-[#0077ff] to-[#33c2ff]\`) for visual appeal.

4. <strong>Transition:</strong> \`transition-all duration-300 ease-in-out\` ensures smooth width changes.

5. <strong>Auto-Increment:</strong> In the preview, \`useEffect\` with \`setInterval\` increments progress every 50ms for demonstration.

<strong>Visual Effects:</strong>

- Glowing shadow: \`shadow-[0_0_40px_5px_rgba(255,255,255,0.78)]\` creates a neon glow
- Rounded corners: \`rounded-[20px]\` for modern appearance
- White track with blue gradient fill for high contrast

<strong>State Management:</strong>

The component accepts a \`progress\` prop (0-100) and updates the bar width accordingly. The transition property ensures smooth animations between value changes.`,
  author: 'UI Library',
  createdAt: '2024-01-07',
};

