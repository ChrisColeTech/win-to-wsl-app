import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PathOutputProps {
  label: string;
  value: string;
  onCopy: () => void;
  isCopied: boolean;
}

export function PathOutput({
  label,
  value,
  onCopy,
  isCopied,
}: PathOutputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <Button
          size="sm"
          variant="outline"
          onClick={onCopy}
          disabled={!value}
        >
          {isCopied ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </>
          )}
        </Button>
      </div>
      <Input
        value={value}
        readOnly
        className="font-mono text-sm bg-muted"
        placeholder="Converted path will appear here..."
      />
    </div>
  );
}
