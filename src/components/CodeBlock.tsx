import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { CodeSnippet } from '../types/component';

interface CodeBlockProps {
  codes: CodeSnippet[];
}

export default function CodeBlock({ codes }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codes[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (codes.length === 0) return null;

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-dark-border bg-dark-bg">
        <div className="flex">
          {codes.map((code, index) => (
            <button
              key={`${code.language}-${index}-${code.label}`}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === index
                  ? 'text-white border-b-2 border-blue-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {code.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check size={16} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={16} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Display */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={codes[activeTab].language === 'react' ? 'jsx' : codes[activeTab].language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: '#0a0a0a',
            fontSize: '0.875rem',
          }}
        >
          {codes[activeTab].code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

