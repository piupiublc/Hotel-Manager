/**
 * Helper to handle image URLs from backend, including physical Windows paths
 */
export const getImageUrl = (url: string | null | undefined) => {
  if (!url) return null;
  
  // Define base URL once
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "https://staymaster.somee.com/api";
  const baseUrl = apiBaseUrl.replace(/\/api\/?$/, '');

  // 0. Handle cases where the backend returns hardcoded localhost URLs
  if (url.startsWith('http')) {
    // If it's a localhost/127.0.0.1 URL, redirect it to the production baseUrl
    if (url.includes('localhost:5000') || url.includes('127.0.0.1:5000')) {
      const parts = url.split('/uploads/');
      if (parts.length > 1) {
        return `${baseUrl}/uploads/${parts[1]}`;
      }
    }
    return url;
  }
  
  let path = url;
  
  // 1. Normalize all slashes to forward slashes
  path = path.replace(/\\/g, '/');

  // 2. Handle physical Windows paths or absolute paths containing "uploads"
  // Look for the "uploads" segment (case-insensitive)
  const uploadsRegex = /\/?uploads\/(.*)/i;
  const match = path.match(uploadsRegex);
  
  if (match) {
    // We found "uploads", so we use that as the starting point
    path = '/uploads/' + match[1];
  } else {
    // If no "uploads" is found, but it looks like a relative path, ensure it starts with /
    if (!path.startsWith('/')) path = '/' + path;
  }

  // Optional: Debug logging can be enabled here if needed
  // console.log(`[getImageUrl] input: ${url} -> output: ${baseUrl}${path}`);

  return `${baseUrl}${path}`;
};
