import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { Search, X, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [isSearchOpen, setIsSearchOpen] = useState(!!initialSearch);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Update URL when search query changes
    if (searchQuery) {
      setSearchParams({ search: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  useEffect(() => {
    // Sync search query with URL params when they change externally (browser back/forward)
    const urlSearch = searchParams.get('search') || '';
    // Only update if URL param differs from current state (external change)
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
      setIsSearchOpen(!!urlSearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  useEffect(() => {
    // Focus input when search opens
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Opening search - focus will happen in useEffect
    } else {
      // Closing search - clear if empty
      if (!searchQuery) {
        setSearchParams({});
      }
    }
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    if (!searchQuery) {
      setSearchParams({});
    }
  };

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K or Cmd+K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!isSearchOpen) {
          setIsSearchOpen(true);
        }
      }
      // Escape to close search
      if (e.key === 'Escape' && isSearchOpen) {
        handleSearchClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogoClick = () => {
    // Reset search when clicking UI Library logo
    setSearchQuery('');
    setIsSearchOpen(false);
    setSearchParams({});
    setIsMobileMenuOpen(false);
  };

  const navLinks = (
    <>
      <Link
        to="/"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Components
      </Link>
      <Link
        to="/colors"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/colors' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Colors
      </Link>
      <Link
        to="/layouts"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/layouts' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Layouts
      </Link>
      <Link
        to="/responsive"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/responsive' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Responsive
      </Link>
      <Link
        to="/inspiration"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/inspiration' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Inspiration
      </Link>
      <Link
        to="/unreal-engine"
        className={`text-sm font-medium transition-colors ${
          location.pathname === '/unreal-engine' ? 'text-white' : 'text-gray-400 hover:text-white'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Unreal Engine
      </Link>
    </>
  );

  return (
    <nav className="border-b border-dark-border bg-dark-surface/70 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="text-lg md:text-xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            UI Library
          </Link>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks}

            {/* Search Toggle (desktop) */}
            {!isSearchOpen ? (
              <button 
                onClick={handleSearchToggle}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Open search"
              >
                <Search size={20} />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search components..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="pl-10 pr-10 py-2 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors w-64"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Clear search"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSearchClose}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={handleSearchToggle}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle search"
            >
              {isSearchOpen ? <X size={20} /> : <Search size={20} />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-2 pb-2">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-9 pr-9 py-2 bg-dark-surface border border-dark-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    searchInputRef.current?.focus();
                  }}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile nav menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="pt-2 flex flex-wrap gap-3 border-t border-dark-border mt-2">
              {navLinks}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

