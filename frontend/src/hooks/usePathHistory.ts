import { useState, useEffect, useCallback } from 'react';
import type { PathHistory, PathHistoryEntry, PathFormat } from '@/types';

export function usePathHistory() {
  const [history, setHistory] = useState<PathHistory>({ entries: [], maxEntries: 50 });
  const [isLoading, setIsLoading] = useState(true);

  const loadHistory = useCallback(async () => {
    if (window.electronAPI?.history) {
      try {
        const data = await window.electronAPI.history.read();
        setHistory(data);
      } catch (error) {
        console.error('Failed to load history:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Fallback to localStorage for web
      const stored = localStorage.getItem('pathHistory');
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (error) {
          console.error('Failed to parse history from localStorage:', error);
        }
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const addToHistory = useCallback(async (path: string, format: PathFormat) => {
    if (!path.trim()) return;

    const entry: PathHistoryEntry = {
      path,
      format,
      timestamp: Date.now(),
      usageCount: 1,
    };

    if (window.electronAPI?.history) {
      try {
        const updated = await window.electronAPI.history.add(entry);
        setHistory(updated);
      } catch (error) {
        console.error('Failed to add to history:', error);
      }
    } else {
      // Fallback to localStorage
      const updated = { ...history };
      const existingIndex = updated.entries.findIndex(e => e.path === path);

      if (existingIndex >= 0) {
        updated.entries[existingIndex].timestamp = entry.timestamp;
        updated.entries[existingIndex].usageCount += 1;
      } else {
        updated.entries.unshift(entry);
        if (updated.entries.length > updated.maxEntries) {
          updated.entries = updated.entries.slice(0, updated.maxEntries);
        }
      }

      setHistory(updated);
      localStorage.setItem('pathHistory', JSON.stringify(updated));
    }
  }, [history]);

  const clearHistory = useCallback(async () => {
    if (window.electronAPI?.history) {
      try {
        const cleared = await window.electronAPI.history.clear();
        setHistory(cleared);
      } catch (error) {
        console.error('Failed to clear history:', error);
      }
    } else {
      const cleared = { entries: [], maxEntries: 50 };
      setHistory(cleared);
      localStorage.removeItem('pathHistory');
    }
  }, []);

  return {
    history,
    isLoading,
    addToHistory,
    clearHistory,
  };
}
