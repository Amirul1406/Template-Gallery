import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ComponentCard from '../components/ComponentCard';
import { components } from '../components';

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const categories = useMemo(() => {
    const cats = new Set(components.map((c) => c.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredComponents = useMemo(() => {
    return components.filter((component) => {
      const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        component.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        component.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
            Component Library
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg">
            Browse and copy beautiful UI components for your projects
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-dark-surface border border-dark-border text-gray-300 hover:bg-dark-border'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Component Grid */}
        {filteredComponents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredComponents.map((component) => (
              <ComponentCard key={component.id} component={component} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No components found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

