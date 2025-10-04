interface StatusBarProps {
  message?: string;
}

export function StatusBar({ message = 'v2' }: StatusBarProps) {
  return (
    <div className="h-6 bg-card border-t border-border flex items-center justify-between px-4 text-xs flex-shrink-0">
      <div className="flex items-center gap-4">
        <span className="text-muted-foreground">{message}</span>
      </div>
      <div className="flex items-center gap-4">
        {/* Additional status info can go here */}
      </div>
    </div>
  );
}
