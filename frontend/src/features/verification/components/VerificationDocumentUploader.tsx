import React, { useState } from 'react';
import { FileUp, File, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { uploadVerificationDocument } from '../api/verification';

interface VerificationDocumentUploaderProps {
  label: string;
  documentType: string;
  currentUrl: string | null;
  onUploadSuccess: () => void;
  required?: boolean;
}

export const VerificationDocumentUploader: React.FC<VerificationDocumentUploaderProps> = ({
  label,
  documentType,
  currentUrl,
  onUploadSuccess,
  required = false
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      await uploadVerificationDocument(documentType, file);
      onUploadSuccess();
    } catch (err) {
      setError('Failed to upload document. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm transition-all hover:border-slate-300 dark:hover:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            {label}
            {required && <span className="text-xs text-red-500 font-normal">Required</span>}
          </h4>
          <p className="text-xs text-slate-500 mt-1">PDF, JPG, or PNG (Max 5MB)</p>
        </div>
        {currentUrl ? (
          <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
            <CheckCircle2 className="w-3 h-3" />
            Uploaded
          </span>
        ) : (
          <span className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">
            Pending
          </span>
        )}
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 text-xs text-red-600 bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-100 dark:border-red-900/50">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      <div className="flex items-center gap-3">
        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <File className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            View Document
          </a>
        )}
        
        <div className={`relative ${currentUrl ? 'flex-1' : 'w-full'}`}>
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={isUploading}
          />
          <div className={`flex items-center justify-center gap-2 text-sm font-medium rounded-lg px-4 py-2 transition-colors border ${
            currentUrl 
              ? 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40' 
              : 'text-white border-blue-600 bg-blue-600 hover:bg-blue-700'
          } ${isUploading ? 'opacity-70' : ''}`}>
            {isUploading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <FileUp className="w-4 h-4" />
            )}
            {currentUrl ? 'Replace' : 'Upload'}
          </div>
        </div>
      </div>
    </div>
  );
};
