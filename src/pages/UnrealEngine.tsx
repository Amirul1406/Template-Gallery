import { useState, useEffect, useCallback, useRef } from 'react';
import { BookOpen, Camera, FolderTree, Code, Palette, Monitor, X, ZoomIn, ZoomOut, Maximize2, ChevronDown } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  order: number; // For ordering
}

// Reordered: Project Organization → Orbit Camera Setup → UI → Materials → Camera Implementation
const docs: DocItem[] = [
  {
    id: 'project-organization',
    title: 'Project Organization',
    description: 'Best practices for organizing Unreal Engine projects',
    icon: <FolderTree className="w-6 h-6" />,
    path: '/docs/unreal-engine/project-organization.md',
    order: 1
  },
  {
    id: 'orbit-camera-setup',
    title: 'Orbit Camera Setup',
    description: 'Complete step-by-step guide to setting up an Orbit Camera system in Unreal Engine 5',
    icon: <Camera className="w-6 h-6" />,
    path: '/docs/unreal-engine/orbit-camera-setup.md',
    order: 2
  },
  {
    id: 'ui-hud-guide',
    title: 'UI & HUD Guide',
    description: 'Build showroom-ready widgets, bind camera data, and add HUD buttons',
    icon: <Monitor className="w-6 h-6" />,
    path: '/docs/unreal-engine/ui-hud-guide.md',
    order: 3
  },
  {
    id: 'materials-and-lighting',
    title: 'Materials and Lighting',
    description: 'Complete guide to creating materials and setting up lighting for your showroom',
    icon: <Palette className="w-6 h-6" />,
    path: '/docs/unreal-engine/materials-and-lighting.md',
    order: 4
  },
  {
    id: 'camera-implementation',
    title: 'Camera Implementation',
    description: 'Technical explanation of how the Orbit Camera system works',
    icon: <Code className="w-6 h-6" />,
    path: '/docs/unreal-engine/camera-implementation.md',
    order: 5
  }
].sort((a, b) => a.order - b.order);

interface Section {
  id: string;
  title: string;
  level: number; // 2 for h2, 3 for h3
}

interface ParsedContent {
  textContent: JSX.Element[];
  codeBlocks: Array<{ language: string; code: string; id: string; section?: string }>;
  sections: Section[];
}

