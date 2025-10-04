// Path format types
export type PathFormat = 'windows' | 'wsl' | 'msys' | 'unc' | 'unknown';

// Path conversion result
export interface ConvertedPaths {
  windows: string;
  wsl: string;
  msys: string;
}

// Multi-line conversion result
export interface ConversionResult {
  original: string;
  windows: string[];
  wsl: string[];
  msys: string[];
  hasErrors: boolean;
}

// Path detection result
export interface PathDetectionResult {
  format: PathFormat;
  isValid: boolean;
  driveLetter?: string;
  path?: string;
}
