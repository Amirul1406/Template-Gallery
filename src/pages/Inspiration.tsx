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
    title: 'Best for "Big Picture" Inspiration (Full Websites)',
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
    title: 'Best for UI & Micro‑Interactions (Buttons, Hovers, Loaders)',
    subtitle: 'Perfect when you need ideas for how small details should feel.',
    resources: [
      {
        name: 'Dribbble – Interaction & Motion',
        description: 'Search for “Interaction Design”, “Micro interaction”, or “UI Motion”. Many concepts are motion studies (not 1:1 codeable).',
        url: 'https://dribbble.com/tags/interaction_design',
      },
      {
        name: 'Mobbin',
        description: 'Library of real product flows. Filter by flows (e.g. onboarding, checkout) and study subtle transitions and gestures.',
        url: 'https://mobbin.com/',
      },
    ],
  },
  {
    title: 'Best for Code Snippets (Copy & Learn)',
    subtitle: 'When you want to see the code behind the animation.',
    resources: [
      {
        name: 'CodePen',
        description: 'Search more specifically: “GSAP scrolltrigger”, “CSS only loader”, “Three.js particles”, etc.',
        url: 'https://codepen.io/',
      },
      {
        name: 'The Animated Web',
        description: 'Curated list of the best animation demos and pens. Saves you from digging through low‑quality examples.',
        url: 'https://animated-web.com/',
      },
    ],
  },
  {
    title: 'Best for Ready‑to‑Use Assets (No Code Required)',
    subtitle: 'Drop‑in animations when you don’t want to build everything from scratch.',
    resources: [
      {
        name: 'LottieFiles',
        description: 'Huge library of lightweight vector animations (JSON). Great for icons, stickers, and small UI moments.',
        url: 'https://lottiefiles.com/',
      },
      {
        name: 'Jitter.video',
        description: 'Design motion in the browser (or from Figma) and export as video or Lottie.',
        url: 'https://jitter.video/',
      },
    ],
  },
  {
    title: 'Improve Your Full‑Stack Product (Plan → Build → Polish)',
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
    title: 'React + Three.js (R3F) – 3D Web Experiences',
    subtitle: 'Resources to learn, design, and ship high‑quality 3D scenes with React Three Fiber.',
    resources: [
      {
        name: 'Three.js Journey (Bruno Simon)',
        description:
          'The gold‑standard course for web 3D, now with a full React Three Fiber module. Study the “Portal Scene” and “Portfolio” lessons for real production patterns.',
        url: 'https://threejs-journey.com/',
      },
      {
        name: 'CodeSandbox – React Three Fiber Examples',
        description:
          'Search for recipes like “R3F ScrollControls”, “R3F Portals”, or “React Three Fiber Physics” to see copy‑pasteable code and patterns.',
        url: 'https://codesandbox.io/search?query=react%20three%20fiber',
      },
      {
        name: 'Drei Storybook',
        description:
          'Interactive docs for @react-three/drei components like OrbitControls, Html, Text, Stars, and more – the 3D equivalent of a UI component library.',
        url: 'https://drei.pmnd.rs/',
      },
      {
        name: 'Lusion',
        description:
          'Studio known for soft‑body physics, connectors, and highly polished R3F/WebGL experiences. Great for understanding how far you can push 3D UI.',
        url: 'https://lusion.co/',
      },
      {
        name: 'Anderson .Paak / fashion‑style 3D sites',
        description:
          'Examples of mixing 3D clothing/models with classic e‑commerce layouts – ideal reference for product‑driven 3D experiences.',
        url: 'https://andersonbrothers.com/', // placeholder-style inspirational link
      },
      {
        name: 'Next.js Conf Ticket Demos',
        description:
          'Yearly ticket generators built with R3F and Next.js. Clean, performant 3D that still feels like a fast web app.',
        url: 'https://github.com/vercel/virtual-event-starter-kit',
      },
      {
        name: '@react-three/drei',
        description:
          'Essential helper library for R3F: cameras, controls, loaders, text, environment maps, and more so you don’t rebuild common 3D utilities.',
        url: 'https://github.com/pmndrs/drei',
      },
      {
        name: '@react-three/rapier',
        description:
          'High‑performance physics for React Three Fiber. Use it for collisions, gravity, falling objects, and interactive 3D games.',
        url: 'https://github.com/pmndrs/react-three-rapier',
      },
      {
        name: 'Leva',
        description:
          'A lightweight GUI control panel for tweaking lights, colors, positions, and animation values in real time while you build R3F scenes.',
        url: 'https://github.com/pmndrs/leva',
      },
      {
        name: 'Maath',
        description:
          'Math and easing helpers for 3D work – simplifies operations on vectors, noise, smoothing, and transitions in R3F.',
        url: 'https://github.com/pmndrs/maath',
      },
      {
        name: 'ShaderToy',
        description:
          'Huge library of raw GLSL shaders. Advanced, but perfect for learning how “liquid”, “glitch”, and other special effects are built.',
        url: 'https://www.shadertoy.com/',
      },
      {
        name: 'Lamina',
        description:
          'Layer‑based material system for R3F that lets you compose complex shader looks without writing low‑level GLSL from scratch.',
        url: 'https://github.com/pmndrs/lamina',
      },
    ],
  },
];

export default function Inspiration() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">Animation Inspiration Hub</h1>
          <p className="text-gray-400 max-w-2xl">
            A curated list of the best places to find motion ideas. Use this when you&apos;re planning
            new interactions for this project or collecting references for interviews and case studies.
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
                      Opens in a new tab
                    </span>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mt-10 bg-dark-surface border border-dark-border rounded-xl p-6 md:p-7">
          <h2 className="text-2xl font-semibold mb-3">Quick Recommendations</h2>
          <ul className="text-gray-300 space-y-2 text-sm md:text-base">
            <li>
              <span className="font-semibold text-white">For pure “wow” factor:</span>{' '}
              Visit <span className="text-blue-400">Godly.website</span>.
            </li>
            <li>
              <span className="font-semibold text-white">For copy‑ready code examples:</span>{' '}
              Go to <span className="text-blue-400">CodePen</span>.
            </li>
            <li>
              <span className="font-semibold text-white">For small icons / stickers:</span>{' '}
              Browse <span className="text-blue-400">LottieFiles</span>.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}


