import { useEffect, useState } from "react";
import {
    File as FileIcon,
    MoreHorizontal,
    Download,
    Sparkles,
    Star
} from "lucide-react";

import Badge from "./Badge";
import {
    getFileMeta,
    formatBytes,
    formatDate
} from "@/utils/fileTypes";

import {
    favoriteFile,
    unFavoriteFile
} from "@/services/fileService.js";

export default function FileCard({ file, onAction }) {
    const meta = getFileMeta(file.originalFileName);

    const [isFavorite, setIsFavorite] = useState(
        Boolean(file.isFavorite)
    );

    // Keep local state synchronized with backend data
    useEffect(() => {
        setIsFavorite(Boolean(file.isFavorite));
    }, [file.isFavorite]);

    const handleFavorite = async () => {
        try {
            if (file.isFavorite) {
                await unFavoriteFile(file.id);
            } else {
                await favoriteFile(file.id);
            }

            onAction?.("refresh");
        } catch (error) {
            console.error("Failed to update favorite:", error);
        }
    };

    return (
        <div className="group rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start justify-between">

                <div className={`h-11 w-11 rounded-xl ${meta.bg} grid place-items-center`}>
                    <FileIcon className={`h-5 w-5 ${meta.color}`} />
                </div>

                <button
                    className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <MoreHorizontal className="h-4 w-4" />
                </button>

                <button
                    onClick={handleFavorite}
                    className={`p-2 rounded-lg transition-colors ${
                        file.isFavorite
                            ? "text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30"
                            : "text-slate-400 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-950/30"
                    }`}
                    aria-label={file.isFavorite ? "Unfavorite" : "Favorite"}
                >
                    <Star
                        className={`h-4 w-4 transition-all duration-200 ${
                            file.isFavorite
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-slate-400"
                        }`}
                    />
                </button>

            </div>

            <h4 className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                {file.originalFileName}
            </h4>

            <p className="mt-0.5 text-xs text-slate-400">
                {meta.label} · {formatBytes(file.fileSize)}
            </p>

            <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                    {formatDate(file.uploadedAt)}
                </span>

                {file.aiStatus && file.aiStatus !== "Pending" && (
                    <Badge color="primary" size="sm">
                        <Sparkles className="h-3 w-3" />
                        {file.aiStatus}
                    </Badge>
                )}
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">

                <Badge
                    color={file.status === "Ready" ? "green" : "amber"}
                    size="sm"
                    dot
                >
                    {file.status}
                </Badge>

                <button
                    onClick={() => onAction?.("download", file)}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-950/40 transition-colors"
                    aria-label="Download"
                >
                    <Download className="h-4 w-4" />
                </button>

            </div>

        </div>
    );
}