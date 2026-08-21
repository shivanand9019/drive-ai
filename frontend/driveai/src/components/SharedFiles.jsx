import { useEffect, useState } from "react";
import { Share2 } from "lucide-react";

import { fileService } from "@/services/fileService.js";
import LoadingSkeleton from "@/components/LoadingSkeleton.jsx";
import EmptyState from "@/components/EmptyState.jsx";
import FileTable from "@/components/FileTable.jsx";

export function SharedFiles() {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const loadSharedFiles = async () => {
            try {
                setLoading(true);

                const response =
                    await fileService.getSharedFiles(page, 20);

                setFiles(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                console.error("Failed to load shared files:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSharedFiles();
    }, [page]);

    return (
        <div className="space-y-6">

            <div>
                <div className="flex items-center gap-3">
                    <Share2 className="h-6 w-6 text-primary-600" />

                    <div>
                        <h1 className="text-2xl font-semibold text-slate-800 dark:text-white">
                            Shared with me
                        </h1>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Files shared with you
                        </p>
                    </div>
                </div>
            </div>

            {loading ? (
                <LoadingSkeleton count={5} type="row" />
            ) : files.length === 0 ? (
                <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8">
                    <EmptyState
                        icon={Share2}
                        title="No shared files"
                        description="Files shared with you will appear here."
                        actionLabel={null}
                    />
                </div>
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
        </div>
    );
}