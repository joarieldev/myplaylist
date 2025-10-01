import { InfoCircle } from "@/assets/icons/InfoCircle";
import { useModalInfoStore } from "@/store/modal-info-store";

export const BtnInfo = () => {
  const handleModalInfo = useModalInfoStore((state) => state.handleModalInfo);

  return (
    <button className="cursor-pointer absolute bottom-0" title="info" onClick={handleModalInfo}>
      <InfoCircle className="size-5 opacity-50 hover:opacity-65" />
    </button>
  );
};
