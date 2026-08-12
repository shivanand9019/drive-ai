import { useRef, useState, useEffect } from 'react';
import {
  MoreHorizontal, Download, Pencil, Trash2, Share2, Eye, File as FileIcon, RotateCcw, DeleteIcon,
} from 'lucide-react';
import Badge from './Badge';
import { getFileMeta, formatBytes, formatDate } from '@/utils/fileTypes';

function StatusBadge({ status }) {
  if (status === "UPLOADED") {
    return <Badge color="green">Uploaded</Badge>;
  }

  return <Badge color="slate">{status}</Badge>;
}

function AIStatusBadge({ status }) {
  const map = {
    Summarized: 'primary', Indexed: 'blue', Classified: 'violet',
    Tagged: 'violet', Processing: 'amber', Pending: 'slate',
  };
  return <Badge color={map[status] || 'slate'}>{status}</Badge>;
}
const TRASH_ACTIONS = [
  {
    label: 'Restore',
    icon: RotateCcw,
    action: 'restore',


  },
  {
    label: 'Delete Permanently',
    icon : Trash2,
    action: 'permanentDelete',
    danger: true,
  }
];
const ACTIONS = [
  { label: 'View Details', icon: Eye, action: 'view' },
  { label: 'Download', icon: Download, action: 'download' },
  { label: 'Rename', icon: Pencil, action: 'rename' },
  { label: 'Share', icon: Share2, action: 'share' },
  { label: 'Delete', icon: Trash2, action: 'delete', danger: true },
];

export default function FileTable({ files = [], onAction, loading = false ,trash=false}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 shimmer">
            <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-1/3 rounded bg-slate-200 dark:bg-slate-800" />
              <div className="h-2.5 w-1/4 rounded bg-slate-100 dark:bg-slate-800" />
            </div>
            <div className="h-6 w-16 rounded-full bg-slate-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return null;
  }
   console.log("files:", files);
  console.log("isArray:", Array.isArray(files));

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
              <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-5 py-3">File Name</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Type</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Size</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Upload Date</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Status</th>
              <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">AI Status</th>
              <th className="text-right text-xs font-semibold text-slate-500 uppercase tracking-wider px-5 py-3">Actions</th>
            </tr>
          </thead>
      
          <tbody>
             
            {files.map((file) => (
              <FileRow key={file.id} file={file} onAction={onAction} trash={trash} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden divide-y divide-slate-100 dark:divide-slate-800">
        {files.map((file) => (
          <FileMobileRow key={file.id} file={file} onAction={onAction} trash={trash} />
        ))}
      </div>
    </div>
  );
}

function FileRow({ file, onAction ,trash}) {
  const meta = getFileMeta(file.originalFileName)
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <tr className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/20 transition-colors group">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`h-9 w-9 rounded-lg ${meta.bg} grid place-items-center shrink-0`}>
            <FileIcon className={`h-4.5 w-4.5 ${meta.color}`} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate max-w-[220px]">{file.originalFileName}</p>
            <p className="text-xs text-slate-400">{file.owner || 'You'}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-3.5">
        <span className="text-sm text-slate-600 dark:text-slate-300">{meta.label}</span>
      </td>
      <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{formatBytes(file.fileSize)}</td>
      <td className="px-5 py-3.5 text-sm text-slate-600 dark:text-slate-300">{formatDate(file.uploadedAt)}</td>
      <td className="px-5 py-3.5"><StatusBadge status={file.status} /></td>
      <td className="px-5 py-3.5"><AIStatusBadge status={file.aiStatus} /></td>
      <td className="px-5 py-3.5 text-right">
        <div className="relative inline-block" ref={ref}>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="File actions"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card p-1.5 z-20 animate-scale-in origin-top-right">
              {(trash ? TRASH_ACTIONS:ACTIONS).map((a) => (
                <button
                  key={a.action}
                  onClick={() => { setOpen(false); onAction?.(a.action, file); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    a.danger
                      ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <a.icon className="h-4 w-4" /> {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function FileMobileRow({ file, onAction ,trash}) {
  const meta = getFileMeta(file.originalFileName);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-3">
        <div className={`h-10 w-10 rounded-lg ${meta.bg} grid place-items-center shrink-0`}>
          <FileIcon className={`h-5 w-5 ${meta.color}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">{file.originalFileName}</p>
          <p className="text-xs text-slate-400">{meta.label} · {formatBytes(file.fileSize)} · {formatDate(file.uploadedAt)}</p>
        </div>
        <div className="relative" ref={ref}>
          <button onClick={() => setOpen((o) => !o)} className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
            <MoreHorizontal className="h-5 w-5" />
          </button>
          {open && (
            <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-card p-1.5 z-20 animate-scale-in origin-top-right">
              {(trash ? TRASH_ACTIONS:ACTIONS).map((a) => (
                <button
                  key={a.action}
                  onClick={() => { setOpen(false); onAction?.(a.action, file); }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                    a.danger
                      ? 'text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <a.icon className="h-4 w-4" /> {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 pl-13">
        <StatusBadge status={file.status} />
        <AIStatusBadge status={file.aiStatus} />
      </div>
    </div>
  );
}
