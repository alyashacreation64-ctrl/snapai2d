import { Trash2, Clock, RotateCcw, Zap, ArrowRight, History } from 'lucide-react';
import type { HistoryEntry } from '@/hooks/useAnalysisHistory';

interface RecentAnalysesProps {
  history: HistoryEntry[];
  onRemove: (id: string) => void;
  onClearAll: () => void;
  onRevisit: (entry: HistoryEntry) => void;
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export function RecentAnalyses({ history, onRemove, onClearAll, onRevisit }: RecentAnalysesProps) {
  if (history.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center">
              <History className="w-5 h-5 text-accent-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Recent Analyses</h2>
              <p className="text-sm text-secondary">Saved on this device — no login needed</p>
            </div>
          </div>
          <button
            onClick={onClearAll}
            className="text-sm text-secondary hover:text-red-500 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {history.map((entry) => {
            const { result } = entry;
            return (
              <div
                key={entry.id}
                className="card p-4 hover:border-accent-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start gap-4">
                  {entry.preview && (
                    <img
                      src={entry.preview}
                      alt="Screenshot thumbnail"
                      className="w-16 h-16 rounded-lg object-cover bg-tertiary shrink-0"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {result.hasAction ? (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-accent-500">
                          <Zap className="w-3 h-3" /> Action Found
                        </span>
                      ) : (
                        <span className="text-xs font-medium text-muted">No Action</span>
                      )}
                      <span className="text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {timeAgo(entry.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-medium truncate">
                      {result.summary || result.actionRequired || 'No actionable information'}
                    </p>
                    {result.when && (
                      <p className="text-xs text-secondary mt-1">When: {result.when}</p>
                    )}
                    {result.nextStep && (
                      <p className="text-xs text-green-500 mt-1 flex items-center gap-1 truncate">
                        <ArrowRight className="w-3 h-3 shrink-0" /> {result.nextStep}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => onRevisit(entry)}
                    className="text-xs font-medium text-accent-500 hover:text-accent-600 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> View Again
                  </button>
                  <button
                    onClick={() => onRemove(entry.id)}
                    className="text-xs text-secondary hover:text-red-500 flex items-center gap-1 ml-auto"
                  >
                    <Trash2 className="w-3 h-3" /> Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
