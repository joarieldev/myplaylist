import { User } from "@/assets/icons/User";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export const BtnSesion = () => {
  return (
    <>
      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="p-1 rounded-full bg-neutral-500/25 hover:bg-neutral-500/50 cursor-pointer text-gray-300 hover:text-white  transition-colors" title="Iniciar sesión">
            <User className="size-6 max-sm:stroke-3 sm:size-5"/>
          </button>
        </SignInButton>
      </Show>
      <Show when="signed-in">
        <UserButton />
      </Show>
    </>
  );
};
