import { SEO, BASE_URL } from '@/components/SEO';
import { FAQ_ITEMS } from '@/data/faq';

export function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };

  return (
    <>
      <SEO
        title="FAQ — Snap2Do AI Frequently Asked Questions"
        description="Find answers to common questions about Snap2Do AI. Learn how the AI screenshot analyzer works, what screenshots you can upload, and how to extract tasks from images."
        canonical={`${BASE_URL}/faq`}
        keywords={['snap2do ai faq', 'AI screenshot analyzer questions', 'free screenshot tool faq']}
        structuredData={structuredData}
      />

      <div className="pt-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-secondary mb-10">
            Everything you need to know about Snap2Do AI and how it turns screenshots into actions.
          </p>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <details key={i} className="card p-5 group cursor-pointer">
                <summary className="font-semibold flex items-center justify-between list-none">
                  {item.question}
                  <span className="text-accent-500 transition-transform group-open:rotate-45 text-xl">+</span>
                </summary>
                <p className="text-sm text-secondary mt-3 leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
