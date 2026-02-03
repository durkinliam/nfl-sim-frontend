const NUMERIC_KEYS = new Set(['wins', 'make_playoffs', 'win_div', 'win_conf', 'win_sb']);

export function parseNumeric(value) {
  if (value === undefined || value === null || value === '') return Infinity;
  const n = Number(value);
  return Number.isFinite(n) ? n : Infinity;
}

export function compareByKey(a, b, key, dir = 1) {
  const av = a?.[key];
  const bv = b?.[key];
  if (NUMERIC_KEYS.has(key)) {
    const an = parseNumeric(av);
    const bn = parseNumeric(bv);
    if (an !== bn) return dir * (an - bn);
    return 0;
  }
  const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: 'base' });
  return dir * cmp;
}

export function resolveTableElements(root) {
  if (!root || typeof root.querySelector !== 'function') return null;
  const table = root.querySelector('table.standings');
  if (!table || typeof table.querySelector !== 'function') return null;
  const tbody = table.querySelector('tbody');
  if (!tbody) return null;
  const headerCells = Array.from(table.querySelectorAll?.('thead th') ?? []);
  return { table, tbody, headerCells };
}
