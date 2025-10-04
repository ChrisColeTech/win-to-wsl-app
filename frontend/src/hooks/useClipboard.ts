import { useState, useCallback } from 'react';

interface UseClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
  readFromClipboard: () => Promise<string>;
  isCopying: boolean;
  copyError: Error | null;
}

export function useClipboard(): UseClipboardReturn {
  const [isCopying, setIsCopying] = useState(false);
  const [copyError, setCopyError] = useState<Error | null>(null);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    setIsCopying(true);
    setCopyError(null);

    try {
      // Try Electron API first (if available)
      if (window.electronAPI?.clipboard) {
        await window.electronAPI.clipboard.writeText(text);
        setIsCopying(false);
        return true;
      }

      // Fallback to browser Clipboard API
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        setIsCopying(false);
        return true;
      }

      throw new Error('Clipboard API not available');
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Failed to copy to clipboard');
      setCopyError(err);
      setIsCopying(false);
      return false;
    }
  }, []);

  const readFromClipboard = useCallback(async (): Promise<string> => {
    try {
      // Try Electron API first (if available)
      if (window.electronAPI?.clipboard) {
        return await window.electronAPI.clipboard.readText();
      }

      // Fallback to browser Clipboard API
      if (navigator.clipboard) {
        return await navigator.clipboard.readText();
      }

      throw new Error('Clipboard API not available');
    } catch (error) {
      console.error('Failed to read from clipboard:', error);
      return '';
    }
  }, []);

  return {
    copyToClipboard,
    readFromClipboard,
    isCopying,
    copyError,
  };
}
