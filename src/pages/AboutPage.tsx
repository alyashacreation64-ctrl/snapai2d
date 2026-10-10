import { SEO, BASE_URL } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { Camera, Target, Eye, Zap, ArrowRight } from 'lucide-react';

export function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About Snap2Do AI',
    url: `${BASE_URL}/about`,
  };

  return (
    <>
      <SEO
        title="About Snap2Do AI — Turn Screenshots Into Actions"
        description="Snap2Do AI is a free tool that turns screenshots into actionable tasks. Learn about our mission to make everyday digital information easier to understand and act on."
        canonical={`${BASE_URL}/about`}
        keywords={['about snap2do ai', 'AI screenshot tool', 'screenshot to action']}
        structuredData={structuredData}
      />

      <div className="pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-6">About Snap2Do AI</h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">The Problem We Solve</h2>
              <p className="text-secondary leading-relaxed">
                People take screenshots every day. A flight confirmation. A text from a friend about meeting up.
                A bill due date. An appointment reminder. A customer request. We take screenshots because we want
                to remember something important. But screenshots have a fundamental problem: they get buried in
                our phone galleries and are easily forgotten. Within days, that critical deadline is lost among
                hundreds of other images, and the very information we tried to save becomes impossible to find.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">What Snap2Do AI Does</h2>
              <p className="text-secondary leading-relaxed">
                Snap2Do AI turns those screenshots into clear, actionable tasks. Upload a screenshot, and the AI
                reads the content, identifies what action is required, extracts important dates, deadlines, times,
                locations, amounts, and instructions, and recommends a specific next step. Instead of a buried image,
                you get a structured task you can copy and add to your to-do list or calendar in seconds.
              </p>
            </section>

            <section className="grid sm:grid-cols-3 gap-6">
              <div className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="font-semibold mb-2">Our Mission</h3>
                <p className="text-sm text-secondary">
                  Make everyday digital information easier to understand and act on.
                </p>
              </div>
              <div className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="font-semibold mb-2">Our Vision</h3>
                <p className="text-sm text-secondary">
                  A world where no important information gets lost in a screenshot gallery.
                </p>
              </div>
              <div className="card p-6">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="font-semibold mb-2">Our Approach</h3>
                <p className="text-sm text-secondary">
                  Free, accessible AI tools that work instantly without barriers or accounts.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">Why We Built Snap2Do AI</h2>
              <p className="text-secondary leading-relaxed">
                We noticed a pattern: everyone takes screenshots of important information, but almost no one has a
                system for acting on those screenshots. The information is there, captured in an image, but it is
                not in a format that calendars, to-do lists, or reminder apps can use. We built Snap2Do AI to bridge
                that gap — to read the information in screenshots and turn it into something actionable.
              </p>
              <p className="text-secondary leading-relaxed mt-4">
                We made it free and login-free because we believe everyone should be able to turn their screenshots
                into tasks without friction. No accounts to create, no passwords to remember, no subscriptions to
                manage. Just upload a screenshot and get your next action.
              </p>
            </section>

            <div className="card p-8 text-center bg-secondary">
              <h3 className="text-xl font-bold mb-4">Ready to Turn Your Screenshots Into Actions?</h3>
              <Link to="/#analyze" className="btn-primary">
                <Camera className="w-4 h-4" /> Try Snap2Do AI Free <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-sm text-muted mt-4">No Login • No Signup • No Credit Card</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
