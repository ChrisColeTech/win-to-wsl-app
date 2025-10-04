import { AppLayout } from '@/components/layout/AppLayout';
import { ConverterPanel } from '@/components/features/path-converter/ConverterPanel';
import { ThemeProvider } from '@/contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <AppLayout statusMessage="v2">
        <ConverterPanel />
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
