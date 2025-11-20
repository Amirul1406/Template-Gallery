import React from 'react';
import { Component } from '../../types/component';
import FadeGallery from './fade-gallery';

const Preview = () => {
  const galleryItems = [
    {
      id: 1,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Slide 1</h3>
            <p className="text-lg">Beautiful gradient background</p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-pink-500 to-red-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Slide 2</h3>
            <p className="text-lg">Smooth fade transitions</p>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div className="w-full h-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center text-white">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-2">Slide 3</h3>
            <p className="text-lg">Auto-play support</p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <FadeGallery
        items={galleryItems}
        autoPlay={true}
        autoPlayInterval={3000}
        showDots={true}
        showArrows={true}
      />
    </div>
  );
};

const ReactCode = `import { useState, useEffect, useRef } from 'react';

interface FadeGalleryProps {
  items: Array<{
    id: string | number;
    content: React.ReactNode;
  }>;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function FadeGallery({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  className = '',
}: FadeGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goToSlide = (index: number) => {
    if (index === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToNext = () => {
    const nextIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    goToSlide(nextIndex);
  };

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    goToSlide(prevIndex);
  };

  useEffect(() => {
    if (autoPlay && items.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, currentIndex, items.length]);

  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (autoPlay && items.length > 1) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);
    }
  };

  if (items.length === 0) {
    return (
      <div className={\`flex items-center justify-center p-8 \${className}\`}>
        <p className="text-gray-400">No items to display</p>
      </div>
    );
  }

  return (
    <div
      className={\`relative w-full \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={\`absolute inset-0 transition-opacity duration-500 \${
                index === currentIndex
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }\`}
            >
              {item.content}
            </div>
          ))}
        </div>

        {showArrows && items.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {showDots && items.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={\`transition-all duration-200 rounded-full \${
                  index === currentIndex
                    ? 'w-8 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/75'
                }\`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Usage:
const items = [
  {
    id: 1,
    content: <img src="image1.jpg" className="w-full h-full object-cover" />
  },
  {
    id: 2,
    content: <img src="image2.jpg" className="w-full h-full object-cover" />
  },
];

<FadeGallery
  items={items}
  autoPlay={true}
  autoPlayInterval={3000}
  showDots={true}
  showArrows={true}
/>`;

const VueCode = `<template>
  <div
    class="relative w-full"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="relative overflow-hidden rounded-lg">
      <div class="relative w-full" style="aspect-ratio: 16/9">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          :class="[
            'absolute inset-0 transition-opacity duration-500',
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          ]"
        >
          <component :is="item.content" />
        </div>
      </div>

      <button
        v-if="showArrows && items.length > 1"
        @click="goToPrevious"
        class="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        ←
      </button>
      <button
        v-if="showArrows && items.length > 1"
        @click="goToNext"
        class="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        →
      </button>

      <div v-if="showDots && items.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        <button
          v-for="(item, index) in items"
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'transition-all duration-200 rounded-full',
            index === currentIndex ? 'w-8 h-2 bg-white' : 'w-2 h-2 bg-white/50 hover:bg-white/75'
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  items: { type: Array, required: true },
  autoPlay: { type: Boolean, default: false },
  autoPlayInterval: { type: Number, default: 3000 },
  showDots: { type: Boolean, default: true },
  showArrows: { type: Boolean, default: true },
});

const currentIndex = ref(0);
const intervalRef = ref(null);

const goToSlide = (index) => {
  if (index === currentIndex.value) return;
  currentIndex.value = index;
};

const goToNext = () => {
  const nextIndex = currentIndex.value === props.items.length - 1 ? 0 : currentIndex.value + 1;
  goToSlide(nextIndex);
};

const goToPrevious = () => {
  const prevIndex = currentIndex.value === 0 ? props.items.length - 1 : currentIndex.value - 1;
  goToSlide(prevIndex);
};

const handleMouseEnter = () => {
  if (intervalRef.value) clearInterval(intervalRef.value);
};

const handleMouseLeave = () => {
  if (props.autoPlay && props.items.length > 1) {
    intervalRef.value = setInterval(goToNext, props.autoPlayInterval);
  }
};

onMounted(() => {
  if (props.autoPlay && props.items.length > 1) {
    intervalRef.value = setInterval(goToNext, props.autoPlayInterval);
  }
});

onUnmounted(() => {
  if (intervalRef.value) clearInterval(intervalRef.value);
});
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .gallery {
      position: relative;
      width: 100%;
      overflow: hidden;
      border-radius: 0.5rem;
    }
    
    .gallery-container {
      position: relative;
      width: 100%;
      aspect-ratio: 16/9;
    }
    
    .slide {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 0.5s;
    }
    
    .slide.active {
      opacity: 1;
      z-index: 10;
    }
    
    .arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 20;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: none;
      padding: 0.5rem;
      border-radius: 50%;
      cursor: pointer;
    }
    
    .arrow:hover {
      background: rgba(0, 0, 0, 0.7);
    }
    
    .arrow-left {
      left: 1rem;
    }
    
    .arrow-right {
      right: 1rem;
    }
    
    .dots {
      position: absolute;
      bottom: 1rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 0.5rem;
      z-index: 20;
    }
    
    .dot {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .dot.active {
      width: 2rem;
      background: white;
    }
  </style>
</head>
<body>
  <div class="gallery">
    <div class="gallery-container">
      <div class="slide active">
        <img src="image1.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="slide">
        <img src="image2.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      <div class="slide">
        <img src="image3.jpg" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>
      
      <button class="arrow arrow-left" onclick="goToPrevious()">←</button>
      <button class="arrow arrow-right" onclick="goToNext()">→</button>
      
      <div class="dots">
        <button class="dot active" onclick="goToSlide(0)"></button>
        <button class="dot" onclick="goToSlide(1)"></button>
        <button class="dot" onclick="goToSlide(2)"></button>
      </div>
    </div>
  </div>
  
  <script>
    let currentIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
      slides[currentIndex].classList.remove('active');
      dots[currentIndex].classList.remove('active');
      currentIndex = index;
      slides[currentIndex].classList.add('active');
      dots[currentIndex].classList.add('active');
    }
    
    function goToNext() {
      const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    }
    
    function goToPrevious() {
      const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
      goToSlide(prevIndex);
    }
    
    // Auto-play
    setInterval(goToNext, 3000);
  </script>
</body>
</html>`;

export const fadeGallery: Component = {
  id: 'gallery-fade',
  title: 'Fade Gallery',
  description: 'A beautiful image gallery with smooth fade transitions, auto-play, navigation arrows, and dot indicators. Perfect for showcasing images or content slides.',
  category: 'Gallery',
  tags: ['gallery', 'carousel', 'slider', 'fade', 'images', 'auto-play'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Fade Gallery Component:</strong>

A fully-featured image/content gallery with smooth fade transitions between slides.

<strong>Key Features:</strong>

1. <strong>Fade Transitions:</strong>
   - Smooth opacity transitions between slides
   - 500ms duration for elegant animations
   - Uses CSS \`transition-opacity\` for performance

2. <strong>Auto-Play:</strong>
   - Automatically advances slides at configurable intervals
   - Pauses on hover for better user experience
   - Resumes when mouse leaves

3. <strong>Navigation:</strong>
   - Left/Right arrow buttons for manual navigation
   - Dot indicators at bottom showing current slide
   - Click any dot to jump to that slide

4. <strong>Flexible Content:</strong>
   - Accepts any React content (images, divs, components)
   - Each slide has unique \`id\` and \`content\`
   - Responsive with 16:9 aspect ratio

<strong>Props:</strong>

- \`items\`: Array of \`{ id, content }\` objects
- \`autoPlay\`: Enable/disable auto-play (default: false)
- \`autoPlayInterval\`: Time between slides in ms (default: 3000)
- \`showDots\`: Show/hide dot navigation (default: true)
- \`showArrows\`: Show/hide arrow buttons (default: true)
- \`className\`: Additional CSS classes

<strong>Usage Example:</strong>

\`\`\`tsx
<FadeGallery
  items={[
    { id: 1, content: <img src="image1.jpg" /> },
    { id: 2, content: <img src="image2.jpg" /> },
  ]}
  autoPlay={true}
  autoPlayInterval={3000}
/>
\`\`\``,
  author: 'UI Library',
  createdAt: '2024-01-01',
};

