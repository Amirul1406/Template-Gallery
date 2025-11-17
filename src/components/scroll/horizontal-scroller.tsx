import { useEffect, useRef } from 'react';
import { Component } from '../../types/component';
import './horizontal-scroller.css';

const Preview = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    const wrapper = wrapperRef.current;
    if (!container || !content || !wrapper) return;

    const handleScroll = () => {
      const scrollTop = wrapper.scrollTop;
      const maxScroll = wrapper.scrollHeight - wrapper.clientHeight;
      
      if (maxScroll <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1, scrollTop / maxScroll));
      const contentWidth = content.scrollWidth;
      const containerWidth = container.clientWidth;
      const maxTranslate = Math.max(0, contentWidth - containerWidth);
      const translateX = -scrollProgress * maxTranslate;
      
      content.style.transform = `translateX(${translateX}px)`;
    };

    // Use requestAnimationFrame for smoother updates
    let rafId: number;
    const scrollHandler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(handleScroll);
    };

    wrapper.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Initial call after a short delay to ensure layout is complete
    setTimeout(() => {
      handleScroll();
    }, 100);

    return () => {
      wrapper.removeEventListener('scroll', scrollHandler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="horizontal-scroller-preview-wrapper" ref={wrapperRef}>
      <div className="horizontal-scroller-container" ref={containerRef}>
        <div className="horizontal-scroller-content" ref={contentRef}>
          <div className="horizontal-scroller-item">Item 1</div>
          <div className="horizontal-scroller-item">Item 2</div>
          <div className="horizontal-scroller-item">Item 3</div>
          <div className="horizontal-scroller-item">Item 4</div>
          <div className="horizontal-scroller-item">Item 5</div>
          <div className="horizontal-scroller-item">Item 6</div>
          <div className="horizontal-scroller-item">Item 7</div>
          <div className="horizontal-scroller-item">Item 8</div>
          <div className="horizontal-scroller-item">Item 9</div>
          <div className="horizontal-scroller-item">Item 10</div>
        </div>
      </div>
      <div className="horizontal-scroller-spacer" />
    </div>
  );
};

const ReactCode = `import { useEffect, useRef } from 'react';
import './horizontal-scroller.css';

const HorizontalScroller = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / maxScroll;
      
      const maxTranslate = content.offsetWidth - container.offsetWidth;
      const translateX = -scrollProgress * maxTranslate;
      
      content.style.transform = \`translateX(\${translateX}px)\`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="horizontal-scroller-wrapper">
      <div className="horizontal-scroller-container" ref={containerRef}>
        <div className="horizontal-scroller-content" ref={contentRef}>
          {children}
        </div>
      </div>
      <div className="horizontal-scroller-spacer" />
    </div>
  );
};

export default HorizontalScroller;`;

const ReactStylesCode = `
.horizontal-scroller-wrapper {
  width: 100%;
}

.horizontal-scroller-container {
  position: relative;
  width: 100%;
  height: 100vh; /* Adjust to your frame height */
  overflow: hidden;
}

.horizontal-scroller-content {
  display: flex;
  height: 100%;
  will-change: transform;
  transition: transform 0.1s ease-out;
}

.horizontal-scroller-spacer {
  height: 200vh; /* Creates scrollable space */
}

/* Your custom frame styles */
.horizontal-scroller-item {
  min-width: 300px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  margin-right: 20px;
  border-radius: 8px;
}`;

const VueCode = `<template>
  <div class="horizontal-scroller-wrapper">
    <div class="horizontal-scroller-container" ref="containerRef">
      <div class="horizontal-scroller-content" ref="contentRef">
        <slot />
      </div>
    </div>
    <div class="horizontal-scroller-spacer" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import './horizontal-scroller.css';

const containerRef = ref(null);
const contentRef = ref(null);

const handleScroll = () => {
  if (!containerRef.value || !contentRef.value) return;
  
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollProgress = scrollTop / maxScroll;
  
  const maxTranslate = contentRef.value.offsetWidth - containerRef.value.offsetWidth;
  const translateX = -scrollProgress * maxTranslate;
  
  contentRef.value.style.transform = \`translateX(\${translateX}px)\`;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>`;

