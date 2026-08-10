import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FolderOpen, Star, Clock, Trash2, Settings, Upload as UploadIcon, Sparkles } from 'lucide-react';
import FileTable from '@/components/FileTable';
import FileCard from '@/components/FileCard';
import UploadZone from '@/components/UploadZone';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import AIInsightsCard from '@/components/AIInsightsCard';
import StorageCard from '@/components/StorageCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import { fileService } from '@/services/fileService';

function useFiles() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // TODO: Get Files API
    fileService.getFiles().then((f) => { setFiles(f); setLoading(false); });
  }, []);
  return { files, loading, setFiles };
}

export function MyFiles() {
  const { query } = useOutletContext();
  const { files, loading } = useFiles();
  const [view, setView] = useState('table');
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = query
    ? files.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
    : files;

  const onAction = async (action, file) => {
    if (action === 'delete') {
      setConfirmDelete(file);
      return;
    }

    if (action === 'download') {
      try {
        const blob = await fileService.downloadFile(file.id);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = file.originalFileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('File download failed', error);
      }

    }console.log(action, file); // TODO: Rename/Share/View API not implemented in backend yet
    if( action === 'rename') {
      const fileName = window.prompt(
          "Enter new file name:",
          file.originalFileName
      );

      if (!fileName || fileName === file.originalFileName) {
        return;
      }

      try {
        const updatedFile = await fileService.renameFile(
            file.id,
            fileName
        );

        setFiles((prev) =>
            prev.map((item) =>
                item.id === file.id
                    ? updatedFile
                    : item
            )
        );
      } catch (error) {
        console.error(error);
      }


    }

  };

  return (
    <PageShell title="My Files" subtitle={`${filtered.length} files`} icon={FolderOpen}>
      <div className="flex items-center justify-between mb-4">
        <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
          {['table', 'grid'].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${view === v ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-soft' : 'text-slate-500'}`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <LoadingSkeleton count={6} type="row" />
      ) : filtered.length === 0 ? (
        <Card><EmptyState onAction={() => {}} /></Card>
      ) : view === 'table' ? (
        <FileTable files={filtered} onAction={onAction} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((f) => <FileCard key={f.id} file={f} onAction={onAction} />)}
        </div>
      )}
      <ConfirmDialog
        open={!!confirmDelete}
        title="Delete this file?"
        message={`"${confirmDelete?.originalFileName}" will be moved to trash.`}
        confirmLabel="Delete"
        onConfirm={async () => { await fileService.deleteFile(confirmDelete.id); setConfirmDelete(null); }}
        onCancel={() => setConfirmDelete(null)}
      />
    </PageShell>
  );
}

export function Upload() {
  return (
    <PageShell title="Upload" subtitle="Drag & drop or browse files" icon={UploadIcon}>
      <UploadZone />
    </PageShell>
  );
}

export function AIInsights() {
  return (
    <PageShell title="AI Insights" subtitle="Intelligence overview" icon={Sparkles}>
      <div className="space-y-6">
        <AIInsightsCard />
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StorageCard used={68.4} limit={100} filesCount={1284} />
          </div>
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">Recent AI Activity</h3>
              <div className="space-y-3">
                {[
                  ['Summarized Q3 Financial Report.pdf', '2 min ago', 'primary'],
                  ['OCR completed on Invoice_481.pdf', '12 min ago', 'secondary'],
                  ['Detected 2 duplicate images', '1 hour ago', 'rose'],
                  ['Classified 14 images by content', '3 hours ago', 'violet'],
                ].map(([text, time, color], i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className={`h-8 w-8 rounded-lg grid place-items-center ${accentBg(color)}`}>
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 dark:text-slate-200 truncate">{text}</p>
                      <p className="text-xs text-slate-400">{time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function Favorites() {
  const { files, loading } = useFiles();
  return (
    <PageShell title="Favorites" subtitle="Your starred files" icon={Star}>
      {loading ? <LoadingSkeleton count={4} type="row" /> : files.length === 0 ? (
        <Card><EmptyState icon={Star} title="No favorites yet" description="Star files to find them here quickly." actionLabel={null} /></Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {files.slice(0, 4).map((f) => <FileCard key={f.id} file={f} />)}
        </div>
      )}
    </PageShell>
  );
}

export function Recent() {
  const { files, loading } = useFiles();
  return (
    <PageShell title="Recent" subtitle="Recently uploaded files" icon={Clock}>
      {loading ? <LoadingSkeleton count={5} type="row" /> : (
        <FileTable files={[...files].sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))} />
      )}
    </PageShell>
  );
}

export function Trash() {
  const { files, loading } = useFiles();
  return (
    <PageShell title="Trash" subtitle="Files will be deleted after 30 days" icon={Trash2}>
      {loading ? <LoadingSkeleton count={3} type="row" /> : files.length === 0 ? (
        <Card><EmptyState icon={Trash2} title="Trash is empty" description="Deleted files will appear here." actionLabel={null} /></Card>
      ) : (
        <FileTable files={files.slice(0, 3)} />
      )}
    </PageShell>
  );
}

export function SettingsPage() {
  return (
    <PageShell title="Settings" subtitle="Manage your preferences" icon={Settings}>
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Profile</h3>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              <Input label="Full name" defaultValue="Alex Morgan" />
              <Input label="Email" defaultValue="alex@driveai.app" />
            </div>
            <div className="mt-4"><Button>Save changes</Button></div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-white">AI Preferences</h3>
            <div className="mt-4 space-y-3">
              <Toggle label="Auto-summarize uploaded documents" defaultOn />
              <Toggle label="Run OCR on images and scanned PDFs" defaultOn />
              <Toggle label="Detect duplicate files automatically" defaultOn />
              <Toggle label="Classify images with AI vision" />
            </div>
          </Card>
        </div>
        <div>
          <StorageCard used={68.4} limit={100} filesCount={1284} />
        </div>
      </div>
    </PageShell>
  );
}

/* ---------- helpers ---------- */

function PageShell({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 grid place-items-center shadow-glow">
          {Icon && <Icon className="h-5 w-5 text-white" />}
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Card({ children }) {
  return <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft">{children}</div>;
}

function Input({ label, defaultValue }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
      <input
        defaultValue={defaultValue}
        className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400"
      />
    </div>
  );
}

function Toggle({ label, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-slate-700 dark:text-slate-300">{label}</span>
      <button
        onClick={() => setOn((o) => !o)}
        className={`relative h-6 w-11 rounded-full transition-colors ${on ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
        aria-pressed={on}
      >
        <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${on ? 'translate-x-5' : ''}`} />
      </button>
    </div>
  );
}

function accentBg(a) {
  return {
    primary: 'bg-gradient-to-br from-primary-500 to-primary-700',
    secondary: 'bg-gradient-to-br from-secondary-500 to-secondary-700',
    accent: 'bg-gradient-to-br from-accent-500 to-accent-700',
    emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700',
    amber: 'bg-gradient-to-br from-amber-500 to-orange-500',
    rose: 'bg-gradient-to-br from-rose-500 to-red-500',
    violet: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
  }[a] || 'bg-gradient-to-br from-primary-500 to-primary-700';
}
