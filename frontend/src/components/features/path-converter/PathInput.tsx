import { Clipboard, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface PathInputProps {
  value: string;
  onChange: (value: string) => void;
  onPaste: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function PathInput({
  value,
  onChange,
  onPaste,
  onClear,
  disabled = false,
}: PathInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="path-input" className="text-sm font-medium">
          Input Path
        </Label>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onPaste}
            disabled={disabled}
          >
            <Clipboard className="h-4 w-4 mr-2" />
            Paste
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={onClear}
            disabled={disabled || !value}
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>
      <Input
        id="path-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="C:\Projects\my-app or /mnt/c/Users/name or /c/path/to/file"
        className="font-mono text-sm"
        disabled={disabled}
      />
    </div>
  );
}
