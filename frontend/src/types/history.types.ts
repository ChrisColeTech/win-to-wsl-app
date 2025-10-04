import type { PathFormat } from './path.types';

export interface PathHistoryEntry {
  path: string;
  format: PathFormat;
  timestamp: number;
  usageCount: number;
}

export interface PathHistory {
  entries: PathHistoryEntry[];
  maxEntries: number;
}
