import { useRef, useState } from 'react';
import { UploadCloud, File as FileIcon, X, CheckCircle2, Sparkles } from 'lucide-react';
import { formatBytes } from '@/utils/fileTypes';
import { fileService } from '@/services/fileService';
import Button from './Button';

export default function UploadZone({ onUploaded }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [queue, setQueue] = useState([]); // {id, file, progress, status}

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList);

    for (const file of files) {
      const id = `${file.name}-${Date.now()}`;

      setQueue((q) => [
        ...q,
        { id, file, progress: 0, status: 'uploading' },
      ]);

      try {
        const response = await fileService.uploadFile(file);

        setQueue((q) =>
            q.map((it) =>
                it.id === id
                    ? { ...it, progress: 100, status: 'done' }
                    : it
            )
        );

        onUploaded?.(response);
      } catch (error) {
        setQueue((q) =>
            q.map((it) =>
                it.id === id
                    ? { ...it, status: 'failed' }
                    : it
            )
        );

        console.error(error);
      }
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    if (e.dataTransfer.files?.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeItem = (id) => {
    setQueue((q) => q.filter((it) => it.id !== id));
  };

  return (
      <div className="space-y-4">
        <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300 ${
                dragging
                    ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-950/30 scale-[1.01]'
                    : 'border-slate-300 dark:border-slate-700 hover:border-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/40'
            }`}
        >
          <input
              ref={inputRef}
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.length) {
                  handleFiles(e.target.files);
                }
              }}
          />

          <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 grid place-items-center shadow-glow animate-float">
            <UploadCloud className="h-8 w-8 text-white" />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-slate-800 dark:text-white">
            {dragging ? 'Drop to upload' : 'Drag & drop your files'}
          </h3>

          <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
            or{' '}
            <span className="text-primary-600 dark:text-primary-400 font-medium">
            browse
          </span>{' '}
            from your computer. AI will analyze them automatically.
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {['PDF', 'DOCX', 'PNG', 'MP4', 'ZIP', 'XLSX'].map((t) => (
                <span
                    key={t}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500"
                >
              {t}
            </span>
            ))}
          </div>

          <div className="mt-6">
            <Button variant="gradient" leftIcon={UploadCloud}>
              Upload File
            </Button>
          </div>
        </div>

        {queue.length > 0 && (
            <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 space-y-2">
              {queue.map((item) => (
                  <div
                      key={item.id}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-slate-100 dark:bg-slate-800 grid place-items-center shrink-0">
                      <FileIcon className="h-5 w-5 text-slate-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">
                          {item.file.name}
                        </p>

                        <span className="text-xs text-slate-400 shrink-0">
                    {formatBytes(item.file.size)}
                  </span>
                      </div>

                      <div className="mt-1.5 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-300 ${
                                item.status === 'done'
                                    ? 'bg-emerald-500'
                                    : 'bg-gradient-to-r from-primary-500 to-secondary-500'
                            }`}
                            style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {item.status === 'done' ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Done</span>
                    <Sparkles className="h-3.5 w-3.5 text-primary-500 ml-1" />
                  </span>
                      ) : (
                          <span className="text-xs font-medium text-slate-500">
                    {item.progress.toFixed(0)}%
                  </span>
                      )}

                      <button
                          onClick={() => removeItem(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
              ))}
            </div>
        )}
      </div>
  );
}