import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  UploadCloud,
  FileSearch,
  Sparkles,
  FileText,
  Clock,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';

import StorageCard from '@/components/StorageCard';
import StatsCard from '@/components/StatsCard';
import AIInsightsCard from '@/components/AIInsightsCard';
import FileTable from '@/components/FileTable';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import ConfirmDialog from '@/components/ConfirmDialog';
import EmptyState from '@/components/EmptyState';
import Badge from '@/components/Badge';
import Button from '@/components/Button';

import { fileService } from '@/services/fileService';

const QUICK_ACTIONS = [
  { label: 'Upload File', desc: 'Drag & drop or browse', icon: UploadCloud, accent: 'primary' },
  { label: 'Analyze Document', desc: 'Run AI insights', icon: FileText, accent: 'secondary' },
  { label: 'AI Search', desc: 'Ask in plain English', icon: FileSearch, accent: 'accent' },
  { label: 'Recent Files', desc: 'View your latest', icon: Clock, accent: 'violet' },
];

export default function Dashboard() {
  const { user } = useOutletContext();

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const loadFiles = async () => {
    try {
      const response = await fileService.getFiles();
      setFiles(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const handleAction = (action, file) => {
    switch (action) {
      case "download":
        console.log("Download", file);
        break;

      case "rename":
        console.log("Rename", file);
        break;

      case "delete":
        setConfirmDelete(file);
        break;

      default:
        break;
    }
  };

  const confirmDeleteFile = async () => {
    if (!confirmDelete) return;

    try {
      await fileService.deleteFile(confirmDelete.id);

      setFiles((prev) =>
          prev.filter((file) => file.id !== confirmDelete.id)
      );

      setConfirmDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div className="space-y-6 animate-fade-in">

        {/* Welcome Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 p-6 sm:p-8 text-white shadow-float">

          <div className="absolute -top-10 -right-10 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
          <div className="absolute -bottom-16 -left-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex flex-col sm:flex-row justify-between gap-4">

            <div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                Today's AI Summary
              </div>

              <h1 className="mt-3 text-3xl font-bold">
                Welcome, {user?.fullName?.split(" ")[0] || "User"}
              </h1>

              <p className="mt-2 text-white/80">
                Welcome back to DriveAI.
              </p>

            </div>

            <Button
                variant="secondary"
                size="lg"
                rightIcon={ArrowRight}
            >
              View AI Report
            </Button>

          </div>
        </div>

        {/* Storage */}
        <div className="grid lg:grid-cols-3 gap-6">

          <StorageCard
              used={user?.storageUsed ?? 0}
              limit={user?.storageLimit ?? 100}
              filesCount={files.length}
          />

          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">

            <StatsCard
                label="Total Files"
                value={files.length}
                icon={FileText}
                accent="primary"
            />

            <StatsCard
                label="AI Processed"
                value="0"
                icon={Sparkles}
                accent="secondary"
            />

            <StatsCard
                label="Duplicates"
                value="0"
                icon={TrendingUp}
                accent="rose"
            />

            <StatsCard
                label="This Month"
                value="0"
                icon={Clock}
                accent="emerald"
                sublabel="Files uploaded"
            />

          </div>

        </div>

        {/* Quick Actions */}
        <div>

          <h2 className="text-sm font-semibold mb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

            {QUICK_ACTIONS.map((action) => (

                <button
                    key={action.label}
                    className="group rounded-2xl bg-white dark:bg-slate-900 border p-4 text-left hover:shadow-card transition"
                >

                  <div className="h-10 w-10 rounded-xl bg-primary-600 text-white flex items-center justify-center">
                    <action.icon className="h-5 w-5" />
                  </div>

                  <p className="mt-3 font-semibold">
                    {action.label}
                  </p>

                  <p className="text-sm text-slate-500">
                    {action.desc}
                  </p>

                </button>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div>

          <div className="flex justify-between items-center mb-3">

            <h2 className="font-semibold">
              AI Insights
            </h2>

            <Badge color="green" dot>
              Live
            </Badge>

          </div>

          <AIInsightsCard />

        </div>

        {/* Recent Files */}

        <div>

          <div className="flex justify-between items-center mb-3">

            <h2 className="font-semibold">
              Recent Files
            </h2>

            <Button
                variant="ghost"
                size="sm"
                rightIcon={ArrowRight}
            >
              View All
            </Button>

          </div>

          {loading ? (

              <LoadingSkeleton
                  count={5}
                  type="row"
              />

          ) : files.length === 0 ? (

              <div className="rounded-2xl bg-white dark:bg-slate-900 border">

                <EmptyState />

              </div>

          ) : (

              <FileTable
                  files={files.slice(0, 6)}
                  onAction={handleAction}
              />

          )}

        </div>

        <ConfirmDialog
            open={!!confirmDelete}
            title="Delete this file?"
            message={`"${confirmDelete?.originalFileName}" will be moved to trash.`}
            confirmLabel="Delete"
            onConfirm={confirmDeleteFile}
            onCancel={() => setConfirmDelete(null)}
        />

      </div>
  );
}