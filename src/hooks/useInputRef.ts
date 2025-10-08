import type { IFile } from "@/interfaces/File";
import { extractAudioMetadata } from "@/lib/get-metadata";
import { useFilesStore } from "@/store/files-store";
import { useWindowStore } from "@/store/window-store";
import { useRef } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

export const useInputRef = () => {

  const addFiles = useFilesStore(state => state.addFiles);
  const files = useFilesStore(state => state.files);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setWindow = useWindowStore(state => state.setWindow);

  const handleFileChange = async () => {
    const file = fileInputRef.current?.files;

    if (!file) return toast.warning("No se pudo cargar el audio");

    for (const item of file) {
      if (!item.type.startsWith("audio"))
        return toast.warning("Solo se pueden cargar archivos de audio");
    }

    const promise = () => new Promise<IFile[]>((resolve) => {
      const isIndexes = files.length > 0
      const newFiles = Promise.all(
        Array.from(file).map(async (file, index) => ({
          id: uuidv4(),
          index: isIndexes ? files.length + index : index,
          metadata: await extractAudioMetadata(file),
          file,
        }))
      );
      resolve(newFiles)
    });

    toast.promise(promise, {
      loading: 'Cargando...',
      success: (data: IFile[]) => {
        addFiles(data);
        return `Se cargaron ${data.length} archivos`;
      },
      error: 'Algo salió mal',
    });

    setWindow("local");
  };

  const onTargetClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
    fileInputRef,
    handleFileChange,
    onTargetClick,
  };

}