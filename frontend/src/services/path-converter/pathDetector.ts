import type { PathDetectionResult } from '@/types';

/**
 * Detect the format of a given path
 */
export function detectPathFormat(path: string): PathDetectionResult {
  const trimmedPath = path.trim();

  if (!trimmedPath) {
    return { format: 'unknown', isValid: false };
  }

  // Windows path: C:\path or D:\path
  const windowsRegex = /^([A-Za-z]):[\\\/]/;
  const windowsMatch = trimmedPath.match(windowsRegex);
  if (windowsMatch) {
    return {
      format: 'windows',
      isValid: true,
      driveLetter: windowsMatch[1].toUpperCase(),
      path: trimmedPath,
    };
  }

  // WSL path: /mnt/c/path or /mnt/d/path
  const wslRegex = /^\/mnt\/([a-zA-Z])(\/|$)/;
  const wslMatch = trimmedPath.match(wslRegex);
  if (wslMatch) {
    return {
      format: 'wsl',
      isValid: true,
      driveLetter: wslMatch[1].toUpperCase(),
      path: trimmedPath,
    };
  }

  // MSYS path: /c/path or /d/path
  const msysRegex = /^\/([a-zA-Z])(\/|$)/;
  const msysMatch = trimmedPath.match(msysRegex);
  if (msysMatch) {
    return {
      format: 'msys',
      isValid: true,
      driveLetter: msysMatch[1].toUpperCase(),
      path: trimmedPath,
    };
  }

  // UNC path: \\server\share or //server/share
  const uncRegex = /^(\\\\|\/\/)[^\\\/]+[\\\/][^\\\/]/;
  if (uncRegex.test(trimmedPath)) {
    return {
      format: 'unc',
      isValid: true,
      path: trimmedPath,
    };
  }

  return { format: 'unknown', isValid: false, path: trimmedPath };
}