export default function UnrealEngine() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [parsedContent, setParsedContent] = useState<ParsedContent>({ textContent: [], codeBlocks: [], sections: [] });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});
  
  // Image modal state
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Resizable columns state
  const [sidebarWidth, setSidebarWidth] = useState(20); // Percentage
  const [codeWidth, setCodeWidth] = useState(40); // Percentage
  const [isResizingSidebar, setIsResizingSidebar] = useState(false);
  const [isResizingCode, setIsResizingCode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const codeBlockRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [highlightedCodeId, setHighlightedCodeId] = useState<string | null>(null);

  const openModal = useCallback((src: string, alt: string) => {
    setModalImage({ src, alt });
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  }, []);

  const loadDocument = useCallback(async (doc: DocItem) => {
    setLoading(true);
    setSelectedDoc(doc);
    setHighlightedCodeId(null); // Reset highlight when loading new doc
    setOpenDropdown(null); // Close any open dropdowns
    codeBlockRefs.current = {}; // Reset refs
    sectionRefs.current = {}; // Reset section refs
    try {
      const response = await fetch(doc.path);
      if (response.ok) {
        const text = await response.text();
        const parsed = parseMarkdown(text, openModal);
        setParsedContent(parsed);
      } else {
        setParsedContent({ textContent: [], codeBlocks: [], sections: [] });
      }
    } catch (error) {
      setParsedContent({ textContent: [], codeBlocks: [], sections: [] });
    } finally {
      setLoading(false);
    }
  }, [openModal]);

  // Scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    // Try to find the element by ID
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Close dropdown after clicking
      setOpenDropdown(null);
    }
  }, []);

  // Toggle dropdown
  const toggleDropdown = useCallback((docId: string) => {
    setOpenDropdown(prev => prev === docId ? null : docId);
  }, []);

  // Load first document on mount
  useEffect(() => {
    if (docs[0] && !selectedDoc) {
      loadDocument(docs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalImage) {
        closeModal();
      } else if (e.key === 'Escape' && openDropdown) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [modalImage, openDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!openDropdown) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.sidebar-dropdown-container')) {
        setOpenDropdown(null);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown]);

  // Handle mouse wheel zoom
  useEffect(() => {
    if (!modalImage) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => Math.max(0.5, Math.min(5, prev + delta)));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [modalImage]);

  const closeModal = () => {
    setModalImage(null);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(5, prev + 0.25));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - imagePosition.x, y: e.clientY - imagePosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setImagePosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Resize handlers for columns
  const handleSidebarResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingSidebar(true);
  };

  const handleCodeResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizingCode(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isResizingSidebar && containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const newWidth = ((e.clientX - container.getBoundingClientRect().left) / containerWidth) * 100;
        // Constrain between 15% and 35%
        setSidebarWidth(Math.max(15, Math.min(35, newWidth)));
      } else if (isResizingCode && containerRef.current) {
        const container = containerRef.current;
        const containerWidth = container.offsetWidth;
        const rightEdge = container.getBoundingClientRect().right;
        const newWidth = ((rightEdge - e.clientX) / containerWidth) * 100;
        // Constrain between 20% and 50%
        setCodeWidth(Math.max(20, Math.min(50, newWidth)));
      }
    };

    const handleMouseUp = () => {
      setIsResizingSidebar(false);
      setIsResizingCode(false);
    };

    if (isResizingSidebar || isResizingCode) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isResizingSidebar, isResizingCode]);

  return (
    <div className="min-h-screen bg-dark-bg text-white py-6 sm:py-8">
      <style>{`
        /* Custom thin, semi-transparent scrollbar for vertical scrolling */
        #code-examples-container::-webkit-scrollbar,
        #code-examples-container-mobile::-webkit-scrollbar,
        .sidebar-dropdown-container .max-h-64::-webkit-scrollbar,
        .unreal-sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        
        #code-examples-container::-webkit-scrollbar-track,
        #code-examples-container-mobile::-webkit-scrollbar-track,
        .sidebar-dropdown-container .max-h-64::-webkit-scrollbar-track,
        .unreal-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        
        #code-examples-container::-webkit-scrollbar-thumb,
        #code-examples-container-mobile::-webkit-scrollbar-thumb,
        .sidebar-dropdown-container .max-h-64::-webkit-scrollbar-thumb,
        .unreal-sidebar-scroll::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }
        
        #code-examples-container::-webkit-scrollbar-thumb:hover,
        #code-examples-container-mobile::-webkit-scrollbar-thumb:hover,
        .sidebar-dropdown-container .max-h-64::-webkit-scrollbar-thumb:hover,
        .unreal-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
        
        /* Custom thin, semi-transparent scrollbar for horizontal scrolling */
        pre.overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        
        pre.overflow-x-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        pre.overflow-x-auto::-webkit-scrollbar-thumb {
          background: rgba(148, 163, 184, 0.3);
          border-radius: 3px;
        }
        
        pre.overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: rgba(148, 163, 184, 0.5);
        }
        
        /* Firefox scrollbar */
        #code-examples-container,
        #code-examples-container-mobile,
        .sidebar-dropdown-container .max-h-64,
        .unreal-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
        }
        
        pre.overflow-x-auto {
          scrollbar-width: thin;
          scrollbar-color: rgba(148, 163, 184, 0.3) transparent;
        }
      `}</style>
      <div ref={containerRef} className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-blue-400" />
            <h1 className="text-2xl sm:text-3xl font-bold">Unreal Engine Documentation</h1>
          </div>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Start with Project Organization, then follow the guides in order
          </p>
        </div>

        {/* Resizable 3-Column Layout */}
        <div className="hidden lg:flex gap-6 relative">
          {/* Left Column - Navigation Sidebar */}
          <div 
            className="flex-shrink-0"
            style={{ width: `${sidebarWidth}%` }}
          >
            <div className="bg-dark-surface border border-dark-border rounded-lg p-5 lg:p-6 sticky top-20 h-fit">
              <h2 className="text-lg lg:text-xl font-semibold mb-3 lg:mb-4">Getting Started</h2>
              <div className="space-y-2 unreal-sidebar-scroll max-h-[calc(100vh-200px)] overflow-y-auto pr-1">
                {docs.map((doc, index) => {
                  const isSelected = selectedDoc?.id === doc.id;
                  const isDropdownOpen = openDropdown === doc.id;
                  const sections = isSelected ? parsedContent.sections : [];
                  
                  return (
                    <div key={doc.id} className="relative sidebar-dropdown-container">
                      <button
                        onClick={() => {
                          if (isSelected && sections.length > 0) {
                            toggleDropdown(doc.id);
                          } else {
                            loadDocument(doc);
                          }
                        }}
                        className={`w-full text-left px-3 py-3 lg:p-4 rounded-lg border transition-all ${
                          isSelected
                            ? 'bg-blue-500/20 border-blue-500 text-white'
                            : 'bg-dark-bg border-dark-border text-gray-300 hover:border-blue-500/50 hover:text-white'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-semibold">
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="font-semibold mb-1 text-sm">{doc.title}</h3>
                              {isSelected && sections.length > 0 && (
                                <ChevronDown 
                                  className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${
                                    isDropdownOpen ? 'rotate-180' : ''
                                  }`} 
                                />
                              )}
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-2">{doc.description}</p>
                          </div>
                        </div>
                      </button>
                      
                      {/* Dropdown Menu */}
                      {isDropdownOpen && sections.length > 0 && (
                        <div className="mt-1 ml-2 border-l-2 border-blue-500/30 pl-3 space-y-1 max-h-64 overflow-y-auto">
                          {sections.map((section) => (
                            <button
                              key={section.id}
                              onClick={() => scrollToSection(section.id)}
                              className="w-full text-left px-3 py-2 text-xs text-gray-400 hover:text-white hover:bg-blue-500/10 rounded transition-colors"
                              style={{ paddingLeft: `${(section.level - 2) * 12 + 12}px` }}
                            >
                              {section.title}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Resize Handle for Sidebar */}
          <div
            className="w-1 bg-dark-border hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0 relative group"
            onMouseDown={handleSidebarResizeStart}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-0.5 h-8 bg-blue-500 rounded" />
            </div>
          </div>

          {/* Middle Column - Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-5 lg:p-8 min-h-[500px] lg:min-h-[600px]">
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : parsedContent.textContent.length > 0 ? (
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-dark-bg prose-pre:border prose-pre:border-dark-border prose-pre:hidden">
                  {parsedContent.textContent}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">Select a Guide</h2>
                  <p>Choose a documentation guide from the sidebar to get started</p>
                </div>
              )}
            </div>
          </div>

          {/* Resize Handle for Code Section */}
          <div
            className="w-1 bg-dark-border hover:bg-blue-500 cursor-col-resize transition-colors flex-shrink-0 relative group"
            onMouseDown={handleCodeResizeStart}
          >
            <div className="absolute inset-y-0 -left-1 -right-1" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-0.5 h-8 bg-blue-500 rounded" />
            </div>
          </div>

          {/* Right Column - Code Blocks */}
          <div 
            className="flex-shrink-0"
            style={{ width: `${codeWidth}%` }}
          >
            <div className="bg-dark-surface border border-dark-border rounded-lg p-5 lg:p-6 sticky top-20 h-fit max-h-[calc(100vh-120px)]">
              <h2 className="text-base lg:text-lg font-semibold mb-3 lg:mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Code Examples
              </h2>
              {parsedContent.codeBlocks.length > 0 ? (
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto" id="code-examples-container">
                  {parsedContent.codeBlocks.map((block) => {
                    const isHighlighted = highlightedCodeId === block.id;
                    
                    return (
                      <div
                        key={block.id}
                        id={block.id}
                        ref={(el) => {
                          codeBlockRefs.current[block.id] = el;
                        }}
                        className={`bg-dark-bg border rounded-lg p-4 transition-all ${
                          isHighlighted
                            ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                            : 'border-dark-border'
                        }`}
                      >
                        {block.section && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-gray-400 bg-dark-surface px-2 py-1 rounded">
                              {block.section}
                            </span>
                          </div>
                        )}
                        <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words">
                          <code className="text-gray-300">{block.code}</code>
                        </pre>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <Code className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">No code examples in this section</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Layout (fallback) */}
        <div className="lg:hidden space-y-5">
          {/* Navigation Sidebar */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-5">
            <h2 className="text-lg font-semibold mb-3">Getting Started</h2>
            <div className="space-y-2">
              {docs.map((doc, index) => (
                  <button
                    key={doc.id}
                    onClick={() => loadDocument(doc)}
                    className={`w-full text-left px-3 py-3 rounded-lg border transition-all ${
                      selectedDoc?.id === doc.id
                        ? 'bg-blue-500/20 border-blue-500 text-white'
                        : 'bg-dark-bg border-dark-border text-gray-300 hover:border-blue-500/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400 font-semibold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 text-sm">{doc.title}</h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{doc.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

          {/* Content */}
            <div className="bg-dark-surface border border-dark-border rounded-lg p-5 min-h-[400px]">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : parsedContent.textContent.length > 0 ? (
              <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-dark-bg prose-pre:border prose-pre:border-dark-border prose-pre:hidden">
                {parsedContent.textContent}
          </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">Select a Guide</h2>
                  <p>Choose a documentation guide from the sidebar to get started</p>
                </div>
            )}
          </div>

          {/* Code Blocks */}
          <div className="bg-dark-surface border border-dark-border rounded-lg p-5">
            <h2 className="text-base font-semibold mb-3 flex items-center gap-2">
              <Code className="w-5 h-5 text-blue-400" />
              Code Examples
            </h2>
            {parsedContent.codeBlocks.length > 0 ? (
              <div className="space-y-4 max-h-[600px] overflow-y-auto" id="code-examples-container-mobile">
                {parsedContent.codeBlocks.map((block) => {
                  const isHighlighted = highlightedCodeId === block.id;
                  
                  return (
                    <div
                      key={block.id}
                      id={block.id}
                      ref={(el) => {
                        codeBlockRefs.current[block.id] = el;
                      }}
                      className={`bg-dark-bg border rounded-lg p-4 transition-all ${
                        isHighlighted
                          ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                          : 'border-dark-border'
                      }`}
                    >
                      {block.section && (
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-gray-400 bg-dark-surface px-2 py-1 rounded">
                            {block.section}
                          </span>
                        </div>
                      )}
                      <pre className="text-xs overflow-x-auto whitespace-pre-wrap break-words">
                        <code className="text-gray-300">{block.code}</code>
                      </pre>
                    </div>
                  );
                })}
                </div>
              ) : (
              <div className="text-center text-gray-400 py-8">
                <Code className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">No code examples in this section</p>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeModal}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 bg-dark-surface hover:bg-dark-border rounded-lg border border-dark-border transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-dark-surface/90 backdrop-blur-sm rounded-lg p-2 border border-dark-border">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              className="p-2 hover:bg-dark-border rounded transition-colors"
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-300 min-w-[60px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              className="p-2 hover:bg-dark-border rounded transition-colors"
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
              className="p-2 hover:bg-dark-border rounded transition-colors ml-2"
              aria-label="Reset Zoom"
            >
              <Maximize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Image Container */}
          <div
            className="relative max-w-[95vw] max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl select-none"
              style={{
                transform: `scale(${zoomLevel}) translate(${imagePosition.x / zoomLevel}px, ${imagePosition.y / zoomLevel}px)`,
                transformOrigin: 'center center',
                transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              }}
              draggable={false}
            />
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-dark-surface/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-400 border border-dark-border">
            <p>Click outside or press ESC to close • Scroll with Ctrl/Cmd to zoom • Drag when zoomed</p>
      </div>
        </div>
      )}
    </div>
  );
}

// Enhanced Markdown Parser that separates content and code
function parseMarkdown(content: string, openModal: (src: string, alt: string) => void): ParsedContent {
  const lines = content.split('\n');
  const textElements: JSX.Element[] = [];
  const codeBlocks: Array<{ language: string; code: string; id: string; section?: string }> = [];
  const sections: Section[] = [];
  
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent: string[] = [];
  let codeBlockIndex = 0;
  let currentFileName = ''; // Track current file name from headers
  let currentSection = ''; // Track current section (h2 or h3)
  
  // Helper function to create section ID from title
  const createSectionId = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ');
      if (text.trim()) {
        textElements.push(<p key={textElements.length} className="mb-4 text-gray-300 leading-relaxed">{parseInlineMarkdown(text)}</p>);
      }
      currentParagraph = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      const code = codeBlockContent.join('\n');
      // Use file name if available, otherwise use language
      const displayLabel = currentFileName || codeBlockLanguage || 'code';
      const codeId = `code-${codeBlockIndex++}`;
      codeBlocks.push({
        language: displayLabel,
        code: code,
        id: codeId,
        section: currentSection || undefined
      });
      // Don't add placeholder - code blocks only appear in right panel
      codeBlockContent = [];
      codeBlockLanguage = '';
      currentFileName = ''; // Reset after using it
    }
  };

  const parseInlineMarkdown = (text: string): JSX.Element[] => {
    const parts: (string | JSX.Element)[] = [];

    // Bold **text**
    const boldRegex = /\*\*(.+?)\*\*/g;
    let match;
    const boldMatches: Array<{ start: number; end: number; text: string }> = [];
    while ((match = boldRegex.exec(text)) !== null) {
      boldMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
    }

    // Code `code`
    const codeRegex = /`(.+?)`/g;
    const codeMatches: Array<{ start: number; end: number; text: string }> = [];
    while ((match = codeRegex.exec(text)) !== null) {
      codeMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1] });
    }

    // Links [text](url)
    const linkRegex = /\[(.+?)\]\((.+?)\)/g;
    const linkMatches: Array<{ start: number; end: number; text: string; url: string }> = [];
    while ((match = linkRegex.exec(text)) !== null) {
      linkMatches.push({ start: match.index, end: match.index + match[0].length, text: match[1], url: match[2] });
    }

    // Images ![alt text](url)
    const imageRegex = /!\[(.+?)\]\((.+?)\)/g;
    const imageMatches: Array<{ start: number; end: number; alt: string; url: string }> = [];
    while ((match = imageRegex.exec(text)) !== null) {
      imageMatches.push({ start: match.index, end: match.index + match[0].length, alt: match[1], url: match[2] });
    }

    // Combine all matches and sort by position
    const allMatches = [
      ...boldMatches.map(m => ({ ...m, type: 'bold' as const })),
      ...codeMatches.map(m => ({ ...m, type: 'code' as const })),
      ...linkMatches.map(m => ({ ...m, type: 'link' as const })),
      ...imageMatches.map(m => ({ ...m, type: 'image' as const }))
    ].sort((a, b) => a.start - b.start);

    let lastIndex = 0;
    for (const match of allMatches) {
      if (match.start > lastIndex) {
        parts.push(text.substring(lastIndex, match.start));
      }
      const key = `match-${lastIndex}`;
      if (match.type === 'bold') {
        parts.push(<strong key={key} className="text-white font-semibold">{(match as any).text}</strong>);
      } else if (match.type === 'code') {
        parts.push(<code key={key} className="bg-dark-bg px-1.5 py-0.5 rounded text-blue-400 text-sm break-all whitespace-normal">{(match as any).text}</code>);
      } else if (match.type === 'link') {
        parts.push(<a key={key} href={(match as any).url} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{(match as any).text}</a>);
      } else if (match.type === 'image') {
        parts.push(
          <img
            key={key}
            src={(match as any).url}
            alt={(match as any).alt}
            className="max-w-full h-auto rounded-lg my-4 border border-dark-border cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal((match as any).url, (match as any).alt)}
          />
        );
      }
      lastIndex = match.end;
    }
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts as JSX.Element[] : [<>{text}</>];
  };

  lines.forEach((line, index) => {
    // Code blocks
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        inCodeBlock = true;
        codeBlockLanguage = line.substring(3).trim();
      }
      return;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      return;
    }

    // Headers
    if (line.startsWith('# ')) {
      flushParagraph();
      textElements.push(<h1 key={index} className="text-3xl font-bold mb-4 mt-6 text-white">{line.substring(2)}</h1>);
      return;
    }
    if (line.startsWith('## ')) {
      flushParagraph();
      const sectionTitle = line.substring(3);
      currentSection = sectionTitle; // Update current section
      const sectionId = createSectionId(sectionTitle);
      sections.push({ id: sectionId, title: sectionTitle, level: 2 });
      textElements.push(
        <h2 
          key={index} 
          id={sectionId}
          className="text-2xl font-semibold mb-3 mt-6 text-white scroll-mt-20"
        >
          {sectionTitle}
        </h2>
      );
      return;
    }
    if (line.startsWith('### ')) {
      flushParagraph();
      const headerText = line.substring(4);
      // Use h3 as section if no h2 section is set, or combine them
      if (!currentSection) {
        currentSection = headerText;
      }
      // Check if this is a file header (contains 📄 emoji or common file patterns)
      const fileHeaderMatch = headerText.match(/📄\s*(.+?)(?:\s|$)/) || headerText.match(/(\w+\.(h|cpp|cs|ts|js|json|md|txt|ini|config))(?:\s|$)/i);
      if (fileHeaderMatch) {
        // Extract filename (remove emoji and extra text)
        currentFileName = fileHeaderMatch[1] || fileHeaderMatch[0];
        // Clean up filename (remove common prefixes like "Place this file in:")
        currentFileName = currentFileName.replace(/^Place this file in:?\s*/i, '').trim();
        // Extract just the filename if it's a path
        const pathMatch = currentFileName.match(/([^\/\\]+\.(h|cpp|cs|ts|js|json|md|txt|ini|config))$/i);
        if (pathMatch) {
          currentFileName = pathMatch[1];
        }
      }
      // Only add h3 as section if it's not a file header
      if (!fileHeaderMatch) {
        const sectionId = createSectionId(headerText);
        sections.push({ id: sectionId, title: headerText, level: 3 });
        textElements.push(
          <h3 
            key={index} 
            id={sectionId}
            className="text-xl font-semibold mb-2 mt-4 text-white scroll-mt-20"
          >
            {headerText}
          </h3>
        );
      } else {
        textElements.push(<h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-white">{headerText}</h3>);
      }
      return;
    }

    // Lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph();
      const listItem = line.substring(2);
      textElements.push(<li key={index} className="mb-2 text-gray-300 ml-6 list-disc">{parseInlineMarkdown(listItem)}</li>);
      return;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line)) {
      flushParagraph();
      const listItem = line.replace(/^\d+\.\s/, '');
      textElements.push(<li key={index} className="mb-2 text-gray-300 ml-6 list-decimal">{parseInlineMarkdown(listItem)}</li>);
      return;
    }

    // Images (block-level) ![alt text](url)
    const imageBlockRegex = /^!\[(.+?)\]\((.+?)\)$/;
    const imageMatch = line.match(imageBlockRegex);
    if (imageMatch) {
      flushParagraph();
      textElements.push(
        <div key={index} className="my-6">
          <img 
            src={imageMatch[2]} 
            alt={imageMatch[1]} 
            className="w-full h-auto rounded-lg border border-dark-border shadow-lg cursor-pointer hover:opacity-90 transition-opacity" 
            onClick={() => openModal(imageMatch[2], imageMatch[1])}
          />
          {imageMatch[1] && imageMatch[1] !== imageMatch[2] && (
            <p className="text-sm text-gray-400 mt-2 text-center italic">{imageMatch[1]}</p>
          )}
        </div>
      );
      return;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushParagraph();
      textElements.push(<hr key={index} className="my-6 border-dark-border" />);
      return;
    }

    // Empty line
    if (line.trim() === '') {
      flushParagraph();
      return;
    }

    // Regular paragraph
    currentParagraph.push(line);
  });

  flushParagraph();
  flushCodeBlock();

  return { textContent: textElements, codeBlocks, sections };
}
