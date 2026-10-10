import { SEO, BASE_URL } from '@/components/SEO';
import {
  Hero,
  TrustStrip,
  InteractiveDemo,
  FeaturesSection,
  UseCasesSection,
  ContractorSection,
  FinalCTA,
} from '@/components/homepage';
import { RecentAnalyses } from '@/components/RecentAnalyses';
import { AnalysisResults } from '@/components/AnalysisResults';
import { useAnalysisHistory } from '@/hooks/useAnalysisHistory';
import { useEffect, useState } from 'react';
import type { AnalysisResult } from '@/types';
import type { HistoryEntry } from '@/hooks/useAnalysisHistory';

export function HomePage() {
  const { history, addEntry, removeEntry, clearAll } = useAnalysisHistory();
  const [revisited, setRevisited] = useState<AnalysisResult | null>(null);
  const [revisitedPreview, setRevisitedPreview] = useState<string | null>(null);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  const handleRevisit = (entry: HistoryEntry) => {
    setRevisited(entry.result);
    setRevisitedPreview(entry.preview);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetRevisit = () => {
    setRevisited(null);
    setRevisitedPreview(null);
  };

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Snap2Do AI',
      applicationCategory: 'ProductivityApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      description:
        'Free AI screenshot analyzer that turns screenshots into actionable tasks. Upload a screenshot and instantly extract tasks, deadlines, dates and next steps.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Snap2Do AI',
      url: BASE_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${BASE_URL}/blog?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Snap2Do AI',
      url: BASE_URL,
      description: 'Turn screenshots into actions with AI.',
    },
  ];

  return (
    <>
      <SEO
        title="Snap2Do AI — Free AI Screenshot Analyzer & Screenshot to Task Tool"
        description="Snap2Do AI turns screenshots into actionable tasks. Upload a screenshot and instantly extract tasks, deadlines, dates and next steps. Free, fast and no login required."
        canonical={BASE_URL}
        keywords={[
          'AI screenshot analyzer',
          'AI screenshot reader',
          'screenshot to task',
          'screenshot to todo',
          'screenshot to action',
          'free AI screenshot analyzer',
          'AI task extractor',
          'screenshot reminder',
          'AI productivity tool',
        ]}
        structuredData={structuredData}
      />
      {revisited ? (
        <section className="pt-24 pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnalysisResults
              result={revisited}
              preview={revisitedPreview}
              onReset={handleResetRevisit}
            />
          </div>
        </section>
      ) : (
        <Hero onSaveToHistory={addEntry} />
      )}
      <TrustStrip />
      <InteractiveDemo />
      <FeaturesSection />
      <UseCasesSection />
      <ContractorSection />
      <RecentAnalyses
        history={history}
        onRemove={removeEntry}
        onClearAll={clearAll}
        onRevisit={handleRevisit}
      />
      <FinalCTA />
    </>
  );
}
