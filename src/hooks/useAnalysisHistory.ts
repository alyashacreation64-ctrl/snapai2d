import { useCallback, useEffect, useState } from 'react';
import type { AnalysisResult } from '@/types';

const STORAGE_KEY = 'snap2do_history';
const MAX_ITEMS = 10;

export interface HistoryEntry {
  id: string;
  result: AnalysisResult;
  preview: string | null;
  createdAt: number;
  thumbnail?: string;
}

function readStorage(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_ITEMS);
  } catch {
    return [];
  }
}

function writeStorage(entries: HistoryEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries.slice(0, MAX_ITEMS)));
  } catch {
    // Storage full or unavailable — silently skip
  }
}

export function useAnalysisHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    setHistory(readStorage());
  }, []);

  const addEntry = useCallback((result: AnalysisResult, preview: string | null) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      result,
      preview,
      createdAt: Date.now(),
    };
    setHistory((prev) => {
      const next = [entry, ...prev].slice(0, MAX_ITEMS);
      writeStorage(next);
      return next;
    });
  }, []);

  const removeEntry = useCallback((id: string) => {
    setHistory((prev) => {
      const next = prev.filter((e) => e.id !== id);
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setHistory([]);
    writeStorage([]);
  }, []);

  return { history, addEntry, removeEntry, clearAll };
}
