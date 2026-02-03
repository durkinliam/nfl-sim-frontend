export function decodeContentsJson(contents) {
  if (!contents || contents.encoding !== 'base64' || !contents.content) return null;
  try {
    const decoded = Buffer.from(contents.content, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
