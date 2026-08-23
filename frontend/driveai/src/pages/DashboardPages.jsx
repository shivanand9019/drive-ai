import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import {
  FolderOpen,
  Star,
  Clock,
  Trash2,
  Settings,
  Upload as UploadIcon,
  Sparkles
} from 'lucide-react';

import FileTable from '@/components/FileTable';
import FileCard from '@/components/FileCard';
import UploadZone from '@/components/UploadZone';
import EmptyState from '@/components/EmptyState';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import AIInsightsCard from '@/components/AIInsightsCard';
import StorageCard from '@/components/StorageCard';
import ConfirmDialog from '@/components/ConfirmDialog';
import { fileService } from '@/services/fileService';
import Button from "@/components/Button.jsx";
import FileDetailsDialog from "@/components/FileDetailsDialog.jsx";
import ShareDialog from "@/components/SharedFileDialog.jsx";


/* =========================================================
   MY FILES
========================================================= */

export function MyFiles() {

  const { query } = useOutletContext();

  const [view, setView] = useState('table');
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [permanentDeleteFile, setPermanentDeleteFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [shareFile, setShareFile] = useState(null);


  /* ---------------- LOAD FILES ---------------- */

  const loadFiles = async () => {

    try {

      setLoading(true);

      if (query.trim() === "") {

        const response = await fileService.getFiles(page, 20);

        setFiles(response.content);
        setTotalPages(response.totalPages);

      } else {

        const response = await fileService.searchFiles(
            query,
            page,
            20
        );

        setFiles(response.content);
        setTotalPages(response.totalPages);
      }

    } catch (error) {

      console.error("Failed to load files:", error);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadFiles();
  }, [page, query]);


  useEffect(() => {
    setPage(0);
  }, [query]);


  /* ---------------- ACTION HANDLER ---------------- */

  const onAction = async (action, file) => {

    /*
     * IMPORTANT:
     * FileCard calls this after favorite/unfavorite.
     */
    if (action === "refresh") {
      await loadFiles();
      return;
    }


    /* DOWNLOAD */

    if (action === "download") {

      try {

        const blob = await fileService.downloadFile(file.id);

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = file.originalFileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

      } catch (error) {

        console.error("File download failed:", error);

      }

      return;
    }


    /* DELETE */

    if (action === "delete") {

      setConfirmDelete(file);

      return;
    }


    /* VIEW */

    if (action === "view") {

      setSelectedFile(file);

      return;
    }


    /* RENAME */

    if (action === "rename") {

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

        console.error("Rename failed:", error);

      }

      return;
    }


    console.log(action, file);


    if (action === "share") {
      setShareFile(file);
      return;


    }
  }


  return (
      <PageShell
          title="My Files"
          subtitle={`${files.length} files`}
          icon={FolderOpen}
      >

        {/* VIEW SWITCHER */}

        <div className="flex items-center justify-between mb-4">

          <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">

            {['table', 'grid'].map((v) => (

                <button
                    key={v}
                    onClick={() => setView(v)}
                    className={`
                px-3 py-1.5
                rounded-lg
                text-xs
                font-medium
                capitalize
                transition-all
                ${
                        view === v
                            ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-white shadow-soft'
                            : 'text-slate-500'
                    }
              `}
                >
                  {v}
                </button>

            ))}

          </div>

        </div>


        {/* FILES */}

        {loading ? (

            <LoadingSkeleton
                count={6}
                type="row"
            />

        ) : files.length === 0 ? (

            <Card>
              <EmptyState onAction={() => {}} />
            </Card>

        ) : view === 'table' ? (

            <FileTable
                files={files}
                onAction={onAction}
            />

        ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {files.map((file) => (

                  <FileCard
                      key={file.id}
                      file={file}
                      onAction={onAction}
                  />

              ))}

            </div>

        )}


        {/* PAGINATION */}

        {totalPages > 1 && (

            <div className="flex justify-center items-center gap-4 mt-6">

              <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-slate-500">
            Page {page + 1} of {totalPages}
          </span>

              <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>

            </div>

        )}


        {/* DELETE DIALOG */}

        <ConfirmDialog
            open={!!confirmDelete}
            title="Delete this file?"
            message={`"${confirmDelete?.originalFileName}" will be moved to trash.`}
            confirmLabel="Delete"

            onConfirm={async () => {

              try {

                await fileService.deleteFile(
                    confirmDelete.id
                );

                setFiles((prev) =>
                    prev.filter(
                        (item) =>
                            item.id !== confirmDelete.id
                    )
                );

                setConfirmDelete(null);

              } catch (error) {

                console.error(
                    "Delete failed:",
                    error
                );

              }

            }}

            onCancel={() => setConfirmDelete(null)}
        />


        {/* FILE DETAILS */}

        <FileDetailsDialog
            file={selectedFile}
            open={selectedFile !== null}
            onClose={() => setSelectedFile(null)}
        />
        <ShareDialog
            file={shareFile}
            open={shareFile !== null}
            onClose={() => setShareFile(null)}
        />
      </PageShell>
  );
}