const HtmlCode = `<!DOCTYPE html>
<html>
<head>
  <style>
    .horizontal-scroller-wrapper {
      width: 100%;
    }

    .horizontal-scroller-container {
      position: relative;
      width: 100%;
      height: 100vh;
      overflow: hidden;
    }

    .horizontal-scroller-content {
      display: flex;
      height: 100%;
      will-change: transform;
      transition: transform 0.1s ease-out;
    }

    .horizontal-scroller-spacer {
      height: 200vh;
    }

    .horizontal-scroller-item {
      min-width: 300px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      margin-right: 20px;
      border-radius: 8px;
      color: white;
      font-size: 24px;
    }
  </style>
</head>
<body>
  <div class="horizontal-scroller-wrapper">
    <div class="horizontal-scroller-container" id="container">
      <div class="horizontal-scroller-content" id="content">
        <div class="horizontal-scroller-item">Item 1</div>
        <div class="horizontal-scroller-item">Item 2</div>
        <div class="horizontal-scroller-item">Item 3</div>
        <div class="horizontal-scroller-item">Item 4</div>
        <div class="horizontal-scroller-item">Item 5</div>
        <div class="horizontal-scroller-item">Item 6</div>
        <div class="horizontal-scroller-item">Item 7</div>
        <div class="horizontal-scroller-item">Item 8</div>
      </div>
    </div>
    <div class="horizontal-scroller-spacer"></div>
  </div>

  <script>
    const container = document.getElementById('container');
    const content = document.getElementById('content');

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = scrollTop / maxScroll;
      
      const maxTranslate = content.offsetWidth - container.offsetWidth;
      const translateX = -scrollProgress * maxTranslate;
      
      content.style.transform = \`translateX(\${translateX}px)\`;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
  </script>
</body>
</html>`;

export const horizontalScroller: Component = {
  id: 'scroll-horizontal',
  title: 'Horizontal Scroller',
  description: 'A lightweight UI component that applies horizontal scrolling to any custom frame with minimal setup. Users scroll vertically as usual, while the component translates that motion into smooth horizontal movement.',
  category: 'Scroll',
  tags: ['scroll', 'horizontal', 'vertical', 'transform', 'interactive', 'layout'],
  preview: Preview,
  codes: [
    { language: 'react', code: ReactCode, label: 'React' },
    { language: 'react', code: ReactStylesCode, label: 'React Styles' },
    { language: 'vue', code: VueCode, label: 'Vue' },
    { language: 'html', code: HtmlCode, label: 'HTML/CSS' },
  ],
  explanation: `<strong>Scroll Translation Mechanism:</strong>

The Horizontal Scroller converts vertical scroll position into horizontal translation, creating a smooth sideways scrolling effect.

<strong>How It Works:</strong>

1. <strong>Scroll Tracking:</strong> The component listens to the window's scroll event and calculates the current scroll position (\`scrollTop\`) relative to the maximum scrollable distance.

2. <strong>Progress Calculation:</strong> 
   - \`scrollProgress = scrollTop / maxScroll\`
   - This gives a value between 0 (top) and 1 (bottom)

3. <strong>Horizontal Translation:</strong>
   - Calculates the maximum horizontal distance: \`maxTranslate = contentWidth - containerWidth\`
   - Applies translation: \`translateX = -scrollProgress * maxTranslate\`
   - The negative value moves content left as you scroll down

4. <strong>Container Setup:</strong>
   - Container has \`overflow: hidden\` to clip content
   - Content uses \`display: flex\` for horizontal layout
   - Spacer element creates vertical scroll space

<strong>Key CSS Properties:</strong>

- \`will-change: transform\`: Optimizes performance by hinting the browser about upcoming transforms
- \`transition: transform 0.1s ease-out\`: Smooth animation (optional, can be removed for instant updates)
- \`overflow: hidden\`: Clips content outside container bounds

<strong>Auto-Resize Behavior:</strong>

The component automatically adjusts to your frame's height. Simply set the container height (e.g., \`height: 100vh\`) and the component will match it.

<strong>Performance Optimization:</strong>

- Uses \`will-change\` for GPU acceleration
- Calculates transforms efficiently
- Event listener cleanup on unmount

<strong>Use Cases:</strong>

- Wide timelines
- Image galleries
- Product showcases
- Portfolio layouts
- Story presentations`,
  author: 'UI Library',
  createdAt: '2024-01-08',
};

