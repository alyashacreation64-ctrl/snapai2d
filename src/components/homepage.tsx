import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Camera, Zap, Clock, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { ScreenshotUploader } from './ScreenshotUploader';
import { USE_CASES } from '@/data/useCases';
import type { AnalysisResult } from '@/types';

interface HeroProps {
  onSaveToHistory?: (result: AnalysisResult, preview: string | null) => void;
}

export function Hero({ onSaveToHistory }: HeroProps = {}) {
  return (
    <section id="analyze" className="relative pt-28 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent-500/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-accent-700/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-accent-500" />
            <span className="text-sm font-medium">AI-Powered Screenshot Intelligence</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Turn Any Screenshot Into Your <span className="gradient-text">Next Action</span>.
          </h1>

          <p className="text-lg text-secondary max-w-2xl mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Upload a screenshot and AI instantly finds what matters, detects important dates and deadlines,
            and tells you exactly what to do next.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> 100% Free</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No Login Required</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-green-500" /> No Credit Card</span>
          </div>
        </div>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <ScreenshotUploader onSaveToHistory={onSaveToHistory} />
        </div>
      </div>
    </section>
  );
}

export function TrustStrip() {
  const items = ['100% Free', 'No Login Required', 'AI-Powered', 'Mobile Friendly'];
  return (
    <div className="border-y bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {items.map((item) => (
            <span key={item} className="text-sm font-medium text-secondary flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-accent-500" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function InteractiveDemo() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">From Screenshot → To Action</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            See how Snap2Do AI transforms a screenshot into a clear, actionable task.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-muted uppercase tracking-wider">Screenshot</span>
            </div>
            <div className="rounded-xl bg-tertiary p-6 sm:p-8 space-y-3">
              <div className="space-y-2">
                <div className="h-3 w-3/4 rounded bg-secondary" />
                <div className="h-3 w-full rounded bg-secondary" />
                <div className="h-3 w-5/6 rounded bg-secondary" />
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-4 w-2/3 rounded bg-accent-500/30" />
                <div className="h-3 w-full rounded bg-secondary" />
                <div className="h-3 w-4/5 rounded bg-secondary" />
              </div>
              <div className="pt-4">
                <div className="inline-block px-3 py-1 rounded-full bg-accent-500/20 text-xs font-medium text-accent-500">
                  Flight Confirmation
                </div>
              </div>
              <p className="text-xs text-muted pt-4 text-center italic">
                "Your flight departs October 18 at 8:30 PM.
                Online check-in opens 24 hours before departure."
              </p>
            </div>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-muted uppercase tracking-wider">AI Result</span>
            </div>
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-accent-500/10 border border-accent-500/20">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Action Required</p>
                <p className="text-sm font-medium">Check in for your flight</p>
              </div>
              <div className="p-4 rounded-xl bg-tertiary">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">When</p>
                <p className="text-sm font-medium">October 17 after 8:30 PM</p>
              </div>
              <div className="p-4 rounded-xl bg-tertiary">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Important</p>
                <p className="text-sm font-medium">Flight departs October 18 at 8:30 PM.</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">Next Step</p>
                <p className="text-sm font-medium">Complete online check-in before departure.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const features = [
    { icon: Zap, title: 'Instant Action Detection', description: 'AI identifies what needs to be done the moment you upload a screenshot — no manual reading required.' },
    { icon: Clock, title: 'Deadline & Date Extraction', description: 'Automatically detects due dates, deadlines, appointment times, and time-sensitive instructions.' },
    { icon: MapPin, title: 'Location & Address Reading', description: 'Extracts addresses, venues, and locations so you know exactly where you need to be.' },
    { icon: Calendar, title: 'Smart Next Steps', description: 'Goes beyond reading text — recommends the specific next action you should take.' },
    { icon: Camera, title: 'Any Screenshot Type', description: 'Works with texts, emails, bills, flight confirmations, appointment reminders, and more.' },
    { icon: CheckCircle2, title: 'Copy & Go', description: 'One click copies the entire task so you can paste it into your calendar or to-do list instantly.' },
  ];

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything You Need to Act on Screenshots</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Powerful AI features that turn screenshots into structured, actionable tasks.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="card p-6 hover:border-accent-500/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-accent-500/10 flex items-center justify-center mb-4 group-hover:bg-accent-500/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-secondary">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Use Cases for Every Screenshot</h2>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Snap2Do AI works with any screenshot that contains actionable information.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USE_CASES.map((useCase) => (
            <div
              key={useCase.title}
              className="card p-5 hover:border-accent-500/30 transition-all duration-300"
            >
              <div className="text-3xl mb-3">{useCase.icon}</div>
              <h3 className="text-base font-semibold mb-1">{useCase.title}</h3>
              <p className="text-sm text-secondary">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContractorSection() {
  return (
    <section id="contractors" className="py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6">
              <span className="text-sm font-medium">🔧 For Contractors</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Built for Contractors Too</h2>
            <p className="text-lg text-secondary mb-6">
              Contractors receive dozens of screenshots every day — customer requests, job details,
              addresses, material lists, appointment times, and pricing information. Snap2Do AI
              extracts the actionable details from all of them.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                'Customer requests and job instructions',
                'Job site addresses and locations',
                'Material lists and supplier messages',
                'Appointment times and scheduling',
                'Pricing information and quotes',
                'Project deadlines and client messages',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/ai-tools-for-contractors" className="btn-primary">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="card p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-muted uppercase tracking-wider">Customer Message</span>
            </div>
            <div className="rounded-xl bg-tertiary p-5 mb-4">
              <p className="text-sm italic text-secondary">
                "Can you come Tuesday at 10 AM? Please bring the replacement faucet.
                The property is at 125 Main Street."
              </p>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent-500" />
              <span className="text-sm font-semibold text-muted uppercase tracking-wider">AI Result</span>
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-accent-500/10 border border-accent-500/20">
                <p className="text-xs font-semibold text-muted uppercase mb-1">Action</p>
                <p className="text-sm font-medium">Replace faucet</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-tertiary">
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Date</p>
                  <p className="text-sm font-medium">Tuesday</p>
                </div>
                <div className="p-3 rounded-lg bg-tertiary">
                  <p className="text-xs font-semibold text-muted uppercase mb-1">Time</p>
                  <p className="text-sm font-medium">10:00 AM</p>
                </div>
              </div>
              <div className="p-3 rounded-lg bg-tertiary">
                <p className="text-xs font-semibold text-muted uppercase mb-1">Location</p>
                <p className="text-sm font-medium">125 Main Street</p>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <p className="text-xs font-semibold text-muted uppercase mb-1">Next Step</p>
                <p className="text-sm font-medium">Confirm appointment with customer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-accent-500/10 blur-[100px]" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold mb-6">
            Your Next Action Is Probably Already <br className="hidden sm:block" />
            in Your Screenshots.
          </h2>
          <p className="text-lg text-secondary mb-8">Upload one and find out.</p>
          <Link to="/#analyze" className="btn-primary text-base px-8 py-4">
            <Zap className="w-5 h-5" />
            Analyze Screenshot — Free
          </Link>
          <p className="text-sm text-muted mt-4">
            No Login • No Signup • No Credit Card
          </p>
        </div>
      </div>
    </section>
  );
}
