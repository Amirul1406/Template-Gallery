import { useState, useMemo } from 'react';
import { Copy, Check, Monitor, Tablet, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

type DevicePreset = 'desktop' | 'tablet' | 'mobile' | 'custom';
type CodeLanguage = 'css' | 'tailwind' | 'react';

interface Breakpoint {
  name: string;
  width: number;
  height: number;
}

const ResponsiveTesterPage = () => {
  const [devicePreset, setDevicePreset] = useState<DevicePreset>('desktop');
  const [customWidth, setCustomWidth] = useState(1920);
  const [customHeight, setCustomHeight] = useState(1080);
  const [codeLanguage, setCodeLanguage] = useState<CodeLanguage>('css');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showBreakpoints, setShowBreakpoints] = useState(true);

  const commonBreakpoints: Breakpoint[] = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 720 },
    { name: 'Desktop Medium', width: 1920, height: 1080 },
    { name: 'Desktop Large', width: 2560, height: 1440 },
  ];

  const devicePresets = {
    desktop: { width: 1920, height: 1080 },
    tablet: { width: 768, height: 1024 },
    mobile: { width: 375, height: 667 },
    custom: { width: customWidth, height: customHeight },
  };

  const currentDimensions = useMemo(() => {
    return devicePresets[devicePreset];
  }, [devicePreset, customWidth, customHeight]);

  const generateBreakpointCode = (lang: CodeLanguage): string => {
    const breakpoints = [
      { name: 'sm', value: 640 },
      { name: 'md', value: 768 },
      { name: 'lg', value: 1024 },
      { name: 'xl', value: 1280 },
      { name: '2xl', value: 1536 },
    ];

    if (lang === 'css') {
      return `/* Mobile First Approach */
/* Base styles (mobile) */
.container {
  padding: 1rem;
  font-size: 14px;
}

/* Small devices (landscape phones, 640px and up) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
    font-size: 16px;
  }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 18px;
  }
}

/* Large devices (desktops, 1024px and up) */
@media (min-width: 1024px) {
  .container {
    padding: 2.5rem;
    font-size: 20px;
  }
}

/* Extra large devices (large desktops, 1280px and up) */
@media (min-width: 1280px) {
  .container {
    padding: 3rem;
    font-size: 22px;
  }
}

/* 2X Large devices (larger desktops, 1536px and up) */
@media (min-width: 1536px) {
  .container {
    padding: 3.5rem;
    font-size: 24px;
  }
}

/* Custom breakpoint for specific width */
@media (min-width: ${currentDimensions.width}px) {
  .container {
    /* Your styles here */
  }
}`;
    } else if (lang === 'tailwind') {
      return `/* Tailwind CSS Breakpoints */
/* 
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  2xl: '1536px',
*/

/* Usage in Tailwind classes */
<div class="
  text-sm p-4
  sm:text-base sm:p-6
  md:text-lg md:p-8
  lg:text-xl lg:p-10
  xl:text-2xl xl:p-12
  2xl:text-3xl 2xl:p-14
">
  Responsive content
</div>

/* Custom breakpoint in tailwind.config.js */
module.exports = {
  theme: {
    extend: {
      screens: {
        'custom': '${currentDimensions.width}px',
      },
    },
  },
}`;
    } else {
      return `import { useState, useEffect } from 'react';

function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const breakpoints = {
    isMobile: windowSize.width < 640,
    isTablet: windowSize.width >= 640 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    isSmall: windowSize.width >= 640,
    isMedium: windowSize.width >= 768,
    isLarge: windowSize.width >= 1024,
    isXLarge: windowSize.width >= 1280,
    is2XLarge: windowSize.width >= 1536,
    custom: windowSize.width >= ${currentDimensions.width},
  };

  return { windowSize, ...breakpoints };
}

// Usage
function MyComponent() {
  const { isMobile, isTablet, isDesktop, windowSize } = useResponsive();

  return (
    <div>
      {isMobile && <div>Mobile View</div>}
      {isTablet && <div>Tablet View</div>}
      {isDesktop && <div>Desktop View</div>}
      <p>Current width: {windowSize.width}px</p>
    </div>
  );
}

export default MyComponent;`;
    }
  };

  const currentCode = useMemo(() => {
    return generateBreakpointCode(codeLanguage);
  }, [codeLanguage, currentDimensions.width]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentCode);
      setCopiedCode('code');
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const setPreset = (preset: DevicePreset) => {
    setDevicePreset(preset);
    if (preset === 'desktop') {
      setCustomWidth(1920);
      setCustomHeight(1080);
    } else if (preset === 'tablet') {
      setCustomWidth(768);
      setCustomHeight(1024);
    } else if (preset === 'mobile') {
      setCustomWidth(375);
      setCustomHeight(667);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="text-blue-500" size={32} />
            <h1 className="text-4xl font-bold">Responsive Breakpoint Tester</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Test your components at different screen sizes and generate responsive code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Device Preset Selection */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <label className="block text-sm font-medium text-gray-300 mb-4">
                Device Preset
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPreset('mobile')}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    devicePreset === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                  }`}
                >
                  <Smartphone size={20} />
                  Mobile
                </button>
                <button
                  onClick={() => setPreset('tablet')}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    devicePreset === 'tablet'
                      ? 'bg-blue-600 text-white'
                      : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                  }`}
                >
                  <Tablet size={20} />
                  Tablet
                </button>
                <button
                  onClick={() => setPreset('desktop')}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    devicePreset === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                  }`}
                >
                  <Monitor size={20} />
                  Desktop
                </button>
              </div>
              <button
                onClick={() => setDevicePreset('custom')}
                className={`w-full mt-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  devicePreset === 'custom'
                    ? 'bg-blue-600 text-white'
                    : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                }`}
              >
                Custom Size
              </button>
            </div>

            {/* Custom Dimensions */}
            {devicePreset === 'custom' && (
              <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
                <label className="block text-sm font-medium text-gray-300 mb-4">
                  Custom Dimensions
                </label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Width (px)</label>
                    <input
                      type="number"
                      value={customWidth}
                      onChange={(e) => setCustomWidth(parseInt(e.target.value) || 1920)}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      min="320"
                      max="3840"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-2">Height (px)</label>
                    <input
                      type="number"
                      value={customHeight}
                      onChange={(e) => setCustomHeight(parseInt(e.target.value) || 1080)}
                      className="w-full px-3 py-2 bg-dark-bg border border-dark-border rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                      min="568"
                      max="2160"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Current Dimensions Display */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-gray-300 mb-4">Current Viewport</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Width:</span>
                  <span className="text-white font-mono">{currentDimensions.width}px</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Height:</span>
                  <span className="text-white font-mono">{currentDimensions.height}px</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Aspect Ratio:</span>
                  <span className="text-white font-mono">
                    {(currentDimensions.width / currentDimensions.height).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Common Breakpoints */}
            {showBreakpoints && (
              <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-300">Common Breakpoints</h3>
                  <button
                    onClick={() => setShowBreakpoints(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <Minimize2 size={16} />
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {commonBreakpoints.map((bp) => (
                    <button
                      key={bp.name}
                      onClick={() => {
                        setCustomWidth(bp.width);
                        setCustomHeight(bp.height);
                        setDevicePreset('custom');
                      }}
                      className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                        currentDimensions.width === bp.width && currentDimensions.height === bp.height
                          ? 'bg-blue-600 text-white'
                          : 'bg-dark-bg text-gray-400 hover:bg-dark-border hover:text-white'
                      }`}
                    >
                      <div className="font-medium">{bp.name}</div>
                      <div className="text-gray-500">
                        {bp.width} × {bp.height}px
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!showBreakpoints && (
              <button
                onClick={() => setShowBreakpoints(true)}
                className="w-full px-4 py-2 bg-dark-surface border border-dark-border rounded-lg text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Maximize2 size={16} />
                Show Breakpoints
              </button>
            )}
          </div>

          {/* Right Column - Preview and Code */}
          <div className="lg:col-span-2 space-y-6">
            {/* Preview Frame */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-gray-300">Preview</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Monitor size={14} />
                  {currentDimensions.width} × {currentDimensions.height}px
                </div>
              </div>
              <div className="bg-dark-bg border border-dark-border rounded-lg overflow-hidden">
                <div
                  className="bg-white mx-auto transition-all duration-300"
                  style={{
                    width: `${Math.min(currentDimensions.width, 800)}px`,
                    height: `${Math.min(currentDimensions.height * 0.6, 600)}px`,
                    maxWidth: '100%',
                  }}
                >
                  <div className="p-6 h-full flex flex-col items-center justify-center text-gray-800">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-2">
                        {currentDimensions.width} × {currentDimensions.height}px
                      </div>
                      <div className="text-sm text-gray-600 mb-4">
                        {devicePreset === 'mobile' && '📱 Mobile View'}
                        {devicePreset === 'tablet' && '📱 Tablet View'}
                        {devicePreset === 'desktop' && '🖥️ Desktop View'}
                        {devicePreset === 'custom' && '⚙️ Custom Size'}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        <div className="bg-gray-100 p-4 rounded">Card 1</div>
                        <div className="bg-gray-100 p-4 rounded">Card 2</div>
                        <div className="bg-gray-100 p-4 rounded">Card 3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Code Generation */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Generated Code
                </label>
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    {(['css', 'tailwind', 'react'] as CodeLanguage[]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setCodeLanguage(lang)}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          codeLanguage === lang
                            ? 'bg-blue-600 text-white'
                            : 'bg-dark-bg border border-dark-border text-gray-300 hover:bg-dark-border'
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-xs"
                  >
                    {copiedCode === 'code' ? (
                      <>
                        <Check size={14} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className="bg-dark-bg border border-dark-border rounded p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                  {currentCode}
                </pre>
              </div>
            </div>

            {/* Info Section */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
              <h3 className="text-sm font-semibold mb-3">Responsive Design Tips</h3>
              <div className="text-gray-400 space-y-2 text-xs">
                <p>
                  <strong>Mobile First:</strong> Design for mobile screens first, then scale up for larger devices.
                </p>
                <p>
                  <strong>Common Breakpoints:</strong> 640px (sm), 768px (md), 1024px (lg), 1280px (xl), 1536px (2xl)
                </p>
                <p>
                  <strong>Test Regularly:</strong> Always test your designs at multiple screen sizes to ensure proper responsiveness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveTesterPage;

