import caratula from "@/assets/caratula-vacia.webp";

export default function Home() {
  return (
    <div className="grid grid-rows-[1fr] items-center justify-items-center min-h-screen font-inter">
      <main className="flex flex-col gap-[32px] items-center bg-black/50 p-4 rounded-md">
        <img src={caratula.src} alt="caratula" className="size-48" />
        <div className="text-center">
          <h1 className="font-family-montserrat font-bold">Lorem ipsum dolor sit amet</h1>
          <p className="text-sm font-medium">Porro quisquam est</p>
        </div>
        <div>
          <p className="text-sm"> 00:12 - 03:38</p>
        </div>
      </main>
    </div>
  );
}

