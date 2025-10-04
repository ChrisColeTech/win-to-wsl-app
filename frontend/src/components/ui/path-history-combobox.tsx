import * as React from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import type { PathHistoryEntry } from '@/types';

interface PathHistoryComboboxProps {
  value: string;
  onChange: (value: string) => void;
  history: PathHistoryEntry[];
  placeholder?: string;
  disabled?: boolean;
}

export function PathHistoryCombobox({
  value,
  onChange,
  history,
  placeholder = 'Enter or select a path...',
  disabled = false,
}: PathHistoryComboboxProps) {
  const [query, setQuery] = React.useState('');

  // Reset query when value is cleared from outside (e.g., clear button)
  React.useEffect(() => {
    if (value === '') {
      setQuery('');
    }
  }, [value]);

  const filteredHistory = React.useMemo(() => {
    if (query === '') {
      return history.slice(0, 10);
    }
    return history
      .filter((entry) => entry.path.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);
  }, [query, history]);

  const handleChange = (selectedPath: string | null) => {
    if (selectedPath) {
      onChange(selectedPath);
      setQuery('');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setQuery(newValue);
    onChange(newValue);
  };

  return (
    <Combobox value={null} onChange={handleChange} disabled={disabled}>
      <div className="relative">
        <ComboboxInput
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-mono"
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setQuery('')}
          displayValue={() => value}
        />
        {history.length > 0 && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
            ↓
          </div>
        )}
        <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-border bg-popover text-popover-foreground shadow-md">
          {filteredHistory.map((entry, index) => (
            <ComboboxOption
              key={`${entry.path}-${index}`}
              value={entry.path}
              className="relative cursor-pointer select-none py-2 px-3 text-sm font-mono data-[focus]:bg-accent data-[focus]:text-accent-foreground"
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{entry.path}</span>
                <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                  {entry.format.toUpperCase()}
                </span>
              </div>
            </ComboboxOption>
          ))}
          {filteredHistory.length === 0 && (
            <div className="relative cursor-default select-none px-4 py-2 text-sm text-muted-foreground">
              {query === '' ? 'No history yet' : 'No matching paths'}
            </div>
          )}
        </ComboboxOptions>
      </div>
    </Combobox>
  );
}
