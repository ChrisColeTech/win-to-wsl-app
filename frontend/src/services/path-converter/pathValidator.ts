/**
 * Validate if a path is a valid Windows path
 */
export function isValidWindowsPath(path: string): boolean {
  // Windows path must start with drive letter and colon
  const windowsRegex = /^[A-Za-z]:[\\\/]/;
  return windowsRegex.test(path.trim());
}

/**
 * Validate if a path is a valid WSL path
 */
export function isValidWSLPath(path: string): boolean {
  // WSL path must start with /mnt/ followed by drive letter
  const wslRegex = /^\/mnt\/[a-zA-Z](\/|$)/;
  return wslRegex.test(path.trim());
}

/**
 * Validate if a path is a valid MSYS path
 */
export function isValidMSYSPath(path: string): boolean {
  // MSYS path must start with / followed by drive letter
  const msysRegex = /^\/[a-zA-Z]\//;
  return msysRegex.test(path.trim());
}

/**
 * Validate if a path is a valid UNC path
 */
export function isValidUNCPath(path: string): boolean {
  // UNC path must start with \\ or // followed by server and share
  const uncRegex = /^(\\\\|\/\/)[^\\\/]+[\\\/][^\\\/]/;
  return uncRegex.test(path.trim());
}

/**
 * Validate if a drive letter is valid (A-Z)
 */
export function isValidDriveLetter(letter: string): boolean {
  return /^[A-Za-z]$/.test(letter);
}
