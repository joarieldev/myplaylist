import { ITrack } from "@/interfaces/Track";
import { extractAudioMetadata } from "@/lib/get-metadata";
import { useContentStore } from "@/store/content-store";
import { useUiStore } from "@/store/ui-store";
import { emptyTrack } from "@/utils/emptyTrack";
import { useRef } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import caratula from "@/assets/caratula-vacia.webp";

export const useInputRef = () => {

  const addFiles = useContentStore(state => state.addFiles);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const setWindow = useUiStore(state => state.setWindow);
  const MAX_FILES = 20;

  const handleFileChange = async () => {
    const files = fileInputRef.current?.files;

    if (!files) return toast.warning("No se pudo cargar el audio");

    for (const item of files) {
      if (!item.type.startsWith("audio"))
        return toast.warning("Solo se pueden cargar archivos de audio");
    }

    if (useContentStore.getState().files.length + files.length > MAX_FILES)
      return toast.warning(`Máximo ${MAX_FILES} canciones permitidas`);

    const promise = () => new Promise<ITrack[]>(async (resolve) => {
      const newFiles: ITrack[] = await Promise.all(
        Array.from(files).map(async (file) => {
          const metadata = await extractAudioMetadata(file)
          return {
            ...emptyTrack,
            id: uuidv4(),
            title: metadata.title,
            duration: metadata.duration,
            user: {
              ...emptyTrack.user,
              name: metadata.artist
            },
            artwork: {
              "150x150": metadata.cover || caratula.src,
              "480x480": metadata.cover || caratula.src,
              "1000x1000": metadata.cover || caratula.src,
              mirrors: []
            },
            orig_filename: URL.createObjectURL(file),
            tags: "local"
          }
        })
      );
      resolve(newFiles)
    });

    toast.promise(promise, {
      loading: 'Cargando...',
      success: (data: ITrack[]) => {
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
