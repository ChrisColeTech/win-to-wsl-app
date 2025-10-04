import { useState, useCallback } from 'react';
import { PathOutput } from './PathOutput';
import { useClipboard } from '@/hooks/useClipboard';
import { PATH_CONFIG } from '@/utils/constants';

interface OutputSectionProps {
  windowsPath: string;
  wslPath: string;
  msysPath: string;
}

export function OutputSection({
  windowsPath,
  wslPath,
  msysPath,
}: OutputSectionProps) {
  const { copyToClipboard } = useClipboard();
  const [copiedOutput, setCopiedOutput] = useState<'windows' | 'wsl' | 'msys' | null>(null);

  const handleCopy = useCallback(async (type: 'windows' | 'wsl' | 'msys', path: string) => {
    const success = await copyToClipboard(path);

    if (success) {
      setCopiedOutput(type);
      setTimeout(() => {
        setCopiedOutput(null);
      }, PATH_CONFIG.COPY_FEEDBACK_DURATION_MS);
    }
  }, [copyToClipboard]);

  return (
    <div className="space-y-4">
      <PathOutput
        label="Windows"
        value={windowsPath}
        onCopy={() => handleCopy('windows', windowsPath)}
        isCopied={copiedOutput === 'windows'}
      />

      <PathOutput
        label="WSL"
        value={wslPath}
        onCopy={() => handleCopy('wsl', wslPath)}
        isCopied={copiedOutput === 'wsl'}
      />

      <PathOutput
        label="MSYS"
        value={msysPath}
        onCopy={() => handleCopy('msys', msysPath)}
        isCopied={copiedOutput === 'msys'}
      />
    </div>
  );
}
