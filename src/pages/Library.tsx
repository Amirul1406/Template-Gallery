import { ExternalLink } from 'lucide-react';

interface ResourceLink {
  name: string;
  description: string;
  url: string;
}

interface ResourceSection {
  title: string;
  subtitle: string;
  resources: ResourceLink[];
}

const sections: ResourceSection[] = [
  {
    title: 'Icon Libraries (Modern Alternatives)',
    subtitle: 'Lucide is my favorite for its clean strokes, but these alternatives are excellent for specific needs.',
    resources: [
      {
        name: 'Lucide React',
        description: 'Industry standard for modern React apps. Consistent, clean, and extremely lightweight.',
        url: 'https://lucide.dev/guide/packages/lucide-react',
      },
      {
        name: 'Phosphor Icons',
        description: 'Extremely flexible. You can change the "weight" (thin, bold, fill) of all icons with a single prop.',
        url: 'https://phosphoricons.com/',
      },
      {
        name: 'Heroicons',
        description: 'Made by the Tailwind CSS team. Perfect fit for Tailwind-based sizing and spacing logic.',
        url: 'https://heroicons.com/',
      },
    ],
  },
  {
    title: 'Animation Libraries (Make Things Move)',
    subtitle: 'Beyond standard CSS transitions, these are the heavy hitters for UI and scroll animations.',
    resources: [
      {
        name: 'Framer Motion',
        description: 'The React standard for UI animations. Best for Enter/Exit effects, layout transitions, and morphing.',
        url: 'https://www.framer.com/motion/',
      },
      {
        name: 'GSAP',
        description: 'The king of complex timelines and ScrollTrigger. Essential for cinematic scroll experiences.',
        url: 'https://gsap.com/',
      },
      {
        name: 'Lottie React',
        description: 'Plays Adobe After Effects animations as lightweight SVG. Perfect for complex, custom animated icons.',
        url: 'https://lottiefiles.com/web-player',
      },
    ],
  },
  {
    title: 'Cinematic Feel (The "Secret Sauce")',
    subtitle: 'Tools used by Apple and Awwwards winners to make websites feel like high-end digital experiences.',
    resources: [
      {
        name: 'Lenis Scroll',
        description: 'Momentum-based "Smooth Scroll" that makes scrolling feel expensive and fluid rather than jittery.',
        url: 'https://lenis.darkroom.engineering/',
      },
      {
        name: 'React Three Fiber',
        description: 'The powerful React wrapper for Three.js. Use this to bring real 3D models and scenes to the web.',
        url: 'https://docs.pmndrs.org/react-three-fiber',
      },
      {
        name: 'Maath',
        description: 'Math helpers for 3D/Visuals. Simplifies vector math, easing, and smoothing for interactive effects.',
        url: 'https://github.com/pmndrs/maath',
      },
    ],
  },
  {
    title: 'Best for "Big Picture" Inspiration',
    subtitle: 'See how top-tier teams use motion for storytelling, navigation, and page transitions.',
    resources: [
      {
        name: 'Awwwards – Animation Collection',
        description: 'Industry-standard gallery. Check “Site of the Day”, “Transitions”, and “Micro-interactions” collections.',
        url: 'https://www.awwwards.com/websites/animation/',
      },
      {
        name: 'Godly.website',
        description: 'Highly curated “god-tier” web experiences with modern, smooth, React/Next/GSAP-heavy interactions.',
        url: 'https://godly.website/',
      },
      {
        name: 'Framer Gallery',
        description: 'High-fidelity scroll and page animations. Great for modern layout and motion ideas.',
        url: 'https://www.framer.com/gallery/',
      },
    ],
  },
  {
    title: 'Improve Your Full-Stack Product (Plan → Build → Polish)',
    subtitle: 'Use these as a “second pair of eyes” to iterate on both frontend and backend with confidence.',
    resources: [
      {
        name: 'roadmap.sh – Career & Tech Roadmaps',
        description:
          'Visual skill trees for Frontend, Backend, and DevOps. Great for deciding what to add next (e.g. after database → caching, auth, testing).',
        url: 'https://roadmap.sh/',
      },
      {
        name: 'Relume – AI Sitemaps & Wireframes',
        description:
          'Describe your idea and get instant sitemaps and page sections. Perfect for planning structure and layout before you code.',
        url: 'https://www.relume.io/',
      },
      {
        name: 'PageSpeed Insights / Lighthouse',
        description:
          'Google’s official audits for Performance, Accessibility, Best Practices, and SEO. Use it to catch issues like unoptimized images or heavy scripts.',
        url: 'https://pagespeed.web.dev/',
      },
      {
        name: 'Refactoring UI',
        description:
          'Design tips for developers: spacing, color, typography, and hierarchy. Ideal when your app works but doesn’t “look” right yet.',
        url: 'https://www.refactoringui.com/',
      },
      {
        name: 'SonarLint / SonarQube',
        description:
          'Static analysis for frontend and backend code. Finds bugs, security risks, and code smells directly inside your editor or CI pipeline.',
        url: 'https://www.sonarsource.com/products/sonarlint/',
      },
      {
        name: 'StackShare',
        description:
          'See real tech stacks from companies like Airbnb or Uber. Use it to compare your choices (databases, queues, frameworks) with industry standards.',
        url: 'https://stackshare.io/',
      },
      {
        name: 'Next.js & Remix Docs',
        description:
          'Meta‑frameworks that combine frontend + backend patterns. Reading their docs is like a mini‑course in modern full‑stack architecture.',
        url: 'https://nextjs.org/docs',
      },
    ],
  },
  {
    title: 'Lightweight Creation Tools (Blender Alternatives)',
    subtitle: 'Given your background in React and web development, Spline is likely your best option for creation. These are browser-based or low-spec tools.',
    resources: [
      {
        name: 'Spline',
        description: 'Design and interactive 3D for the web. Exports directly to React/Three.js code. Familiar for frontend devs.',
        url: 'https://spline.design/',
      },
      {
        name: 'Blockbench',
        description: 'Low-poly and retro style modeling. Extremely light, free, and standard for GLTF exports.',
        url: 'https://www.blockbench.net/',
      },
      {
        name: 'Womp',
        description: 'Browser-based "3D clay" modeling. No complex topology, just combine shapes for "gooey" or soft results.',
        url: 'https://www.womp.com/',
      },
      {
        name: 'MagicaVoxel',
        description: 'Free voxel art (3D pixel) editor. Requires almost no computing power and creates a unique Lego-style look.',
        url: 'https://ephtracy.github.io/',
      },
    ],
  },
  {
    title: '3D Model Libraries (Asset Sources)',
    subtitle: 'Excellent sources for free or lightweight 3D assets to populate your scenes.',
    resources: [
      {
        name: 'Sketchfab',
        description: 'The industry standard library. Huge collection of free user-uploaded models (filter by Downloadable).',
        url: 'https://sketchfab.com/feed',
      },
      {
        name: 'Poly Pizza',
        description: 'A hidden gem for Low Poly assets. Tiny file sizes, perfect for web performance.',
        url: 'https://poly.pizza/',
      },
      {
        name: 'Kenney Assets',
        description: '100% free (CC0) simple, clean, and extremely lightweight game assets.',
        url: 'https://kenney.nl/assets/category:3D',
      },
      {
        name: 'Itch.io (3D Assets)',
        description: 'Indie marketplace for efficient assets. Great for finding unique or retro/PS1 style models.',
        url: 'https://itch.io/game-assets/tag-3d',
      },
    ],
  },
  {
    title: 'React + Three.js (R3F) – 3D Web Experiences',
    subtitle: 'Resources to learn, design, and ship high‑quality 3D scenes with React Three Fiber.',
    resources: [
      {
        name: 'Three.js Journey (Bruno Simon)',
        description:
          'The gold-standard course for web 3D, now with a full React Three Fiber module. Essential for real production patterns.',
        url: 'https://threejs-journey.com/',
      },
      {
        name: 'Drei Storybook',
        description:
          'Interactive docs for @react-three/drei components – the 3D equivalent of a UI component library.',
        url: 'https://drei.pmnd.rs/',
      },
      {
        name: 'Lusion',
        description:
          'Studio known for high-polish R3F/WebGL experiences. Great reference for how far you can push 3D UI.',
        url: 'https://lusion.co/',
      },
      {
        name: '@react-three/rapier',
        description:
          'High‑performance physics for React Three Fiber. Use it for collisions, gravity, and interactive 3D games.',
        url: 'https://github.com/pmndrs/react-three-rapier',
      },
      {
        name: 'Leva',
        description:
          'A lightweight GUI control panel for tweaking lights, colors, and animation values in real time.',
        url: 'https://github.com/pmndrs/leva',
      },
      {
        name: 'Lamina',
        description:
          'Layer-based material system for R3F that lets you compose complex shader looks easily.',
        url: 'https://github.com/pmndrs/lamina',
      },
    ],
  },
];

