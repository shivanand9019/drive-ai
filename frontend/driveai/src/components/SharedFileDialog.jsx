import { useState } from "react";
import { X, Share2 } from "lucide-react";
import Button from "./Button";
import { fileService } from "@/services/fileService.js";

export default function ShareDialog({ file, open, onClose }) {
    const [recipientEmail, setRecipientEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const[sharing,setSharing] = useState(false);



    if (!open || !file) return null;

    const handleShare = async () => {
        if (!recipientEmail.trim()) return;

        try {
            setSharing(true);
            setError("");
            setSuccess(false);
            setLoading(true);

            await fileService.shareFile(file.id, recipientEmail.trim());
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
            }, 1200);



            setRecipientEmail("");
            onClose();
        } catch (error) {
            console.error("Failed to share file:", error);
            setError(error.response?.data ||"Failed to share file");
        } finally {
            setSharing(false);
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-float p-6">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="h-12 w-12 rounded-2xl bg-primary-50 dark:bg-primary-950/40 grid place-items-center">
                    <Share2 className="h-6 w-6 text-primary-600" />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-800 dark:text-white">
                    Share file
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 truncate">
                    {file.originalFileName}
                </p>

                <label className="block mt-5 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email address
                </label>

                <input
                    type="email"
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value)}
                    placeholder="user@example.com"
                    className="mt-2 w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                />
                {success && (
                    <p className="mt-3 text-sm text-green-600">
                        File shared successfully.
                    </p>
                )}

                {error && (
                    <p className="mt-3 text-sm text-rose-600">
                        {error}
                    </p>
                )}

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="secondary"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleShare}
                        disabled={loading || !recipientEmail.trim()
                    ||sharing}
                    >
                        {loading ? "Sharing..." : "Share"}
                    </Button>
                </div>

            </div>
        </div>
    );
}