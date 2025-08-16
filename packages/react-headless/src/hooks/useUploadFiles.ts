import { useCallback, useEffect, useMemo, useState } from 'react';
import { useWidget } from '../WidgetProvider';
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
  const {
    widgetCtx: { api },
  } = useWidget();

  const appendFiles = useCallback((files: File[]) => {
    const newFiles = files.map((file) => ({
      file,
      id: v4(),
      status: 'pending' as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(uploadFile);
  }, []);

  const updateFileById = useCallback(
    (id: string, update: Partial<FileWithProgress>) => {
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...update } : f)),
      );
    },
    [],
  );

  const removeFileById = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const uploadFile = useCallback(
    async (fileItem: FileWithProgress) => {
      const controller = new AbortController();
      uploadAbortControllers.set(fileItem.id, controller);

      try {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileItem.id
              ? { ...f, status: 'uploading', progress: 0 }
              : f,
          ),
        );

        const response = await api.uploadFile({
          file: fileItem.file,
          abortSignal: controller.signal,
          onProgress: (percentage) => {
            updateFileById(fileItem.id, { progress: percentage });
          },
        });

        updateFileById(fileItem.id, {
          status: 'success',
          fileUrl: response.fileUrl,
          progress: 100,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          updateFileById(fileItem.id, {
            status: 'error',
            error: error instanceof Error ? error.message : 'Upload failed',
            progress: 0,
          });
        }
      } finally {
        uploadAbortControllers.delete(fileItem.id);
      }
    },
    [api, updateFileById, removeFileById],
  );

  const handleCancelUpload = useCallback(
    (fileId: string) => {
      const controller = uploadAbortControllers.get(fileId);
      if (controller) {
        controller.abort();
        uploadAbortControllers.delete(fileId);
      }
      removeFileById(fileId);
    },
    [removeFileById],
  );

  const successFiles = useMemo(() => {
    return files.filter((f) => f.status === 'success' && f.fileUrl);
  }, [files]);

  const emptyTheFiles = useCallback(() => {
    uploadAbortControllers.forEach((controller) => controller.abort());
    uploadAbortControllers.clear();
    setFiles([]);
  }, []);

  useEffect(() => {
    return () => {
      uploadAbortControllers.forEach((controller) => controller.abort());
      uploadAbortControllers.clear();
    };
  }, []);

  return useMemo(
    () => ({
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
      isUploading: files.some((f) => f.status === 'uploading'),
    }),
    [files, appendFiles, handleCancelUpload, successFiles, emptyTheFiles],
  );
}

export { useUploadFiles, type FileWithProgress };
