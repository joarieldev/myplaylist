import { Search } from "@/assets/icons/Search";
import { X } from "@/assets/icons/X";
import { useUiStore } from "@/store/ui-store";
import { useEffect, useRef } from "react";

const genres = [
  'electronic',
  'rock',
  'metal',
  'lofi',
  'alternative',
  'hip-hop/rap',
  'experimental',
  'punk',
  'folk',
  'pop',
  'ambient',
  'soundtrack',
  'world',
  'jazz',
  'acoustic',
  'funk',
  'r&b/soul',
  'devotional',
  'classical',
  'reggae',
  'podcasts',
  'country',
  'spoken word',
  'comedy',
  'blues',
  'kids',
  'audiobooks',
  'latin',
  'lo-fi',
  'hyperpop',
  'dancehall',
  'techno',
  'trap',
  'house',
  'tech house',
  'deep house',
  'disco',
  'electro',
  'jungle',
  'progressive house',
  'hardstyle',
  'glitch hop',
  'trance',
  'future bass',
  'future house',
  'tropical house',
  'downtempo',
  'drum & bass',
  'dubstep',
  'jersey club',
  'vaporwave',
  'moombahton',
];

interface Props {
  fetchSearch: () => void;
}

export const SearchForm = ({ fetchSearch }: Props) => {
  const searchText = useUiStore((state) => state.searchText);
  const setSearchText = useUiStore((state) => state.setSearchText);
  const inputRef = useRef<HTMLInputElement>(null);
  const genresRef = useRef<HTMLDivElement>(null);


  const clearInput = () => {
    setSearchText("");
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearch();
  };

  const handleGenreClick = (genre: string) => {
    setSearchText(genre);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const el = genresRef.current;
    if (!el) return;
    
    const handler = (e: WheelEvent) => {
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, []);

  return (
    <form
      className="space-y-2"
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
          placeholder="Buscar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full pl-11 pr-11 py-2 bg-neutral-800/90 rounded-full text-sm max-sm:font-semibold outline-none cursor-text"
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
      <div 
        ref={genresRef}
        className="flex overflow-x-auto overflow-y-hidden flex-nowrap gap-2 genres-scroll"
      >
        {genres.map((genre) => (
          <button
            key={genre}
            type="submit"
            onClick={() => handleGenreClick(genre)}
            className="px-3 py-1 hover:bg-neutral-800/90 bg-neutral-900/90 rounded-full text-sm max-sm:font-semibold font-sans transition-colors capitalize text-nowrap"
          >
            {genre}
          </button>
        ))}
      </div>
    </form>
  );
};
