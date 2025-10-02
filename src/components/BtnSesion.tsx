import { User } from "@/assets/icons/User";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

export const BtnSesion = () => {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button className="p-1 rounded-full bg-neutral-500/25 cursor-pointer hover:text-gray-300" title="Iniciar sesión">
            <User className="size-5"/>
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
};
