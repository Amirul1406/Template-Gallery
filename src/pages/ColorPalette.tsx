import { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Copy, Check, RefreshCw, Palette, Upload, Image as ImageIcon, X, ZoomIn, Clipboard } from 'lucide-react';

type ColorScheme = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic';

interface PickedColor {
  hex: string;
  rgb: { r: number; g: number; b: number };
  hsl: { h: number; s: number; l: number };
  x: number;
  y: number;
}

const ColorPalettePage = () => {
  const [baseColor, setBaseColor] = useState('#3b82f6');
  const [scheme, setScheme] = useState<ColorScheme>('complementary');
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  
  // Image color picker states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [pickedColors, setPickedColors] = useState<PickedColor[]>([]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [magnifierColor, setMagnifierColor] = useState<string>('#000000');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const src = event.target?.result as string;
        setImageSrc(src);
        setPickedColors([]);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle paste from clipboard
  const handlePaste = useCallback(async (e: ClipboardEvent) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const src = event.target?.result as string;
            setImageSrc(src);
            setPickedColors([]);
          };
          reader.readAsDataURL(blob);
        }
        break;
      }
    }
  }, []);

  // Set up paste event listener
  useEffect(() => {
    const handlePasteEvent = (e: ClipboardEvent) => {
      handlePaste(e);
    };

    window.addEventListener('paste', handlePasteEvent);
    return () => {
      window.removeEventListener('paste', handlePasteEvent);
    };
  }, [handlePaste]);

  // Draw image on canvas
  const drawImageOnCanvas = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = containerRef.current;
    if (!container) return;

    const maxWidth = container.clientWidth;
    const maxHeight = 600;

    let width = img.width;
    let height = img.height;

    // Scale to fit container
    if (width > maxWidth) {
      height = (height * maxWidth) / width;
      width = maxWidth;
    }
    if (height > maxHeight) {
      width = (width * maxHeight) / height;
      height = maxHeight;
    }

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(img, 0, 0, width, height);
    }
  }, []);

  // Handle image load
  const handleImageLoad = () => {
    if (imageRef.current) {
      drawImageOnCanvas(imageRef.current);
    }
  };

  // Get color from canvas at position
  const getColorAtPosition = (x: number, y: number): PickedColor | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const canvasX = Math.floor((x - rect.left) * scaleX);
    const canvasY = Math.floor((y - rect.top) * scaleY);

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
    const [r, g, b] = imageData.data;

    const hex = rgbToHex({ r, g, b });
    const hsl = rgbToHsl({ r, g, b });

    return {
      hex,
      rgb: { r, g, b },
      hsl,
      x: canvasX,
      y: canvasY,
    };
  };

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorAtPosition(e.clientX, e.clientY);
    if (color) {
      setPickedColors((prev) => [...prev, color]);
      setBaseColor(color.hex);
    }
  };

  // Handle canvas mouse move (for magnifier)
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorAtPosition(e.clientX, e.clientY);
    if (color) {
      setMagnifierColor(color.hex);
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        setMagnifierPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  // Remove picked color
  const removePickedColor = (index: number) => {
    setPickedColors((prev) => prev.filter((_, i) => i !== index));
  };

  // Use picked color as base
  const usePickedColor = (color: PickedColor) => {
    setBaseColor(color.hex);
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
            Generate beautiful color combinations for your projects. Choose a base color, pick colors from images (upload or paste screenshots), and explore different color schemes.
          </p>
        </div>

        {/* Image Color Picker Section */}
        <div className="bg-dark-surface border border-dark-border rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ImageIcon className="text-blue-400" size={24} />
              <h2 className="text-xl font-semibold">Image Color Picker</h2>
            </div>
            <div className="flex items-center gap-2">
              <label className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                <Upload size={18} />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
              {imageSrc && (
                <button
                  onClick={() => {
                    setImageSrc(null);
                    setPickedColors([]);
                  }}
                  className="px-4 py-2 bg-dark-bg border border-dark-border hover:bg-dark-border rounded-lg transition-colors flex items-center gap-2"
                >
                  <X size={18} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {imageSrc ? (
            <div className="space-y-4">
              <div
                ref={containerRef}
                className="relative border border-dark-border rounded-lg overflow-hidden bg-dark-bg"
                onMouseEnter={() => setShowMagnifier(true)}
                onMouseLeave={() => setShowMagnifier(false)}
              >
                <img
                  ref={imageRef}
                  src={imageSrc}
                  alt="Color picker"
                  onLoad={handleImageLoad}
                  className="max-w-full h-auto block"
                  style={{ display: 'none' }}
                />
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  className="w-full h-auto cursor-crosshair block"
                />
                
                {/* Magnifier */}
                {showMagnifier && (
                  <div
                    className="absolute pointer-events-none z-10"
                    style={{
                      left: `${magnifierPos.x}px`,
                      top: `${magnifierPos.y}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div className="bg-black/80 rounded-lg p-2 border border-white/20">
                      <div
                        className="w-8 h-8 rounded border-2 border-white"
                        style={{ backgroundColor: magnifierColor }}
                      />
                      <div className="text-xs text-white mt-1 text-center font-mono">
                        {magnifierColor}
                      </div>
                    </div>
                  </div>
                )}

                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm">
                  Click on the image to pick colors
                </div>
              </div>

              {/* Picked Colors Display */}
              {pickedColors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">Picked Colors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pickedColors.map((color, index) => (
                      <div
                        key={index}
                        className="bg-dark-bg border border-dark-border rounded-lg overflow-hidden hover:border-blue-500 transition-all group"
                      >
                        <div
                          className="h-24 w-full cursor-pointer"
                          style={{ backgroundColor: color.hex }}
                          onClick={() => usePickedColor(color)}
                        />
                        <div className="p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-mono text-gray-300">{color.hex}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removePickedColor(index);
                              }}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          <div className="text-xs text-gray-500 space-y-1">
                            <div>RGB: {color.rgb.r}, {color.rgb.g}, {color.rgb.b}</div>
                            <div>HSL: {Math.round(color.hsl.h)}°, {Math.round(color.hsl.s)}%, {Math.round(color.hsl.l)}%</div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(color.hex);
                            }}
                            className="mt-2 w-full px-2 py-1 text-xs bg-dark-surface hover:bg-dark-border rounded transition-colors flex items-center justify-center gap-1"
                          >
                            {copiedColor === color.hex ? (
                              <>
                                <Check size={14} className="text-green-400" />
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
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border-2 border-dashed border-dark-border rounded-lg p-12 text-center">
              <ImageIcon className="mx-auto text-gray-500 mb-4" size={48} />
              <p className="text-gray-400 mb-2">Upload an image or paste a screenshot to pick colors from it</p>
              <p className="text-gray-500 text-sm mb-6">Press <kbd className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-xs">Ctrl+V</kbd> or <kbd className="px-2 py-1 bg-dark-bg border border-dark-border rounded text-xs">Cmd+V</kbd> to paste</p>
              <div className="flex items-center justify-center gap-3">
                <label className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors flex items-center gap-2">
                  <Upload size={18} />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={async () => {
                    try {
                      const clipboardItems = await navigator.clipboard.read();
                      for (const item of clipboardItems) {
                        for (const type of item.types) {
                          if (type.startsWith('image/')) {
                            const blob = await item.getType(type);
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const src = event.target?.result as string;
                              setImageSrc(src);
                              setPickedColors([]);
                            };
                            reader.readAsDataURL(blob);
                            return;
                          }
                        }
                      }
                    } catch (err) {
                      console.error('Failed to read clipboard:', err);
                    }
                  }}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <Clipboard size={18} />
                  Paste from Clipboard
                </button>
              </div>
            </div>
          )}
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
