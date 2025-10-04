/**
 * Normalize path separators to the specified type
 */
export function normalizeSeparators(path: string, separator: '/' | '\\'): string {
  if (separator === '/') {
    return path.replace(/\\/g, '/');
  } else {
    return path.replace(/\//g, '\\');
  }
}

/**
 * Extract drive letter from a path (if present)
 */
export function extractDriveLetter(path: string): string | null {
  const windowsMatch = path.match(/^([A-Za-z]):/);
  if (windowsMatch) return windowsMatch[1].toUpperCase();

  const wslMatch = path.match(/^\/mnt\/([a-zA-Z])/);
  if (wslMatch) return wslMatch[1].toUpperCase();

  const msysMatch = path.match(/^\/([a-zA-Z])\//);
  if (msysMatch) return msysMatch[1].toUpperCase();

  return null;
}

/**
 * Check if path has a trailing slash
 */
export function hasTrailingSlash(path: string): boolean {
  return path.endsWith('/') || path.endsWith('\\');
}

/**
 * Ensure path has a trailing slash
 */
export function ensureTrailingSlash(path: string): string {
  if (!path) return path;
  if (hasTrailingSlash(path)) return path;

  // Use the appropriate separator based on path format
  if (path.includes('\\')) {
    return path + '\\';
  } else {
    return path + '/';
  }
}

/**
 * Remove trailing slash from path
 */
export function removeTrailingSlash(path: string): string {
  return path.replace(/[/\\]+$/, '');
}

/**
 * Split multi-line input into individual paths
 */
export function splitPaths(input: string): string[] {
  return input
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}
