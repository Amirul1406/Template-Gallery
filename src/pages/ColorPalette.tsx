import { useState, useMemo } from 'react';
import { Copy, Check, RefreshCw, Palette } from 'lucide-react';

type ColorScheme = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic';

interface ColorPalette {
  colors: string[];
  scheme: ColorScheme;
}

const ColorPalettePage = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [scheme, setScheme] = useState<ColorScheme>('complementary');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const generatePalette = (color: string, schemeType: ColorScheme): string[] => {
    const rgb = hexToRgb(color);
    if (!rgb) return [color];

    switch (schemeType) {
      case 'complementary':
        return [color, rgbToHex(complementaryColor(rgb))];
      
      case 'analogous':
        return [
          color,
          rgbToHex(rotateHue(rgb, 30)),
          rgbToHex(rotateHue(rgb, -30)),
        ];
      
      case 'triadic':
        return [
          color,
          rgbToHex(rotateHue(rgb, 120)),
          rgbToHex(rotateHue(rgb, 240)),
        ];
      
      case 'tetradic':
        return [
          color,
          rgbToHex(rotateHue(rgb, 90)),
          rgbToHex(rotateHue(rgb, 180)),
          rgbToHex(rotateHue(rgb, 270)),
        ];
      
      case 'monochromatic':
        return [
          lightenColor(color, 0.3),
          lightenColor(color, 0.15),
          color,
          darkenColor(color, 0.15),
          darkenColor(color, 0.3),
        ];
      
      default:
        return [color];
    }
  };

  const palette = useMemo(() => {
    return generatePalette(baseColor, scheme);
  }, [baseColor, scheme]);

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const randomColor = () => {
    const colors = [
      '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
      '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
    ];
    setBaseColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Palette className="text-blue-500" size={32} />
            <h1 className="text-4xl font-bold">Color Palette Generator</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Generate beautiful color combinations for your projects. Choose a base color and explore different color schemes.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Base Color
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-20 h-20 rounded-lg cursor-pointer border-2 border-dark-border"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-500"
                    placeholder="#3b82f6"
                  />
                </div>
                <button
                  onClick={randomColor}
                  className="px-4 py-2 bg-dark-bg border border-dark-border rounded-lg hover:bg-dark-border transition-colors flex items-center gap-2"
                  title="Random Color"
                >
                  <RefreshCw size={18} />
                </button>
              </div>
            </div>

            {/* Scheme Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Color Scheme
              </label>
              <select
                value={scheme}
                onChange={(e) => setScheme(e.target.value as ColorScheme)}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="complementary">Complementary</option>
                <option value="analogous">Analogous</option>
                <option value="triadic">Triadic</option>
                <option value="tetradic">Tetradic</option>
                <option value="monochromatic">Monochromatic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Color Palette Display */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            {scheme.charAt(0).toUpperCase() + scheme.slice(1)} Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {palette.map((color, index) => (
              <div
                key={`${color}-${index}`}
                className="group relative bg-dark-surface border border-dark-border rounded-lg overflow-hidden hover:border-blue-500 transition-all cursor-pointer"
                onClick={() => copyToClipboard(color)}
              >
                <div
                  className="h-32 w-full"
                  style={{ backgroundColor: color }}
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-gray-300">{color}</span>
                    {copiedColor === color ? (
                      <Check size={16} className="text-green-400" />
                    ) : (
                      <Copy size={16} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500">
                    {copiedColor === color ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheme Information */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">About {scheme.charAt(0).toUpperCase() + scheme.slice(1)} Scheme</h3>
          <div className="text-gray-400 space-y-2">
            {scheme === 'complementary' && (
              <p>Complementary colors are opposite each other on the color wheel. They create high contrast and vibrant combinations perfect for highlighting important elements.</p>
            )}
            {scheme === 'analogous' && (
              <p>Analogous colors are next to each other on the color wheel. They create harmonious and pleasing combinations, great for creating a cohesive design.</p>
            )}
            {scheme === 'triadic' && (
              <p>Triadic colors are evenly spaced around the color wheel, forming a triangle. They provide balanced contrast while maintaining harmony.</p>
            )}
            {scheme === 'tetradic' && (
              <p>Tetradic colors form a rectangle on the color wheel. This scheme offers rich color variety and works well for complex designs.</p>
            )}
            {scheme === 'monochromatic' && (
              <p>Monochromatic colors are variations of a single hue with different lightness and saturation. They create elegant, cohesive color schemes.</p>
            )}
          </div>
        </div>

        {/* Predefined Palettes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Popular Color Palettes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {predefinedPalettes.map((palette, index) => (
              <div
                key={index}
                className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden hover:border-blue-500 transition-all cursor-pointer group"
                onClick={() => {
                  setBaseColor(palette.colors[0]);
                  setScheme(palette.scheme);
                }}
              >
                <div className="flex h-20">
                  {palette.colors.map((color, i) => (
                    <div
                      key={i}
                      className="flex-1"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="p-4">
                  <div className="text-sm font-medium mb-2">{palette.name}</div>
                  <div className="flex flex-wrap gap-2">
                    {palette.colors.map((color, i) => (
                      <span
                        key={i}
                        className="text-xs font-mono text-gray-400"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Utility Functions
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(rgb: { r: number; g: number; b: number }): string {
  return `#${[rgb.r, rgb.g, rgb.b].map((x) => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('')}`;
}

function rgbToHsl(rgb: { r: number; g: number; b: number }): { h: number; s: number; l: number } {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(hsl: { h: number; s: number; l: number }): { r: number; g: number; b: number } {
  const h = hsl.h / 360;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function rotateHue(rgb: { r: number; g: number; b: number }, degrees: number): { r: number; g: number; b: number } {
  const hsl = rgbToHsl(rgb);
  hsl.h = (hsl.h + degrees) % 360;
  if (hsl.h < 0) hsl.h += 360;
  return hslToRgb(hsl);
}

function complementaryColor(rgb: { r: number; g: number; b: number }): { r: number; g: number; b: number } {
  return rotateHue(rgb, 180);
}

function lightenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb);
  hsl.l = Math.min(100, hsl.l + amount * 100);
  return rgbToHex(hslToRgb(hsl));
}

function darkenColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const hsl = rgbToHsl(rgb);
  hsl.l = Math.max(0, hsl.l - amount * 100);
  return rgbToHex(hslToRgb(hsl));
}

const predefinedPalettes: Array<{ name: string; colors: string[]; scheme: ColorScheme }> = [
  {
    name: 'Ocean Breeze',
    colors: ['#0ea5e9', '#06b6d4', '#14b8a6'],
    scheme: 'analogous',
  },
  {
    name: 'Sunset',
    colors: ['#f97316', '#ef4444', '#dc2626'],
    scheme: 'analogous',
  },
  {
    name: 'Forest',
    colors: ['#10b981', '#059669', '#047857'],
    scheme: 'monochromatic',
  },
  {
    name: 'Royal Purple',
    colors: ['#8b5cf6', '#a855f7', '#c084fc'],
    scheme: 'monochromatic',
  },
  {
    name: 'Vibrant Triad',
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
    scheme: 'triadic',
  },
  {
    name: 'Pink & Blue',
    colors: ['#ec4899', '#3b82f6'],
    scheme: 'complementary',
  },
];

export default ColorPalettePage;

