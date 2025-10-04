import { useCallback, useState, useEffect } from 'react';
import { Clipboard, X, Copy, Check } from 'lucide-react';
import { usePathConverter } from '@/hooks/usePathConverter';
import { useClipboard } from '@/hooks/useClipboard';
import { usePathHistory } from '@/hooks/usePathHistory';
import { PathHistoryInput } from '@/components/ui/path-history-input';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { PATH_CONFIG } from '@/utils/constants';
import { detectPathFormat } from '@/services/path-converter/pathDetector';

export function ConverterPanel() {
  const { inputText, conversionResult, setInputText, clearInput } = usePathConverter();
  const { readFromClipboard, copyToClipboard } = useClipboard();
  const { history, addToHistory } = usePathHistory();
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Add to history when input changes (debounced)
  useEffect(() => {
    if (inputText.trim()) {
      const timeoutId = setTimeout(() => {
        const detected = detectPathFormat(inputText.trim());
        if (detected.isValid) {
          addToHistory(inputText.trim(), detected.format);
        }
      }, 1000); // Wait 1 second after typing stops

      return () => clearTimeout(timeoutId);
    }
  }, [inputText, addToHistory]);

  const handlePaste = useCallback(async () => {
    const text = await readFromClipboard();
    if (text) {
      setInputText(text);
    }
  }, [readFromClipboard, setInputText]);

  const handleCopy = useCallback(async (field: string, value: string) => {
    const success = await copyToClipboard(value);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), PATH_CONFIG.COPY_FEEDBACK_DURATION_MS);
    }
  }, [copyToClipboard]);

  return (
    <div className="p-4 space-y-4 w-full">
      {/* Input Row with History */}
      <div className="grid grid-cols-[60px_1fr_auto] gap-3 items-center">
        <Label htmlFor="input-path" className="text-left text-xs">Input</Label>
        <PathHistoryInput
          value={inputText}
          onChange={setInputText}
          history={history.entries}
          placeholder="C:\Projects\my-app or /mnt/c/Users/name"
        />
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={handlePaste}>
            <Clipboard className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={clearInput} disabled={!inputText}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Windows Output Row */}
      <div className="grid grid-cols-[60px_1fr_auto] gap-3 items-center">
        <Label htmlFor="windows-path" className="text-left text-xs">Windows</Label>
        <Input
          id="windows-path"
          value={conversionResult.windows}
          readOnly
          className="font-mono text-sm bg-muted"
          placeholder="Windows format will appear here..."
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy('windows', conversionResult.windows)}
          disabled={!conversionResult.windows}
        >
          {copiedField === 'windows' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* WSL Output Row */}
      <div className="grid grid-cols-[60px_1fr_auto] gap-3 items-center">
        <Label htmlFor="wsl-path" className="text-left text-xs">WSL</Label>
        <Input
          id="wsl-path"
          value={conversionResult.wsl}
          readOnly
          className="font-mono text-sm bg-muted"
          placeholder="WSL format will appear here..."
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy('wsl', conversionResult.wsl)}
          disabled={!conversionResult.wsl}
        >
          {copiedField === 'wsl' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* MSYS Output Row */}
      <div className="grid grid-cols-[60px_1fr_auto] gap-3 items-center">
        <Label htmlFor="msys-path" className="text-left text-xs">MSYS</Label>
        <Input
          id="msys-path"
          value={conversionResult.msys}
          readOnly
          className="font-mono text-sm bg-muted"
          placeholder="MSYS format will appear here..."
        />
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopy('msys', conversionResult.msys)}
          disabled={!conversionResult.msys}
        >
          {copiedField === 'msys' ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
