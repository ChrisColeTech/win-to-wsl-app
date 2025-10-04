import { VscChromeClose } from 'react-icons/vsc';
import { BiMinus, BiSquare } from 'react-icons/bi';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { useTheme } from '@/contexts/ThemeContext';

export function TitleBar() {
  const { theme, toggleTheme } = useTheme();

  const handleMinimize = () => {
    if (window.electronAPI?.window) {
      window.electronAPI.window.minimize();
    }
  };

  const handleMaximize = () => {
    if (window.electronAPI?.window) {
      window.electronAPI.window.maximize();
    }
  };

  const handleClose = () => {
    if (window.electronAPI?.window) {
      window.electronAPI.window.close();
    }
  };

  return (
    <div className="h-8 bg-card border-b border-border flex items-center justify-between flex-shrink-0" style={{ WebkitAppRegion: 'drag' } as React.CSSProperties}>
      <div className="flex items-center gap-2 px-3">
        <img src="./icon-32.png" alt="Win to WSL" className="w-4 h-4" />
        <h1 className="text-sm font-semibold">Win to WSL</h1>
      </div>
      <div className="flex items-center" style={{ WebkitAppRegion: 'no-drag' } as React.CSSProperties}>
        <button
          className="h-8 w-12 inline-flex items-center justify-center hover:bg-accent transition-colors"
          onClick={toggleTheme}
        >
          {theme === 'dark' ? <MdLightMode size={16} /> : <MdDarkMode size={16} />}
        </button>
        <button
          className="h-8 w-12 inline-flex items-center justify-center hover:bg-accent transition-colors"
          onClick={handleMinimize}
        >
          <BiMinus size={16} />
        </button>
        <button
          className="h-8 w-12 inline-flex items-center justify-center hover:bg-accent transition-colors"
          onClick={handleMaximize}
        >
          <BiSquare size={14} />
        </button>
        <button
          className="h-8 w-12 inline-flex items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
          onClick={handleClose}
        >
          <VscChromeClose size={16} />
        </button>
      </div>
    </div>
  );
}
