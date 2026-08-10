// Central place for file-type colors & icons (icon names map to lucide-react)
export const FILE_TYPES = {
  pdf: { label: 'PDF', color: 'text-rose-600', bg: 'bg-rose-50 dark:bg-rose-950/40', icon: 'FileText' },

  // txt: { label: 'Text', color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-800/60', icon: 'FileText' },
  // xls: { label: 'Spreadsheet', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'Sheet' },
  // xlsx: { label: 'Spreadsheet', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'Sheet' },
  // csv: { label: 'CSV', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/40', icon: 'Sheet' },
  // ppt: { label: 'Presentation', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/40', icon: 'Presentation' },
  // pptx: { label: 'Presentation', color: 'text-orange-600', bg: 'bg-orange-50 dark:bg-orange-950/40', icon: 'Presentation' },
  png: { label: 'Image', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  jpg: { label: 'Image', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  jpeg: { label: 'Image', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  // webp: { label: 'Image', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  // gif: { label: 'Image', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  // svg: { label: 'Vector', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/40', icon: 'Image' },
  // mp4: { label: 'Video', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', icon: 'Film' },
  // mov: { label: 'Video', color: 'text-fuchsia-600', bg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40', icon: 'Film' },
  // mp3: { label: 'Audio', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', icon: 'Music' },
  // wav: { label: 'Audio', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/40', icon: 'Music' },
  // zip: { label: 'Archive', color: 'text-yellow-700', bg: 'bg-yellow-50 dark:bg-yellow-950/40', icon: 'FileArchive' },
  // rar: { label: 'Archive', color: 'text-yellow-700', bg: 'bg-yellow-50 dark:bg-yellow-950/40', icon: 'FileArchive' },
  // json: { label: 'Code', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/40', icon: 'Braces' },
  // js: { label: 'Code', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/40', icon: 'Braces' },
  // ts: { label: 'Code', color: 'text-cyan-600', bg: 'bg-cyan-50 dark:bg-cyan-950/40', icon: 'Braces' },
  default: { label: 'File', color: 'text-slate-600', bg: 'bg-slate-100 dark:bg-slate-800/60', icon: 'File' },
};

export function getFileMeta(name) {
  if (!name || typeof name !== 'string') {
    return FILE_TYPES.default;
  }

  const ext = name.split('.').pop()?.toLowerCase() || '';

  return FILE_TYPES[ext] || FILE_TYPES.default;
}

export function formatBytes(bytes) {
  if (!bytes) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

export function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
