import caratula from "@/assets/caratula-vacia.webp";
import { Layout } from "./Layout";
import { PlayList } from "@/assets/icons/PlayList";

interface Props {
  onClick: () => void;
}

export const Main = ({ onClick }: Props) => {
  return (
    <Layout
      heading={
        <nav className="flex justify-end">
          <button
            onClick={onClick}
            className="cursor-pointer active:text-gray-300"
          >
            <PlayList />
          </button>
        </nav>
      }
    >
      <section className="flex flex-col h-full">
        <div className="flex justify-center py-4">
          <img src={caratula.src} alt="caratula" className="size-48" />
        </div>
        <div className="h-full flex flex-col items-center justify-center">
          <h1 className="font-family-montserrat font-bold">
            Lorem ipsum dolor sit amet
          </h1>
          <p className="text-sm font-medium">Porro quisquam est</p>
        </div>
        <div className="h-full flex justify-center items-end">
          <p className="text-sm"> 00:12 - 03:38</p>
        </div>
      </section>
    </Layout>
  );
};
