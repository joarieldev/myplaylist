interface Props {
  heading: React.ReactNode;
  children: React.ReactNode;
}
export const Layout = ({heading, children}: Props) => {
  return (
    <main className="flex flex-col bg-black/50 p-2 rounded-md md:h-[520px] md:w-[456px]">
      <header>{heading}</header>
      {children}
    </main>
  );
};
