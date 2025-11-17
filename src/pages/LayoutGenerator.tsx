import { useState, useMemo } from 'react';
import { Copy, Check, Layout, Sidebar, Grid, Columns } from 'lucide-react';

type LayoutType = 'sidebar' | 'dashboard' | 'card-grid' | 'centered' | 'split-screen' | 'header-footer';
type CodeLanguage = 'react' | 'vue' | 'html';

interface LayoutConfig {
  sidebarWidth?: string;
  headerHeight?: string;
  footerHeight?: string;
  columns?: number;
  gap?: string;
}

const LayoutGeneratorPage = () => {
  const [layoutType, setLayoutType] = useState<LayoutType>('sidebar');
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('react');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [config, setConfig] = useState<LayoutConfig>({
    sidebarWidth: '250px',
    headerHeight: '64px',
    footerHeight: '64px',
    columns: 3,
    gap: '1rem',
  });

  const generateCode = (type: LayoutType, lang: CodeLanguage, cfg: LayoutConfig): string => {
    switch (type) {
      case 'sidebar':
        return generateSidebarCode(lang, cfg);
      case 'dashboard':
        return generateDashboardCode(lang, cfg);
      case 'card-grid':
        return generateCardGridCode(lang, cfg);
      case 'centered':
        return generateCenteredCode(lang, cfg);
      case 'split-screen':
        return generateSplitScreenCode(lang, cfg);
      case 'header-footer':
        return generateHeaderFooterCode(lang, cfg);
      default:
        return '';
    }
  };

  const generateSidebarCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    const sidebarWidth = cfg.sidebarWidth || '250px';
    
    if (lang === 'react') {
      return `import './Layout.css';

function SidebarLayout() {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar" style={{ width: '${sidebarWidth}' }}>
        <nav>
          <h2>Navigation</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header>
          <h1>Main Content</h1>
        </header>
        <section>
          <p>Your content goes here...</p>
        </section>
      </main>
    </div>
  );
}

export default SidebarLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="sidebar-layout">
    <aside class="sidebar" :style="{ width: '${sidebarWidth}' }">
      <nav>
        <h2>Navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </aside>
    <main class="main-content">
      <header>
        <h1>Main Content</h1>
      </header>
      <section>
        <p>Your content goes here...</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.sidebar-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  background: #1f2937;
  color: white;
  padding: 1.5rem;
}

.main-content {
  flex: 1;
  padding: 2rem;
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sidebar Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .sidebar-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .sidebar {
      width: ${sidebarWidth};
      background: #1f2937;
      color: white;
      padding: 1.5rem;
    }
    
    .sidebar nav ul {
      list-style: none;
    }
    
    .sidebar nav ul li {
      margin: 0.5rem 0;
    }
    
    .sidebar nav ul li a {
      color: white;
      text-decoration: none;
    }
    
    .main-content {
      flex: 1;
      padding: 2rem;
    }
  </style>
</head>
<body>
  <div class="sidebar-layout">
    <aside class="sidebar">
      <nav>
        <h2>Navigation</h2>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </aside>
    </aside>
    <main class="main-content">
      <header>
        <h1>Main Content</h1>
      </header>
      <section>
        <p>Your content goes here...</p>
      </section>
    </main>
  </div>
</body>
</html>`;
    }
  };

  const generateDashboardCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    const headerHeight = cfg.headerHeight || '64px';
    
    if (lang === 'react') {
      return `import './Dashboard.css';

function DashboardLayout() {
  return (
    <div className="dashboard-layout">
      <header className="dashboard-header" style={{ height: '${headerHeight}' }}>
        <h1>Dashboard</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Analytics</a>
          <a href="#">Settings</a>
        </nav>
      </header>
      <div className="dashboard-content">
        <aside className="dashboard-sidebar">
          <nav>
            <ul>
              <li><a href="#">Overview</a></li>
              <li><a href="#">Reports</a></li>
              <li><a href="#">Users</a></li>
            </ul>
          </nav>
        </aside>
        <main className="dashboard-main">
          <div className="dashboard-grid">
            <div className="card">Card 1</div>
            <div className="card">Card 2</div>
            <div className="card">Card 3</div>
            <div className="card">Card 4</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="dashboard-layout">
    <header class="dashboard-header" :style="{ height: '${headerHeight}' }">
      <h1>Dashboard</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </header>
    <div class="dashboard-content">
      <aside class="dashboard-sidebar">
        <nav>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Users</a></li>
          </ul>
        </nav>
      </aside>
      <main class="dashboard-main">
        <div class="dashboard-grid">
          <div class="card">Card 1</div>
          <div class="card">Card 2</div>
          <div class="card">Card 3</div>
          <div class="card">Card 4</div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.dashboard-header {
  background: #1f2937;
  color: white;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dashboard-content {
  display: flex;
  flex: 1;
}

.dashboard-sidebar {
  width: 250px;
  background: #111827;
  padding: 1.5rem;
}

.dashboard-main {
  flex: 1;
  padding: 2rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dashboard Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .dashboard-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .dashboard-header {
      height: ${headerHeight};
      background: #1f2937;
      color: white;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .dashboard-content {
      display: flex;
      flex: 1;
    }
    
    .dashboard-sidebar {
      width: 250px;
      background: #111827;
      padding: 1.5rem;
    }
    
    .dashboard-main {
      flex: 1;
      padding: 2rem;
    }
    
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="dashboard-layout">
    <header class="dashboard-header">
      <h1>Dashboard</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">Analytics</a>
        <a href="#">Settings</a>
      </nav>
    </header>
    <div class="dashboard-content">
      <aside class="dashboard-sidebar">
        <nav>
          <ul>
            <li><a href="#">Overview</a></li>
            <li><a href="#">Reports</a></li>
            <li><a href="#">Users</a></li>
          </ul>
        </aside>
      </aside>
      <main class="dashboard-main">
        <div class="dashboard-grid">
          <div class="card">Card 1</div>
          <div class="card">Card 2</div>
          <div class="card">Card 3</div>
          <div class="card">Card 4</div>
        </div>
      </main>
    </div>
  </div>
</body>
</html>`;
    }
  };

  const generateCardGridCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    const columns = cfg.columns || 3;
    const gap = cfg.gap || '1rem';
    
    if (lang === 'react') {
      return `import './CardGrid.css';

function CardGridLayout() {
  const cards = Array.from({ length: 12 }, (_, i) => i + 1);
  
  return (
    <div className="card-grid-container">
      <header>
        <h1>Card Grid Layout</h1>
      </header>
      <div className="card-grid" style={{ 
        gridTemplateColumns: 'repeat(${columns}, 1fr)',
        gap: '${gap}'
      }}>
        {cards.map((card) => (
          <div key={card} className="card">
            <h3>Card {card}</h3>
            <p>Card content goes here...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardGridLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="card-grid-container">
    <header>
      <h1>Card Grid Layout</h1>
    </header>
    <div 
      class="card-grid" 
      :style="{ 
        gridTemplateColumns: 'repeat(${columns}, 1fr)',
        gap: '${gap}'
      }"
    >
      <div v-for="n in 12" :key="n" class="card">
        <h3>Card {{ n }}</h3>
        <p>Card content goes here...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-grid-container {
  padding: 2rem;
}

.card-grid {
  display: grid;
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Card Grid Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .card-grid-container {
      padding: 2rem;
    }
    
    .card-grid {
      display: grid;
      grid-template-columns: repeat(${columns}, 1fr);
      gap: ${gap};
    }
    
    .card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <div class="card-grid-container">
    <header>
      <h1>Card Grid Layout</h1>
    </header>
    <div class="card-grid">
      <div class="card">
        <h3>Card 1</h3>
        <p>Card content goes here...</p>
      </div>
      <div class="card">
        <h3>Card 2</h3>
        <p>Card content goes here...</p>
      </div>
      <div class="card">
        <h3>Card 3</h3>
        <p>Card content goes here...</p>
      </div>
      <!-- Add more cards as needed -->
    </div>
  </div>
</body>
</html>`;
    }
  };

  const generateCenteredCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    if (lang === 'react') {
      return `import './Centered.css';

function CenteredLayout() {
  return (
    <div className="centered-layout">
      <div className="centered-content">
        <h1>Centered Content</h1>
        <p>This content is perfectly centered both horizontally and vertically.</p>
        <button>Get Started</button>
      </div>
    </div>
  );
}

export default CenteredLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="centered-layout">
    <div class="centered-content">
      <h1>Centered Content</h1>
      <p>This content is perfectly centered both horizontally and vertically.</p>
      <button>Get Started</button>
    </div>
  </div>
</template>

<style scoped>
.centered-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.centered-content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Centered Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .centered-layout {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .centered-content {
      text-align: center;
      max-width: 600px;
      padding: 2rem;
    }
  </style>
</head>
<body>
  <div class="centered-layout">
    <div class="centered-content">
      <h1>Centered Content</h1>
      <p>This content is perfectly centered both horizontally and vertically.</p>
      <button>Get Started</button>
    </div>
  </div>
</body>
</html>`;
    }
  };

  const generateSplitScreenCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    if (lang === 'react') {
      return `import './SplitScreen.css';

function SplitScreenLayout() {
  return (
    <div className="split-screen-layout">
      <div className="split-left">
        <h1>Left Side</h1>
        <p>Content for the left side goes here...</p>
      </div>
      <div className="split-right">
        <h1>Right Side</h1>
        <p>Content for the right side goes here...</p>
      </div>
    </div>
  );
}

export default SplitScreenLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="split-screen-layout">
    <div class="split-left">
      <h1>Left Side</h1>
      <p>Content for the left side goes here...</p>
    </div>
    <div class="split-right">
      <h1>Right Side</h1>
      <p>Content for the right side goes here...</p>
    </div>
  </div>
</template>

<style scoped>
.split-screen-layout {
  display: flex;
  min-height: 100vh;
}

.split-left,
.split-right {
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.split-left {
  background: #f3f4f6;
}

.split-right {
  background: #ffffff;
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Split Screen Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .split-screen-layout {
      display: flex;
      min-height: 100vh;
    }
    
    .split-left,
    .split-right {
      flex: 1;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .split-left {
      background: #f3f4f6;
    }
    
    .split-right {
      background: #ffffff;
    }
  </style>
</head>
<body>
  <div class="split-screen-layout">
    <div class="split-left">
      <h1>Left Side</h1>
      <p>Content for the left side goes here...</p>
    </div>
    <div class="split-right">
      <h1>Right Side</h1>
      <p>Content for the right side goes here...</p>
    </div>
  </div>
</body>
</html>`;
    }
  };

  const generateHeaderFooterCode = (lang: CodeLanguage, cfg: LayoutConfig): string => {
    const headerHeight = cfg.headerHeight || '64px';
    const footerHeight = cfg.footerHeight || '64px';
    
    if (lang === 'react') {
      return `import './HeaderFooter.css';

function HeaderFooterLayout() {
  return (
    <div className="header-footer-layout">
      <header className="layout-header" style={{ height: '${headerHeight}' }}>
        <h1>Header</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>
      <main className="layout-main">
        <h2>Main Content</h2>
        <p>Your main content goes here...</p>
      </main>
      <footer className="layout-footer" style={{ height: '${footerHeight}' }}>
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HeaderFooterLayout;`;
    } else if (lang === 'vue') {
      return `<template>
  <div class="header-footer-layout">
    <header class="layout-header" :style="{ height: '${headerHeight}' }">
      <h1>Header</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
    <main class="layout-main">
      <h2>Main Content</h2>
      <p>Your main content goes here...</p>
    </main>
    <footer class="layout-footer" :style="{ height: '${footerHeight}' }">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</template>

<style scoped>
.header-footer-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-header {
  background: #1f2937;
  color: white;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.layout-main {
  flex: 1;
  padding: 2rem;
}

.layout-footer {
  background: #111827;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
}
</style>`;
    } else {
      return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Header Footer Layout</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    .header-footer-layout {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .layout-header {
      height: ${headerHeight};
      background: #1f2937;
      color: white;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .layout-main {
      flex: 1;
      padding: 2rem;
    }
    
    .layout-footer {
      height: ${footerHeight};
      background: #111827;
      color: white;
      padding: 1rem 2rem;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header-footer-layout">
    <header class="layout-header">
      <h1>Header</h1>
      <nav>
        <a href="#">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </nav>
    </header>
    <main class="layout-main">
      <h2>Main Content</h2>
      <p>Your main content goes here...</p>
    </main>
    <footer class="layout-footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
    </footer>
  </div>
</body>
</html>`;
    }
  };

  const currentCode = useMemo(() => {
    return generateCode(layoutType, codeLanguage, config);
  }, [layoutType, codeLanguage, config]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopiedCode('code');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const layoutTypes: { type: LayoutType; label: string; icon: React.ReactNode }[] = [
    { type: 'sidebar', label: 'Sidebar', icon: <Sidebar size={20} /> },
    { type: 'dashboard', label: 'Dashboard', icon: <Layout size={20} /> },
    { type: 'card-grid', label: 'Card Grid', icon: <Grid size={20} /> },
    { type: 'centered', label: 'Centered', icon: <Layout size={20} /> },
    { type: 'split-screen', label: 'Split Screen', icon: <Columns size={20} /> },
    { type: 'header-footer', label: 'Header & Footer', icon: <Layout size={20} /> },
  ];

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Layout className="text-blue-500" size={32} />
            <h1 className="text-4xl font-bold">Layout Generator</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Generate responsive layouts with customizable options. Copy code for React, Vue, or HTML.
          </p>
        </div>

        {/* Layout Type Selection */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-4">
            Select Layout Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {layoutTypes.map(({ type, label, icon }) => (
              <button
                key={type}
                onClick={() => setLayoutType(type)}
                className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  layoutType === type
                    ? 'bg-blue-600 text-white'
                    : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                }`}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Configuration Options */}
        {(layoutType === 'sidebar' || layoutType === 'dashboard' || layoutType === 'header-footer') && (
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Configuration Options
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {layoutType === 'sidebar' && (
                <div>
                  <label className="block text-xs text-gray-400 mb-2">Sidebar Width</label>
                  <input
                    type="text"
                    value={config.sidebarWidth}
                    onChange={(e) => setConfig({ ...config, sidebarWidth: e.target.value })}
                    className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                    placeholder="250px"
                  />
                </div>
              )}
              {(layoutType === 'dashboard' || layoutType === 'header-footer') && (
                <>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Header Height</label>
                    <input
                      type="text"
                      value={config.headerHeight}
                      onChange={(e) => setConfig({ ...config, headerHeight: e.target.value })}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      placeholder="64px"
                    />
                  </div>
                  {layoutType === 'header-footer' && (
                    <div>
                      <label className="block text-xs text-gray-400 mb-2">Footer Height</label>
                      <input
                        type="text"
                        value={config.footerHeight}
                        onChange={(e) => setConfig({ ...config, footerHeight: e.target.value })}
                        className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        placeholder="64px"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {layoutType === 'card-grid' && (
          <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-4">
              Grid Configuration
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-2">Number of Columns</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={config.columns}
                  onChange={(e) => setConfig({ ...config, columns: parseInt(e.target.value) || 3 })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Gap</label>
                <input
                  type="text"
                  value={config.gap}
                  onChange={(e) => setConfig({ ...config, gap: e.target.value })}
                  className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                  placeholder="1rem"
                />
              </div>
            </div>
          </div>
        )}

        {/* Code Language Selection */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-300">
              Code Language
            </label>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              {copiedCode === 'code' ? (
                <>
                  <Check size={16} />
                  Copied!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  Copy Code
                </>
              )}
            </button>
          </div>
          <div className="flex gap-2">
            {(['react', 'vue', 'html'] as CodeLanguage[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setCodeLanguage(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  codeLanguage === lang
                    ? 'bg-blue-600 text-white'
                    : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                }`}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Generated Code</h3>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-2 px-3 py-1 bg-dark-bg border border-dark-border rounded hover:bg-dark-border transition-colors text-sm"
            >
              {copiedCode === 'code' ? (
                <>
                  <Check size={14} className="text-green-400" />
                  <span className="text-green-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-dark-bg border border-dark-border rounded p-4 overflow-x-auto">
            <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
              {currentCode}
            </pre>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-dark-surface border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">About Layout Generator</h3>
          <div className="text-gray-400 space-y-2 text-sm">
            <p>
              This tool generates responsive layout code for your projects. All layouts are mobile-friendly and use modern CSS techniques like Flexbox and Grid.
            </p>
            <p>
              <strong>Features:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>6 different layout types to choose from</li>
              <li>Customizable dimensions and spacing</li>
              <li>Code generation for React, Vue, and HTML</li>
              <li>Responsive and mobile-friendly</li>
              <li>Copy code with one click</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutGeneratorPage;

