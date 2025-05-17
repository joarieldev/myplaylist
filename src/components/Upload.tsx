import { useState } from "react";
import { FileDrop } from "react-file-drop";
import { useInputRef } from "@/hooks/useInputRef";

const BgDrag = () => {
  return (
    <div className="fixed top-2 left-2 right-2 bottom-2 border-4 border-dashed rounded-lg bg-black/50 border-gray-700/75 pointer-events-none z-10" />
  );
};

export const Upload = () => {
  const [frameDrag, setFrameDrag] = useState(false);
  const { fileInputRef, handleFileChange } = useInputRef();

  return (
    <>
      <FileDrop
        onFrameDragEnter={() => {
          setFrameDrag(true);
        }}
        onFrameDragLeave={() => {
          setFrameDrag(false);
        }}
        onFrameDrop={(event) => {
          const items = event.dataTransfer?.items;
          if (items && fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            for (const ele of items) {
              const file = ele.getAsFile();
              if (file) {
                dataTransfer.items.add(file);
              }
            }
            fileInputRef.current.files = dataTransfer.files;
            console.log(dataTransfer.files)
          }
          setFrameDrag(false);
          handleFileChange();
        }}
        // eslint-disable-next-line react/no-children-prop
        children={<></>}
      />
      <input
        onChange={handleFileChange}
        ref={fileInputRef}
        type="file"
        className="hidden"
        name="file"
        multiple
        accept="audio/*"
      />
      {frameDrag && <BgDrag />}
    </>
  );
};
