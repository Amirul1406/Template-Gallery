import { Link } from 'react-router-dom';
import { Component } from '../types/component';

interface ComponentCardProps {
  component: Component;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  return (
    <Link
      to={`/component/${component.id}`}
      className="group relative block bg-dark-surface border border-dark-border rounded-lg overflow-hidden hover:border-gray-600 transition-all duration-200 hover:shadow-lg hover:shadow-black/50"
    >
      <div className="aspect-video bg-dark-bg flex items-center justify-center p-1 relative isolate overflow-hidden">
        <div className="w-full h-full flex items-center justify-center [contain:layout_style_paint]">
          <div className="w-full h-full flex items-center justify-center scale-[0.75] origin-center">
            <component.preview />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 group-hover:text-blue-400 transition-colors">
          {component.title}
        </h3>
        <p className="text-sm text-gray-400 line-clamp-2">
          {component.description}
        </p>
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs px-2 py-1 bg-dark-border rounded text-gray-300">
            {component.category}
          </span>
          {component.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-dark-border rounded text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