export default function Library() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Resource Library</h1>
          <p className="text-gray-400 max-w-2xl">
            A curated collection of libraries, tools, and inspiration to help you build high-end 
            digital experiences—from icons and animations to 3D and full-stack architecture.
          </p>
        </header>

        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="bg-dark-surface border border-dark-border rounded-xl p-6 md:p-7"
            >
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-1">{section.title}</h2>
                <p className="text-gray-400 text-sm md:text-base">{section.subtitle}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {section.resources.map((resource) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col justify-between bg-dark-bg/60 border border-dark-border rounded-lg p-4 hover:border-blue-500 hover:bg-dark-bg transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base md:text-lg font-semibold group-hover:text-blue-400 transition-colors">
                          {resource.name}
                        </h3>
                        <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    <span className="mt-3 text-xs text-gray-500 group-hover:text-gray-400">
                      Visit Resource
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 bg-dark-surface border border-dark-border rounded-xl p-6 md:p-7">
          <h2 className="text-2xl font-semibold mb-3">Quick Recommendations for Your Stack</h2>
          <ul className="text-gray-300 space-y-3 text-sm md:text-base">
            <li>
              <span className="font-semibold text-white">Icons:</span> Use <span className="text-blue-400">Lucide React</span> for clean, professional UI controls.
            </li>
            <li>
              <span className="font-semibold text-white">Scroll Engine:</span> Use <span className="text-blue-400">GSAP</span> for cinematic image sequences and scroll-driven motion.
            </li>
            <li>
              <span className="font-semibold text-white">Smoothness:</span> Install <span className="text-blue-400">Lenis</span> so the scroll feels expensive and fluid.
            </li>
            <li>
              <span className="font-semibold text-white">UI Animations:</span> Use <span className="text-blue-400">Framer Motion</span> for smooth text and component transitions.
            </li>
            <li>
              <span className="font-semibold text-white">3D Creation:</span> Try <span className="text-blue-400">Spline</span> first—it feels very natural for web developers.
            </li>
            <li>
              <span className="font-semibold text-white">3D Assets:</span> Check <span className="text-blue-400">Poly Pizza</span> for simple props (chairs, trees) to keep performance high.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
