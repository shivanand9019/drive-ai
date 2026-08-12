import { useEffect } from 'react';
import {AlertTriangle, FileIcon, X} from 'lucide-react';
import Button from './Button';
import {formatBytes, formatDate} from "@/utils/fileTypes.js";
import Badge from "@/components/Badge.jsx";

export default function FileDetailsDialog({
                                          file,open, onClose
                                      }) {
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float animate-scale-in overflow-hidden">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
                            File Details
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">
                            Information about this file
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* File identity */}
                <div className="px-6 py-5 flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center">
                        <FileIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="font-semibold text-slate-800 dark:text-white truncate">
                            {file.originalFileName}
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                            {file.contentType}
                        </p>
                    </div>
                </div>

                {/* Details */}
                <div className="px-6 pb-5 space-y-3">
                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-500">File name</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200 max-w-[220px] truncate">
            {file.originalFileName}
          </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-500">Type</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {file.contentType}
          </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-500">Size</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {formatBytes(file.fileSize)}
          </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-500">Uploaded</span>
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {formatDate(file.uploadedAt)}
          </span>
                    </div>

                    <div className="flex items-center justify-between py-2">
                        <span className="text-sm text-slate-500">Status</span>
                        <Badge color="green" dot>
                            {file.status}
                        </Badge>
                    </div>

          {/*          <div className="flex items-center justify-between py-2">*/}
          {/*              <span className="text-sm text-slate-500">File ID</span>*/}
          {/*              <span*/}
          {/*                  className="text-xs font-mono text-slate-400 max-w-[220px] truncate"*/}
          {/*                  title={file.id}*/}
          {/*              >*/}
          {/*  {file.id}*/}
          {/*</span>*/}
          {/*          </div>*/}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
}
