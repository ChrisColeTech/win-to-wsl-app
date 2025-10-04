import { TitleBar } from './TitleBar';
import { StatusBar } from './StatusBar';

interface AppLayoutProps {
  children: React.ReactNode;
  statusMessage?: string;
}

export function AppLayout({ children, statusMessage }: AppLayoutProps) {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      <TitleBar />
      <main className="flex-1 w-full overflow-auto">
        {children}
      </main>
      <StatusBar message={statusMessage} />
    </div>
  );
}
