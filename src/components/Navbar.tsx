import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Camera, Zap } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'How It Works', to: '/#how-it-works' },
  { label: 'Features', to: '/#features' },
  { label: 'Use Cases', to: '/#use-cases' },
  { label: 'For Contractors', to: '/#contractors' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleNavClick = (to: string) => {
    setMobileOpen(false);
    if (to.includes('#')) {
      const [path, hash] = to.split('#');
      if (path === '/' && location.pathname !== '/') {
        window.location.href = to;
      } else {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg shadow-black/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-9 h-9 rounded-lg gradient-glow flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline">Snap2Do <span className="gradient-text">AI</span></span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className="px-3 py-2 text-sm font-medium text-secondary hover:text-accent-500 transition-colors rounded-lg"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/#analyze"
              onClick={() => handleNavClick('/#analyze')}
              className="hidden sm:inline-flex btn-primary text-sm px-4 py-2"
            >
              <Zap className="w-4 h-4" />
              Try Free
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-tertiary transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.to)}
                className="block w-full text-left px-4 py-3 text-sm font-medium text-secondary hover:text-accent-500 hover:bg-tertiary rounded-lg transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/#analyze"
              onClick={() => handleNavClick('/#analyze')}
              className="btn-primary w-full mt-2"
            >
              <Zap className="w-4 h-4" />
              Try Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
