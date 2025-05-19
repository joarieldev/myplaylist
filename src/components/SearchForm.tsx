import { Search } from "@/assets/icons/Search";
import { X } from "@/assets/icons/X";
import { useSearchStore } from "@/store/search-store";
import { useRef } from "react";

interface Props {
  fetchSearch: () => void;
}

export const SearchForm = ({ fetchSearch }: Props) => {
  const searchText = useSearchStore((state) => state.searchText);
  const setSearchText = useSearchStore((state) => state.setSearchText);
  const inputRef = useRef<HTMLInputElement>(null);


  const clearInput = () => {
    setSearchText("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearch();
  };

  return (
    <form
      className="mb-2"
      onSubmit={handleSubmit}
    >
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <button type="submit">
            <Search />
          </button>
        </div>
        <input
          ref={inputRef}
          type="text"
          id="search"
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-11 pr-11 py-2 bg--200 hover:bg-neutral-800/75 bg-neutral-900/75 rounded-full text-sm outline-none cursor-pointer"
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <button
            className="rounded-full cursor-pointer active:bg-gray-500/50"
            onClick={clearInput}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </form>
  );
};
