import { useState, useEffect } from 'react';
import { BookOpen, Camera, FolderTree, Code, Palette, Monitor } from 'lucide-react';

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

interface ParsedContent {
  textContent: JSX.Element[];
  codeBlocks: Array<{ language: string; code: string; id: string }>;
}

export default function UnrealEngine() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(docs[0]); // Auto-select first doc
  const [loading, setLoading] = useState(false);
  const [parsedContent, setParsedContent] = useState<ParsedContent>({ textContent: [], codeBlocks: [] });

  const loadDocument = async (doc: DocItem) => {
    setLoading(true);
    setSelectedDoc(doc);
    try {
      const response = await fetch(doc.path);
      if (response.ok) {
        const text = await response.text();
        const parsed = parseMarkdown(text);
        setParsedContent(parsed);
      } else {
        setParsedContent({ textContent: [], codeBlocks: [] });
      }
    } catch (error) {
      setParsedContent({ textContent: [], codeBlocks: [] });
    } finally {
      setLoading(false);
    }
  };

  // Load first document on mount
  useEffect(() => {
    if (docs[0] && !selectedDoc) {
      loadDocument(docs[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg text-white py-8">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Unreal Engine Documentation</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Start with Project Organization, then follow the guides in order
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Navigation Sidebar (1/5) */}
          <div className="lg:col-span-1">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Getting Started</h2>
              <div className="space-y-2">
                {docs.map((doc, index) => (
                  <button
                    key={doc.id}
                    onClick={() => loadDocument(doc)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
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
          </div>

          {/* Middle Column - Content (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-8 min-h-[600px]">
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

          {/* Right Column - Code Blocks (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6 sticky top-20">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Code Examples
              </h2>
              {parsedContent.codeBlocks.length > 0 ? (
                <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  {parsedContent.codeBlocks.map((block) => (
                    <div key={block.id} className="bg-dark-bg border border-dark-border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-blue-400 uppercase">
                          {block.language || 'code'}
                        </span>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(block.code);
                          }}
                          className="text-xs text-gray-400 hover:text-white transition-colors"
                          title="Copy code"
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="text-xs overflow-x-auto">
                        <code className="text-gray-300">{block.code}</code>
                      </pre>
                    </div>
                  ))}
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
      </div>
    </div>
  );
}

// Enhanced Markdown Parser that separates content and code
function parseMarkdown(content: string): ParsedContent {
  const lines = content.split('\n');
  const textElements: JSX.Element[] = [];
  const codeBlocks: Array<{ language: string; code: string; id: string }> = [];
  
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent: string[] = [];
  let codeBlockIndex = 0;

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
      codeBlocks.push({
        language: codeBlockLanguage || 'text',
        code: code,
        id: `code-${codeBlockIndex++}`
      });
      // Add placeholder in text content
      textElements.push(
        <div key={textElements.length} className="my-4 p-3 bg-dark-bg border border-dark-border rounded-lg">
          <p className="text-sm text-gray-400 mb-2">
            <Code className="w-4 h-4 inline mr-1" />
            Code example ({codeBlockLanguage || 'text'}) - See right panel →
          </p>
        </div>
      );
      codeBlockContent = [];
      codeBlockLanguage = '';
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

    // Combine all matches and sort by position
    const allMatches = [
      ...boldMatches.map(m => ({ ...m, type: 'bold' as const })),
      ...codeMatches.map(m => ({ ...m, type: 'code' as const })),
      ...linkMatches.map(m => ({ ...m, type: 'link' as const }))
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
        parts.push(<code key={key} className="bg-dark-bg px-1.5 py-0.5 rounded text-blue-400 text-sm">{(match as any).text}</code>);
      } else if (match.type === 'link') {
        parts.push(<a key={key} href={(match as any).url} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">{(match as any).text}</a>);
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
      textElements.push(<h2 key={index} className="text-2xl font-semibold mb-3 mt-6 text-white">{line.substring(3)}</h2>);
      return;
    }
    if (line.startsWith('### ')) {
      flushParagraph();
      textElements.push(<h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-white">{line.substring(4)}</h3>);
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

  return { textContent: textElements, codeBlocks };
}
