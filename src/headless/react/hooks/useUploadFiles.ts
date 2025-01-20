import { useEffect, useMemo, useState } from "react";
import { useWidget } from "../WidgetProvider";
import { v4 } from "uuid";

const uploadAbortControllers: Map<string, AbortController> = new Map();

interface FileWithProgress {
  status: "pending" | "uploading" | "success" | "error";
  id: string;
  file: File;
  fileUrl?: string;
  progress: number;
  error?: string;
}

function useUploadFiles() {
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const { widgetCtx: { api } } = useWidget();
  function appendFiles(files: File[]) {
    const newFiles = files.map((file) => ({
      file,
      id: v4(),
      status: "pending" as const,
      progress: 0,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach(uploadFile);
  }

  function updateFileById(id: string, update: Partial<FileWithProgress>) {
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...update } : f)),
    );
  }

  function removeFileById(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }

  const uploadFile = async (fileItem: FileWithProgress) => {
    const controller = new AbortController();
    uploadAbortControllers.set(fileItem.id, controller);

    try {
      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileItem.id ? { ...f, status: "uploading", progress: 0 } : f,
        ),
      );

      const response = await api.uploadFile(fileItem, {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          if (!progressEvent.total) return;

          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );

          updateFileById(fileItem.id, { progress });
        },
      });

      updateFileById(fileItem.id, {
        status: "success",
        fileUrl: response.fileUrl,
        progress: 100,
      });
    } catch (error) {
      if (!controller.signal.aborted) {
        updateFileById(fileItem.id, {
          status: "error",
          error: error instanceof Error ? error.message : "Upload failed",
          progress: 0,
        });
      }
    } finally {
      uploadAbortControllers.delete(fileItem.id);
    }
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
    return files.filter((f) => f.status === "success" && f.fileUrl);
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
    hasErrors: files.some((f) => f.status === "error"),
    isUploading: files.some((f) => f.status === "uploading"),
  };
}

export { useUploadFiles, type FileWithProgress };
