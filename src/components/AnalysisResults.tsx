import { useState } from 'react';
import {
  Zap,
  Clock,
  Calendar,
  MapPin,
  DollarSign,
  Info,
  ArrowRight,
  RotateCcw,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import type { AnalysisResult } from '@/types';

interface AnalysisResultsProps {
  result: AnalysisResult;
  preview: string | null;
  onReset: () => void;
}

export function AnalysisResults({ result, preview, onReset }: AnalysisResultsProps) {
  const [copied, setCopied] = useState(false);

  const sections: { label: string; value?: string; icon: typeof Zap }[] = [
    { label: 'Action Required', value: result.actionRequired, icon: Zap },
    { label: 'When', value: result.when, icon: Clock },
    { label: 'Date', value: result.date, icon: Calendar },
    { label: 'Time', value: result.time, icon: Clock },
    { label: 'Where', value: result.where, icon: MapPin },
    { label: 'Amount', value: result.amount, icon: DollarSign },
    { label: 'Important Details', value: result.importantDetails, icon: Info },
    { label: 'Next Step', value: result.nextStep, icon: ArrowRight },
  ];

  const visibleSections = sections.filter((s) => s.value && s.value.trim());

  const handleCopy = () => {
    let text = '';
    if (!result.hasAction) {
      text = 'NO ACTION REQUIRED\n\nThis screenshot does not contain actionable information.';
    } else {
      visibleSections.forEach((s) => {
        text += `${s.label.toUpperCase()}\n${s.value}\n\n`;
      });
    }
    navigator.clipboard.writeText(text.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
      <div className="card overflow-hidden">
        {preview && (
          <div className="border-b p-4">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-sm font-semibold">Analysis Complete</span>
            </div>
            <img
              src={preview}
              alt="Analyzed screenshot"
              className="w-full max-h-40 object-contain rounded-lg bg-tertiary"
            />
          </div>
        )}

        <div className="p-6 sm:p-8">
          {!result.hasAction ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-tertiary flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-xl font-bold mb-2">No Action Required</h3>
              <p className="text-sm text-secondary max-w-md mx-auto">
                We couldn't confidently identify an actionable item in this screenshot.
                This image may not contain tasks, deadlines, or instructions that require follow-up.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {visibleSections.map((section) => {
                const Icon = section.icon;
                const isAction = section.label === 'Action Required';
                const isNextStep = section.label === 'Next Step';
                return (
                  <div
                    key={section.label}
                    className={`p-4 rounded-xl ${
                      isAction
                        ? 'bg-accent-500/10 border border-accent-500/20'
                        : isNextStep
                        ? 'bg-green-500/10 border border-green-500/20'
                        : 'bg-tertiary'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isAction ? 'bg-accent-500/20' : isNextStep ? 'bg-green-500/20' : 'bg-secondary'
                      }`}>
                        <Icon className={`w-4 h-4 ${
                          isAction ? 'text-accent-500' : isNextStep ? 'text-green-500' : 'text-secondary'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1">
                          {section.label}
                        </p>
                        <p className="text-sm font-medium break-words">{section.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {visibleSections.length === 0 && (
                <div className="text-center py-8">
                  <AlertCircle className="w-8 h-8 text-muted mx-auto mb-2" />
                  <p className="text-sm text-secondary">
                    No specific actionable information was detected in this screenshot.
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={handleCopy}
              className="btn-secondary flex-1 text-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Task
                </>
              )}
            </button>
            <button
              onClick={onReset}
              className="btn-primary flex-1 text-sm"
            >
              <RotateCcw className="w-4 h-4" /> Analyze Another Screenshot
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted mt-4">
        AI results may contain errors. Always verify important dates, deadlines, and details.
      </p>
    </div>
  );
}