/* =========================================================
   UPLOAD
========================================================= */

export function Upload() {

  return (
      <PageShell
          title="Upload"
          subtitle="Drag & drop or browse files"
          icon={UploadIcon}
      >
        <UploadZone />
      </PageShell>
  );
}


/* =========================================================
   AI INSIGHTS
========================================================= */

export function AIInsights() {

  return (
      <PageShell
          title="AI Insights"
          subtitle="Intelligence overview"
          icon={Sparkles}
      >

        <div className="space-y-6">

          <AIInsightsCard />

          <div className="grid lg:grid-cols-3 gap-6">

            <div className="lg:col-span-1">
              <StorageCard
                  used={68.4}
                  limit={100}
                  filesCount={1284}
              />
            </div>

            <div className="lg:col-span-2">

              <Card>

                <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-3">
                  Recent AI Activity
                </h3>

                <div className="space-y-3">

                  {[
                    ['Summarized Q3 Financial Report.pdf', '2 min ago', 'primary'],
                    ['OCR completed on Invoice_481.pdf', '12 min ago', 'secondary'],
                    ['Detected 2 duplicate files', '1 hour ago', 'rose'],
                    ['Classified 14 images by content', '3 hours ago', 'violet'],
                  ].map(([text, time, color], i) => (

                      <div
                          key={i}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >

                        <div
                            className={`h-8 w-8 rounded-lg grid place-items-center ${accentBg(color)}`}
                        >
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>

                        <div className="flex-1 min-w-0">

                          <p className="text-sm text-slate-700 dark:text-slate-200 truncate">
                            {text}
                          </p>

                          <p className="text-xs text-slate-400">
                            {time}
                          </p>

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


/* =========================================================
   FAVORITES
========================================================= */

export function Favorites() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);


  /* ---------------- LOAD FAVORITES ---------------- */

  const loadFavoriteFiles = async () => {

    try {

      setLoading(true);

      const response =
          await fileService.getFavoriteFiles(
              page,
              20
          );

      /*
       * Everything returned from this endpoint
       * is a favorite.
       *
       * This also protects the UI if the backend
       * response doesn't explicitly contain the
       * boolean.
       */
      const favoriteFiles =
          response.content.map((file) => ({
            ...file,
            isFavorite: true
          }));

      setFiles(favoriteFiles);

      setTotalPages(response.totalPages);

    } catch (error) {

      console.error(
          "Failed to load favorite files:",
          error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadFavoriteFiles();
  }, [page]);


  /* ---------------- FAVORITE ACTION ---------------- */

  const handleFavoriteAction = async (
      action,
      file
  ) => {

    if (action === "refresh") {

      /*
       * Re-fetch favorites.
       *
       * If the user unfavorited a file,
       * backend will no longer return it.
       */
      await loadFavoriteFiles();

      return;
    }


    /* Download also works inside Favorites */

    if (action === "download") {

      try {

        const blob =
            await fileService.downloadFile(file.id);

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            file.originalFileName;

        document.body.appendChild(link);

        link.click();

        link.remove();

        window.URL.revokeObjectURL(url);

      } catch (error) {

        console.error(
            "File download failed:",
            error
        );

      }

      return;
    }

  };


  return (
      <PageShell
          title="Favorites"
          subtitle="Your starred files"
          icon={Star}
      >

        {loading ? (

            <LoadingSkeleton
                count={4}
                type="row"
            />

        ) : files.length === 0 ? (

            <Card>

              <EmptyState
                  icon={Star}
                  title="No favorites yet"
                  description="Star files to find them here quickly."
                  actionLabel={null}
              />

            </Card>

        ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

              {files.map((file) => (

                  <FileCard
                      key={file.id}
                      file={file}
                      onAction={handleFavoriteAction}
                  />

              ))}

            </div>

        )}


        {/* PAGINATION */}

        {totalPages > 1 && (

            <div className="flex justify-center items-center gap-4 mt-6">

              <button
                  disabled={page === 0}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-slate-500">
            Page {page + 1} of {totalPages}
          </span>

              <button
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 rounded-lg border disabled:opacity-50"
              >
                Next
              </button>

            </div>

        )}

      </PageShell>
  );
}


  // RECENT

export function Recent() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const loadRecentFiles = async () => {
    try {
      setLoading(true);

      const response = await fileService.getRecentFiles(page, 20);

      setFiles(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Failed to load recent files:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecentFiles();
  }, [page]);

  return (
      <PageShell
          title="Recent"
          subtitle="Recently uploaded files"
          icon={Clock}
      >
        {loading ? (
            <LoadingSkeleton count={5} type="row" />
        ) : files.length === 0 ? (
            <Card>
              <EmptyState
                  icon={Clock}
                  title="No recent files"
                  description="Recently uploaded files will appear here."
                  actionLabel={null}
              />
            </Card>
        ) : (
            <>
              <FileTable files={files} />

              {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-6">
                    <button
                        disabled={page === 0}
                        onClick={() => setPage((p) => p - 1)}
                        className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <span className="text-sm text-slate-500">
                Page {page + 1} of {totalPages}
              </span>

                    <button
                        disabled={page >= totalPages - 1}
                        onClick={() => setPage((p) => p + 1)}
                        className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
              )}
            </>
        )}
      </PageShell>
  );
}



//  TRASH

export function Trash() {

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [permanentDeleteFile, setPermanentDeleteFile] = useState(null);


  const loadTrashFiles = async () => {

    try {

      setLoading(true);

      const response =
          await fileService.getTrashFiles(
              page,
              20
          );

      setFiles(response.content);
      setTotalPages(response.totalPages);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {
    loadTrashFiles();
  }, [page]);


  const handleAction = async (
      action,
      file
  ) => {

    if (action === "restore") {

      try {

        await fileService.restoreFile(
            file.id
        );

        setFiles((prev) =>
            prev.filter(
                (item) =>
                    item.id !== file.id
            )
        );

      } catch (error) {

        console.error(error);

      }

      return;
    }


    if (action === "permanentDelete") {

      setPermanentDeleteFile(file);

      return;
    }

  };


  return (
      <PageShell
          title="Trash"
          subtitle="Files will be deleted after 30 days"
          icon={Trash2}
      >

        {loading ? (

            <LoadingSkeleton
                count={3}
                type="row"
            />

        ) : files.length === 0 ? (

            <Card>

              <EmptyState
                  icon={Trash2}
                  title="Trash is empty"
                  description="Deleted files will appear here."
                  actionLabel={null}
              />

            </Card>

        ) : (

            <>

              <FileTable
                  files={files}
                  onAction={handleAction}
                  trash
              />

              {totalPages > 1 && (

                  <div className="flex justify-center items-center gap-4 mt-6">

                    <button
                        disabled={page === 0}
                        onClick={() =>
                            setPage((p) => p - 1)
                        }
                        className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Previous
                    </button>

                    <span className="text-sm text-slate-500">
                Page {page + 1} of {totalPages}
              </span>

                    <button
                        disabled={
                            page >= totalPages - 1
                        }
                        onClick={() =>
                            setPage((p) => p + 1)
                        }
                        className="px-4 py-2 rounded-lg border disabled:opacity-50"
                    >
                      Next
                    </button>

                  </div>

              )}

            </>

        )}


        <ConfirmDialog
            open={!!permanentDeleteFile}
            title="Delete permanently?"
            message={`"${permanentDeleteFile?.originalFileName}" will be permanently deleted. This action cannot be undone.`}
            confirmLabel="Delete Permanently"
            danger

            onConfirm={async () => {

              try {

                await fileService.deletePermanently(
                    permanentDeleteFile.id
                );

                setFiles((prev) =>
                    prev.filter(
                        (item) =>
                            item.id !== permanentDeleteFile.id
                    )
                );

                setPermanentDeleteFile(null);

              } catch (error) {

                console.error(
                    "Permanent delete failed:",
                    error
                );

              }

            }}

            onCancel={() =>
                setPermanentDeleteFile(null)
            }
        />


      </PageShell>
  );
}


/* =========================================================
   SETTINGS
========================================================= */

export function SettingsPage() {

  return (
      <PageShell
          title="Settings"
          subtitle="Manage your preferences"
          icon={Settings}
      >

        <div className="grid lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            <Card>

              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                Profile
              </h3>

              <div className="mt-4 grid sm:grid-cols-2 gap-4">

                <Input
                    label="Full name"
                    defaultValue="Alex Morgan"
                />

                <Input
                    label="Email"
                    defaultValue="alex@driveai.app"
                />

              </div>

              <div className="mt-4">
                <Button>
                  Save changes
                </Button>
              </div>

            </Card>


            <Card>

              <h3 className="text-sm font-semibold text-slate-800 dark:text-white">
                AI Preferences
              </h3>

              <div className="mt-4 space-y-3">

                <Toggle
                    label="Auto-summarize uploaded documents"
                    defaultOn
                />

                <Toggle
                    label="Run OCR on images and scanned PDFs"
                    defaultOn
                />

                <Toggle
                    label="Detect duplicate files automatically"
                    defaultOn
                />

                <Toggle
                    label="Classify images with AI vision"
                />

              </div>

            </Card>

          </div>


          <div>

            <StorageCard
                used={68.4}
                limit={100}
                filesCount={1284}
            />

          </div>

        </div>

      </PageShell>
  );
}




function PageShell({
                     title,
                     subtitle,
                     icon: Icon,
                     children
                   }) {

  return (
      <div className="space-y-6 animate-fade-in">

        <div className="flex items-center gap-3">

          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 grid place-items-center shadow-glow">

            {Icon && (
                <Icon className="h-5 w-5 text-white" />
            )}

          </div>

          <div>

            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {title}
            </h1>

            {subtitle && (
                <p className="text-sm text-slate-500">
                  {subtitle}
                </p>
            )}

          </div>

        </div>

        {children}

      </div>
  );
}


function Card({ children }) {

  return (
      <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 shadow-soft">
        {children}
      </div>
  );
}


function Input({
                 label,
                 defaultValue
               }) {

  return (
      <div>

        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
          {label}
        </label>

        <input
            defaultValue={defaultValue}
            className="w-full h-11 px-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400"
        />

      </div>
  );
}


function Toggle({
                  label,
                  defaultOn = false
                }) {

  const [on, setOn] = useState(defaultOn);

  return (
      <div className="flex items-center justify-between py-2">

      <span className="text-sm text-slate-700 dark:text-slate-300">
        {label}
      </span>

        <button
            onClick={() =>
                setOn((o) => !o)
            }
            className={`relative h-6 w-11 rounded-full transition-colors ${
                on
                    ? 'bg-primary-600'
                    : 'bg-slate-300 dark:bg-slate-700'
            }`}
            aria-pressed={on}
        >

        <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                on
                    ? 'translate-x-5'
                    : ''
            }`}
        />

        </button>

      </div>
  );
}


function accentBg(a) {

  return {
        primary:
            'bg-gradient-to-br from-primary-500 to-primary-700',

        secondary:
            'bg-gradient-to-br from-secondary-500 to-secondary-700',

        accent:
            'bg-gradient-to-br from-accent-500 to-accent-700',

        emerald:
            'bg-gradient-to-br from-emerald-500 to-emerald-700',

        amber:
            'bg-gradient-to-br from-amber-500 to-orange-500',

        rose:
            'bg-gradient-to-br from-rose-500 to-red-500',

        violet:
            'bg-gradient-to-br from-violet-500 to-fuchsia-600',

      }[a] ||
      'bg-gradient-to-br from-primary-500 to-primary-700';
}