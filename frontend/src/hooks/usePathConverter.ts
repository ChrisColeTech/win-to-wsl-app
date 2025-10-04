import { useState, useCallback, useEffect } from 'react';
import { convertPath } from '@/services/path-converter/pathConverter';
import { PATH_CONFIG } from '@/utils/constants';

interface ConversionResult {
  windows: string;
  wsl: string;
  msys: string;
}

interface UsePathConverterReturn {
  inputText: string;
  conversionResult: ConversionResult;
  setInputText: (text: string) => void;
  clearInput: () => void;
  isConverting: boolean;
}

export function usePathConverter(): UsePathConverterReturn {
  const [inputText, setInputTextState] = useState('');
  const [conversionResult, setConversionResult] = useState<ConversionResult>({
    windows: '',
    wsl: '',
    msys: '',
  });
  const [isConverting, setIsConverting] = useState(false);

  // Debounced conversion effect
  useEffect(() => {
    if (!inputText.trim()) {
      setConversionResult({
        windows: '',
        wsl: '',
        msys: '',
      });
      setIsConverting(false);
      return;
    }

    setIsConverting(true);

    const timeoutId = setTimeout(() => {
      const converted = convertPath(inputText.trim());

      setConversionResult({
        windows: converted.windows,
        wsl: converted.wsl,
        msys: converted.msys,
      });

      setIsConverting(false);
    }, PATH_CONFIG.CONVERSION_DEBOUNCE_MS);

    return () => clearTimeout(timeoutId);
  }, [inputText]);

  const setInputText = useCallback((text: string) => {
    setInputTextState(text);
  }, []);

  const clearInput = useCallback(() => {
    setInputTextState('');
    setConversionResult({
      windows: '',
      wsl: '',
      msys: '',
    });
  }, []);

  return {
    inputText,
    conversionResult,
    setInputText,
    clearInput,
    isConverting,
  };
}
