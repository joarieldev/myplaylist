import { createFavorite } from "@/actions/create-favorite";
import { deleteFavorite } from "@/actions/delete-favorite";
import { Heart } from "@/assets/icons/Heart";
import { IList } from "@/interfaces/List";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  item: IList;
  setChange: React.Dispatch<React.SetStateAction<number>>;
}

export const BtnFavorite = ({ item, setChange }: Props) => {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const favorites = queryClient.getQueryData<IList[]>(["queryFavorite"]);
  const [btnDisabled, setBtnDisabled] = useState(false);

  const handleAddFavorite = async (
    e: React.FormEvent<HTMLButtonElement>,
    item: IList
  ) => {
    e.stopPropagation();

    if (!user) return;

    setBtnDisabled(true);

    const id = user.id;
    const name = user.username ?? user.fullName ?? "-";

    createFavorite(id, name, item)
      .then(() => {
        queryClient.setQueryData<IList[]>(["queryFavorite"], (old) => {
          if (old?.some((fav) => fav.id === item.id)) return old;
          return old ? [...old, item] : [item];
        });
        queryClient.setQueryData<IList[]>(["queryTrending"], (old) => {
          if (old?.some((fav) => fav.id === item.id)) return old;
          return old ? [...old, item] : [item];
        });
        queryClient.setQueryData<IList[]>(["querySearch"], (old) => {
          if (old?.some((fav) => fav.id === item.id)) return old;
          return old ? [...old, item] : [item];
        });
        setChange((prev) => prev + 1);
        toast.success("Añadido a Favoritos");
      })
      .catch(() => {
        toast.error("Algo salió mal");
      })
      .finally(() => {
        setBtnDisabled(false);
      });
  };

  const handleRemoveFavorite = (
    e: React.FormEvent<HTMLButtonElement>,
    item: IList
  ) => {
    e.stopPropagation();

    if (!user) return;

    setBtnDisabled(true);

    deleteFavorite(user?.id ?? "", item.id)
      .then(() => {
        queryClient.setQueryData<IList[]>(
          ["queryFavorite"],
          (old) => old?.filter((fav) => fav.id !== item.id) ?? []
        );
        setChange((prev) => prev + 1);
        toast.success("Eliminado de Favoritos");
      })
      .catch(() => {
        toast.error("Algo salió mal");
      })
      .finally(() => {
        setBtnDisabled(false);
      });
  };

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <button
            className="cursor-pointer text-red-500 hover:text-red-400"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Heart ClassName="size-4" />
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        {favorites?.some((fav) => fav.id === item.id) ?? false ? (
          <button
            className={clsx(
              "text-red-500 hover:text-red-400",
              btnDisabled ? "opacity-50" : "cursor-pointer"
            )}
            disabled={btnDisabled}
            onClick={(e) => handleRemoveFavorite(e, item)}
          >
            <Heart ClassName="size-4" liked={true} />
          </button>
        ) : (
          <button
            className={clsx(
              "text-red-500 hover:text-red-400",
              btnDisabled ? "opacity-50" : "cursor-pointer"
            )}
            disabled={btnDisabled}
            onClick={(e) => handleAddFavorite(e, item)}
          >
            <Heart ClassName="size-4" />
          </button>
        )}
      </SignedIn>
    </>
  );
};
