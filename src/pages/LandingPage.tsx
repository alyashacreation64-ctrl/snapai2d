import { SEO, BASE_URL } from '@/components/SEO';
import { ScreenshotUploader } from '@/components/ScreenshotUploader';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface LandingPageProps {
  slug: string;
  title: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  intro: string;
  sections: { heading: string; body: string }[];
  faqs?: { question: string; answer: string }[];
  ctaText: string;
  structuredData?: object[];
}

export function LandingPage({
  slug,
  title,
  h1,
  metaTitle,
  metaDescription,
  keywords,
  intro,
  sections,
  faqs,
  ctaText,
  structuredData = [],
}: LandingPageProps) {
  const url = `${BASE_URL}/${slug}`;

  const defaultStructuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Snap2Do AI',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: metaDescription,
    },
    ...(faqs
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: { '@type': 'Answer', text: f.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={url}
        keywords={keywords}
        structuredData={[...defaultStructuredData, ...structuredData]}
      />

      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="text-sm text-muted mb-6">
            <Link to="/" className="hover:text-accent-500">Home</Link>
            <span className="mx-2">/</span>
            <span>{title}</span>
          </nav>

          <h1 className="text-3xl sm:text-5xl font-bold mb-6">{h1}</h1>
          <p className="text-lg text-secondary mb-8">{intro}</p>

          <div className="my-12">
            <ScreenshotUploader />
          </div>

          {sections.map((section, i) => (
            <section key={i} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{section.heading}</h2>
              <p className="text-secondary leading-relaxed">{section.body}</p>
            </section>
          ))}

          {faqs && faqs.length > 0 && (
            <section className="my-12">
              <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div key={i} className="card p-5">
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-sm text-secondary">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div className="card p-8 text-center my-12 bg-secondary">
            <h2 className="text-2xl font-bold mb-4">{ctaText}</h2>
            <p className="text-secondary mb-6">
              Upload a screenshot and let AI find your next action. Free, no login required.
            </p>
            <Link to="/#analyze" className="btn-primary">
              Analyze Screenshot — Free <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-sm text-muted mt-4">
              No Login • No Signup • No Credit Card
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/screenshot-to-task" className="text-sm text-accent-500 hover:underline">Screenshot to Task</Link>
            <span className="text-muted">•</span>
            <Link to="/screenshot-to-todo" className="text-sm text-accent-500 hover:underline">Screenshot to Todo</Link>
            <span className="text-muted">•</span>
            <Link to="/ai-screenshot-analyzer" className="text-sm text-accent-500 hover:underline">AI Screenshot Analyzer</Link>
            <span className="text-muted">•</span>
            <Link to="/ai-tools-for-contractors" className="text-sm text-accent-500 hover:underline">AI Tools for Contractors</Link>
          </div>
        </div>
      </div>
    </>
  );
}
