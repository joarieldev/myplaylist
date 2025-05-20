import clsx from "clsx";
import { useIsMoving } from "@/hooks/useIsMoving";

interface Props {
  heading: React.ReactNode;
  children: React.ReactNode;
}
export const Layout = ({ heading, children }: Props) => {
  const { getOpacity, handlers } = useIsMoving();

  return (
    <main
      className={clsx(
        "flex flex-col sm:bg-black/50 p-4 sm:p-2 rounded-md h-[100dvh] w-full sm:h-[520px] sm:w-[456px] overflow-hidden",
        getOpacity()
      )}
      {...handlers}
    >
      <header>{heading}</header>
      {children}
    </main>
  );
};
