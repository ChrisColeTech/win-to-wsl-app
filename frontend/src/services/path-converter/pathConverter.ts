import type { PathFormat, ConvertedPaths } from '@/types';
import { detectPathFormat } from './pathDetector';

/**
 * Convert a path from any format to Windows format
 */
export function convertToWindows(path: string, format: PathFormat): string {
  const trimmed = path.trim();

  switch (format) {
    case 'windows':
      // Already Windows format, normalize separators
      return trimmed.replace(/\//g, '\\');

    case 'wsl': {
      // /mnt/c/path -> C:\path
      const match = trimmed.match(/^\/mnt\/([a-zA-Z])(\/.*)?$/);
      if (match) {
        const drive = match[1].toUpperCase();
        const pathPart = (match[2] || '').replace(/\//g, '\\');
        return `${drive}:${pathPart || '\\'}`;
      }
      return trimmed;
    }

    case 'msys': {
      // /c/path -> C:\path
      const match = trimmed.match(/^\/([a-zA-Z])(\/.*)?$/);
      if (match) {
        const drive = match[1].toUpperCase();
        const pathPart = (match[2] || '').replace(/\//g, '\\');
        return `${drive}:${pathPart || '\\'}`;
      }
      return trimmed;
    }

    case 'unc':
      // Keep UNC paths as-is for Windows, just normalize separators
      return trimmed.replace(/\//g, '\\');

    default:
      return trimmed;
  }
}

/**
 * Convert a path from any format to WSL format
 */
export function convertToWSL(path: string, format: PathFormat): string {
  const trimmed = path.trim();

  switch (format) {
    case 'wsl':
      // Already WSL format, normalize separators
      return trimmed.replace(/\\/g, '/');

    case 'windows': {
      // C:\path -> /mnt/c/path
      const match = trimmed.match(/^([A-Za-z]):[\\\/](.*)$/);
      if (match) {
        const drive = match[1].toLowerCase();
        const pathPart = match[2].replace(/\\/g, '/');
        return `/mnt/${drive}/${pathPart}`;
      }
      return trimmed;
    }

    case 'msys': {
      // /c/path -> /mnt/c/path
      const match = trimmed.match(/^\/([a-zA-Z])(\/.*)?$/);
      if (match) {
        const drive = match[1].toLowerCase();
        const pathPart = match[2] || '';
        return `/mnt/${drive}${pathPart}`;
      }
      return trimmed;
    }

    case 'unc':
      // \\server\share -> //server/share
      return trimmed.replace(/\\/g, '/');

    default:
      return trimmed;
  }
}

/**
 * Convert a path from any format to MSYS format
 */
export function convertToMSYS(path: string, format: PathFormat): string {
  const trimmed = path.trim();

  switch (format) {
    case 'msys':
      // Already MSYS format, normalize separators
      return trimmed.replace(/\\/g, '/');

    case 'windows': {
      // C:\path -> /c/path
      const match = trimmed.match(/^([A-Za-z]):[\\\/](.*)$/);
      if (match) {
        const drive = match[1].toLowerCase();
        const pathPart = match[2].replace(/\\/g, '/');
        return `/${drive}/${pathPart}`;
      }
      return trimmed;
    }

    case 'wsl': {
      // /mnt/c/path -> /c/path
      const match = trimmed.match(/^\/mnt\/([a-zA-Z])(\/.*)?$/);
      if (match) {
        const drive = match[1].toLowerCase();
        const pathPart = match[2] || '';
        return `/${drive}${pathPart}`;
      }
      return trimmed;
    }

    case 'unc':
      // \\server\share -> //server/share
      return trimmed.replace(/\\/g, '/');

    default:
      return trimmed;
  }
}

/**
 * Convert a path to all three formats (Windows, WSL, MSYS)
 */
export function convertPath(path: string): ConvertedPaths {
  const detection = detectPathFormat(path);

  if (!detection.isValid) {
    return {
      windows: '',
      wsl: '',
      msys: '',
    };
  }

  return {
    windows: convertToWindows(path, detection.format),
    wsl: convertToWSL(path, detection.format),
    msys: convertToMSYS(path, detection.format),
  };
}
