import { useEffect, useMemo, useState } from 'react';
import { useChat } from '../ChatProvider';
import { v4 } from 'uuid';

const uploadAbortControllers: Map<string, AbortController> = new Map();

interface FileWithProgress {
  status: 'pending' | 'uploading' | 'success' | 'error';
  id: string;
  file: File;
  fileUrl?: string;
  progress: number;
  error?: string;
}

function useUploadFiles() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const { api } = useChat();
  function appendFiles(files: File[]) {
    const newFiles = files.map((file) => ({
      file,
      id: v4(),
      status: 'pending' as const,
      progress: 0
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(uploadFile);
  }

  function updateFileById(id: string, update: Partial<FileWithProgress>) {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...update } : f))
    );
  }

  function removeFileById(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const uploadFile = async (fileItem: FileWithProgress) => {
    const controller = new AbortController();
    uploadAbortControllers.set(fileItem.id, controller);

    setFiles((prev) =>
      prev.map((f) =>
        f.id === fileItem.id ? { ...f, status: 'uploading', progress: 0 } : f
      )
    );

    const { data, error } = await api.uploadFile({
      file: fileItem,
      abortSignal: controller.signal
    });

    if (data) {
      updateFileById(fileItem.id, {
        status: 'success',
        fileUrl: data.fileUrl,
        progress: 100
      });
    } else {
      if (!controller.signal.aborted) {
        updateFileById(fileItem.id, {
          status: 'error',
          error: error.message || 'Upload failed',
          progress: 0
        });
      }
    }
    uploadAbortControllers.delete(fileItem.id);
  };

  const handleCancelUpload = (fileId: string) => {
    const controller = uploadAbortControllers.get(fileId);
    if (controller) {
      controller.abort();
      uploadAbortControllers.delete(fileId);
    }
    removeFileById(fileId);
  };

  const successFiles = useMemo(() => {
    return files.filter((f) => f.status === 'success' && f.fileUrl);
  }, [files]);

  function emptyTheFiles() {
    uploadAbortControllers.forEach((controller) => controller.abort());
    uploadAbortControllers.clear();
    setFiles([]);
  }

  useEffect(() => {
    return () => {
      uploadAbortControllers.forEach((controller) => controller.abort());
      uploadAbortControllers.clear();
    };
  }, []);

  return {
    allFiles: files,
    appendFiles,
    handleCancelUpload,
    successFiles,
    emptyTheFiles,
    getFileById: (id: string) => files.find((f) => f.id === id),
    getUploadProgress: (id: string) =>
      files.find((f) => f.id === id)?.progress ?? 0,
    getUploadStatus: (id: string) => files.find((f) => f.id === id)?.status,
    hasErrors: files.some((f) => f.status === 'error'),
    isUploading: files.some((f) => f.status === 'uploading')
  };
}

export { useUploadFiles, type FileWithProgress };