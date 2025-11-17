import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import DownloadSection from '../components/DownloadSection';
import ExplanationSection from '../components/ExplanationSection';
import { components } from '../components';

export default function ComponentDetail() {
  const { id } = useParams<{ id: string }>();
  const component = components.find((c) => c.id === id);

  if (!component) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Component not found</h1>
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Go back to gallery
          </Link>
        </div>
      </div>
    );
  }

  const PreviewComponent = component.preview;

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Gallery</span>
        </Link>

        {/* Component Info */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-dark-border rounded text-sm text-gray-300">
              {component.category}
            </span>
            {component.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-dark-border rounded text-sm text-gray-400"
              >
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4">{component.title}</h1>
          <p className="text-gray-400 text-lg max-w-3xl">{component.description}</p>
        </div>

        {/* Preview Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="bg-gradient-to-br from-dark-surface to-dark-bg border border-dark-border rounded-lg p-12 flex items-center justify-center min-h-[400px]">
            <PreviewComponent />
          </div>
        </div>

        {/* Code Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Code</h2>
          <CodeBlock codes={component.codes} />
        </div>

        {/* Explanation Section */}
        <div className="mb-8">
          <ExplanationSection component={component} />
        </div>

        {/* Download Section */}
        <div>
          <DownloadSection component={component} />
        </div>
      </div>
    </div>
  );
}

