import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '/#features' },
    { label: 'How It Works', to: '/#how-it-works' },
    { label: 'Use Cases', to: '/#use-cases' },
    { label: 'For Contractors', to: '/#contractors' },
  ],
  Resources: [
    { label: 'Blog', to: '/blog' },
    { label: 'FAQ', to: '/faq' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  Legal: [
    { label: 'Privacy', to: '/privacy' },
    { label: 'Terms', to: '/terms' },
    { label: 'Disclaimer', to: '/disclaimer' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-3">
              <div className="w-9 h-9 rounded-lg gradient-glow flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              Snap2Do <span className="gradient-text">AI</span>
            </Link>
            <p className="text-sm text-secondary max-w-xs">
              Turn screenshots into actions. Upload a screenshot and AI tells you exactly what to do next.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-sm font-semibold mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-secondary hover:text-accent-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Snap2Do AI. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            100% Free • No Login Required • AI-Powered
          </p>
        </div>
      </div>
    </footer>
  );
}
