import { BookOpen } from 'lucide-react';
import { Component } from '../types/component';

interface ExplanationSectionProps {
  component: Component;
}

export default function ExplanationSection({ component }: ExplanationSectionProps) {
  if (!component.explanation) {
    return null;
  }

  return (
    <div className="bg-dark-surface border border-dark-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="text-blue-500" size={24} />
        <h3 className="text-xl font-semibold">How It Works</h3>
      </div>
      
      <div className="text-gray-300 leading-relaxed space-y-4">
        <div 
          className="whitespace-pre-line [&_strong]:text-white [&_strong]:font-semibold [&_code]:bg-dark-bg [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-blue-400 [&_code]:text-sm [&_pre]:bg-dark-bg [&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:my-4"
          dangerouslySetInnerHTML={{ __html: component.explanation.replace(/\n/g, '<br />') }}
        />
      </div>
    </div>
  );
}

