import * as React from 'react';
import { Input } from '@/components/ui/input';
import type { PathHistoryEntry } from '@/types';

interface PathHistoryInputProps {
  value: string;
  onChange: (value: string) => void;
  history: PathHistoryEntry[];
  placeholder?: string;
  disabled?: boolean;
}

export function PathHistoryInput({
  value,
  onChange,
  history,
  placeholder = 'Enter or select a path...',
  disabled = false,
}: PathHistoryInputProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleFocus = () => {
    if (history.length > 0) {
      setIsOpen(true);
    }
  };

  const handleSelect = (path: string) => {
    onChange(path);
    setIsOpen(false);
  };

  // Show top 10 most recent items
  const recentHistory = history.slice(0, 10);

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        disabled={disabled}
        className="font-mono text-sm pr-8"
      />
      {history.length > 0 && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
          ↓
        </div>
      )}
      {isOpen && recentHistory.length > 0 && (
        <div className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          {recentHistory.map((entry, index) => (
            <div
              key={`${entry.path}-${index}`}
              onClick={() => handleSelect(entry.path)}
              className="relative cursor-pointer select-none py-2 px-3 text-sm font-mono hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{entry.path}</span>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {entry.format.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
