export const APP_CONFIG = {
  WINDOW_WIDTH: 800,
  WINDOW_HEIGHT: 600,
  MIN_WIDTH: 600,
  MIN_HEIGHT: 500,
} as const;

export const PATH_CONFIG = {
  MAX_PATH_LENGTH: 32767,
  CONVERSION_DEBOUNCE_MS: 150,
  COPY_FEEDBACK_DURATION_MS: 2000,
} as const;

export const KEYBOARD_SHORTCUTS = {
  PASTE: 'Ctrl+V',
  CLEAR: 'Ctrl+Shift+C',
  COPY_WINDOWS: 'Ctrl+1',
  COPY_WSL: 'Ctrl+2',
  COPY_MSYS: 'Ctrl+3',
  QUIT: 'Ctrl+Q',
} as const;

export const PATH_FORMATS = {
  WINDOWS: 'windows',
  WSL: 'wsl',
  MSYS: 'msys',
  UNC: 'unc',
  UNKNOWN: 'unknown',
} as const;
