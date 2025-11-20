import { useState } from 'react';
import { BookOpen, Camera, FolderTree, Code } from 'lucide-react';

interface DocItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const docs: DocItem[] = [
  {
    id: 'orbit-camera-setup',
    title: 'Orbit Camera Setup',
    description: 'Complete step-by-step guide to setting up an Orbit Camera system in Unreal Engine 5',
    icon: <Camera className="w-6 h-6" />,
    path: '/docs/unreal-engine/orbit-camera-setup.md'
  },
  {
    id: 'project-organization',
    title: 'Project Organization',
    description: 'Best practices for organizing Unreal Engine projects',
    icon: <FolderTree className="w-6 h-6" />,
    path: '/docs/unreal-engine/project-organization.md'
  },
  {
    id: 'camera-implementation',
    title: 'Camera Implementation',
    description: 'Technical explanation of how the Orbit Camera system works',
    icon: <Code className="w-6 h-6" />,
    path: '/docs/unreal-engine/camera-implementation.md'
  }
];

export default function UnrealEngine() {
  const [selectedDoc, setSelectedDoc] = useState<DocItem | null>(null);
  const [docContent, setDocContent] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const loadDocument = async (doc: DocItem) => {
    setLoading(true);
    setSelectedDoc(doc);
    try {
      const response = await fetch(doc.path);
      if (response.ok) {
        const text = await response.text();
        setDocContent(text);
      } else {
        setDocContent(`# ${doc.title}\n\nDocument not found. Please check the file path.`);
      }
    } catch (error) {
      setDocContent(`# ${doc.title}\n\nError loading document: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8 text-blue-400" />
            <h1 className="text-3xl font-bold">Unreal Engine Documentation</h1>
          </div>
          <p className="text-gray-400 text-lg">
            Guides and tutorials for Unreal Engine 5 development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Documentation List */}
          <div className="lg:col-span-1">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold mb-4">Available Guides</h2>
              <div className="space-y-3">
                {docs.map((doc) => (
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
                      <div className="text-blue-400 mt-1">{doc.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{doc.title}</h3>
                        <p className="text-sm text-gray-400">{doc.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Markdown Viewer */}
          <div className="lg:col-span-2">
            <div className="bg-dark-surface border border-dark-border rounded-lg p-8 min-h-[600px]">
              {!selectedDoc ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                  <BookOpen className="w-16 h-16 mb-4 opacity-50" />
                  <h2 className="text-2xl font-semibold mb-2">Select a Guide</h2>
                  <p>Choose a documentation guide from the sidebar to get started</p>
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <div className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-gray-300 prose-strong:text-white prose-code:text-blue-400 prose-pre:bg-dark-bg prose-pre:border prose-pre:border-dark-border">
                  <MarkdownRenderer content={docContent} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple Markdown Renderer Component
function MarkdownRenderer({ content }: { content: string }) {
  // Split content into lines for processing
  const lines = content.split('\n');
  const elements: JSX.Element[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockLanguage = '';
  let codeBlockContent: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ');
      if (text.trim()) {
        elements.push(<p key={elements.length} className="mb-4 text-gray-300">{parseInlineMarkdown(text)}</p>);
      }
      currentParagraph = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeBlockContent.length > 0) {
      elements.push(
        <pre key={elements.length} className="bg-dark-bg border border-dark-border rounded-lg p-4 overflow-x-auto mb-4">
          <code className={`language-${codeBlockLanguage}`}>
            {codeBlockContent.join('\n')}
          </code>
        </pre>
      );
      codeBlockContent = [];
      codeBlockLanguage = '';
    }
  };

  const parseInlineMarkdown = (text: string): JSX.Element[] => {
    const parts: (string | JSX.Element)[] = [];
    let currentIndex = 0;

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
      if (match.type === 'bold') {
        parts.push(<strong key={parts.length} className="text-white font-semibold">{(match as any).text}</strong>);
      } else if (match.type === 'code') {
        parts.push(<code key={parts.length} className="bg-dark-bg px-1.5 py-0.5 rounded text-blue-400">{(match as any).text}</code>);
      } else if (match.type === 'link') {
        parts.push(<a key={parts.length} href={(match as any).url} className="text-blue-400 hover:text-blue-300 underline">{(match as any).text}</a>);
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
      elements.push(<h1 key={index} className="text-3xl font-bold mb-4 mt-6 text-white">{line.substring(2)}</h1>);
      return;
    }
    if (line.startsWith('## ')) {
      flushParagraph();
      elements.push(<h2 key={index} className="text-2xl font-semibold mb-3 mt-6 text-white">{line.substring(3)}</h2>);
      return;
    }
    if (line.startsWith('### ')) {
      flushParagraph();
      elements.push(<h3 key={index} className="text-xl font-semibold mb-2 mt-4 text-white">{line.substring(4)}</h3>);
      return;
    }

    // Lists
    if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph();
      const listItem = line.substring(2);
      elements.push(<li key={index} className="mb-2 text-gray-300 ml-4">{parseInlineMarkdown(listItem)}</li>);
      return;
    }

    // Horizontal rule
    if (line.trim() === '---') {
      flushParagraph();
      elements.push(<hr key={index} className="my-6 border-dark-border" />);
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

  return <>{elements}</>;
}

