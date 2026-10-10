import { useCallback, useRef, useState } from 'react';
import { Upload, X, ImageIcon, Zap, Loader2, AlertCircle, RotateCcw } from 'lucide-react';
import type { AnalysisResult } from '@/types';
import { AnalysisResults } from './AnalysisResults';
import { analyzeScreenshot } from '@/services/gemini';
import { compressImage, type CompressedImage } from '@/utils/imageCompression';

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_FORMATS = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

type Status = 'idle' | 'uploading' | 'analyzing' | 'success' | 'error';

interface ScreenshotUploaderProps {
  onSaveToHistory?: (result: AnalysisResult, preview: string | null) => void;
}

export function ScreenshotUploader({ onSaveToHistory }: ScreenshotUploaderProps = {}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const compressedRef = useRef<CompressedImage | null>(null);

  const validateFile = (f: File): string | null => {
    if (!ACCEPTED_FORMATS.includes(f.type)) {
      return 'Unsupported format. Please upload PNG, JPG, JPEG, or WEBP.';
    }
    if (f.size > MAX_FILE_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleFile = useCallback(async (f: File) => {
    const err = validateFile(f);
    if (err) {
      setError(err);
      setStatus('error');
      return;
    }
    setError('');
    setFile(f);
    setResult(null);
    setStatus('idle');
    compressedRef.current = null;

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);

    try {
      const compressed = await compressImage(f);
      compressedRef.current = compressed;
    } catch {
      // Compression failed — fallback to raw FileReader on analyze
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    setStatus('idle');
    compressedRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setStatus('analyzing');
    setError('');

    try {
      let imageData: CompressedImage;

      if (compressedRef.current) {
        imageData = compressedRef.current;
      } else {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => reject(new Error('Could not read the image file.'));
          reader.readAsDataURL(file);
        });
        imageData = { base64: dataUrl.split(',')[1], mimeType: file.type };
      }

      const analysisResult = await analyzeScreenshot(imageData.base64, imageData.mimeType);

      setResult(analysisResult);
      setStatus('success');
      if (onSaveToHistory) {
        onSaveToHistory(analysisResult, preview);
      }
    } catch (err) {
      console.error('[Snap2Do] Screenshot analysis failed:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'We couldn\'t analyze this screenshot. Please try again.'
      );
      setStatus('error');
    }
  };

  if (status === 'success' && result) {
    return (
      <AnalysisResults
        result={result}
        preview={preview}
        onReset={handleRemove}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`card p-6 sm:p-8 transition-all duration-300 ${
          isDragging ? 'ring-2 ring-accent-500 scale-[1.02]' : ''
        }`}
      >
        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="border-2 border-dashed rounded-xl p-8 sm:p-12 text-center transition-all duration-300 cursor-pointer hover:border-accent-500 hover:bg-tertiary"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            aria-label="Upload screenshot by clicking or dragging"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-tertiary flex items-center justify-center">
              <Upload className="w-8 h-8 text-accent-500" />
            </div>
            <p className="text-lg font-semibold mb-1">
              Drop your screenshot here
            </p>
            <p className="text-sm text-secondary mb-4">or</p>
            <span className="btn-primary inline-flex text-sm">
              <ImageIcon className="w-4 h-4" />
              Choose Screenshot
            </span>
            <p className="text-xs text-muted mt-4">
              PNG • JPG • JPEG • WEBP — Max 10MB
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative group">
              <img
                src={preview}
                alt="Screenshot preview"
                className="w-full max-h-80 object-contain rounded-xl bg-tertiary"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/60 backdrop-blur flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-secondary truncate">
                {file?.name}
              </p>
              <button
                onClick={handleRemove}
                className="text-sm text-secondary hover:text-red-500 transition-colors flex items-center gap-1 shrink-0"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_FORMATS.join(',')}
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {preview && status !== 'analyzing' && (
          <button
            onClick={handleAnalyze}
            className="btn-primary w-full mt-4"
          >
            <Zap className="w-5 h-5" />
            Analyze Screenshot — Free
          </button>
        )}

        {status === 'analyzing' && (
          <div className="mt-4 flex items-center justify-center gap-3 py-3">
            <Loader2 className="w-5 h-5 text-accent-500 animate-spin" />
            <span className="text-sm text-secondary">AI is analyzing your screenshot...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-500">{error}</p>
              <div className="flex items-center gap-3 mt-2">
                <button
                  onClick={handleAnalyze}
                  className="text-sm font-medium text-accent-500 hover:text-accent-400 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Try again
                </button>
                <button
                  onClick={handleRemove}
                  className="text-sm text-red-500/80 hover:text-red-500 flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Different screenshot
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-xs text-muted mt-4">
        No Login • No Signup • No Credit Card
      </p>
    </div>
  );
}
