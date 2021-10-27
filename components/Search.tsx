import { useUser } from "@auth0/nextjs-auth0";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { getFavourites } from "../utils/general";
import { searchByText } from "../utils/movie";
import Pagination from "./Pagination";
import SearchMoviesGrid from "./SearchMoviesGrid";

interface SearchInterface {
  setShowSearch: (showSearch: boolean) => void;
}

const initialisedSearchInfo = {
  movies: [],
  totalPages: 0,
  totalResults: 0,
};
const Search = ({ setShowSearch }: SearchInterface) => {
  const [searchInfo, setSearchInfo] = useState(initialisedSearchInfo);
  const [index, setIndex] = useState(1);
  const [query, setQuery] = useState("");
  const [favourites, setFavourites] = useState<string[]>([]);
  const { user } = useUser();

  useEffect(() => {
    async function retrieveFavourites() {
      try {
        const favourites = await getFavourites();
        setFavourites(favourites);
      } catch (e) {
        console.error(e);
      }
    }
    if (user) retrieveFavourites();
  }, [user]);

  useEffect(() => {
    const handleOnSearch = async (string: string) => {
      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.
      const data = await await searchByText(string, index);
      setSearchInfo({
        movies: data.results,
        totalPages: data.total_pages,
        totalResults: data.total_results,
      });
    };
    if (query === "") {
      setSearchInfo(initialisedSearchInfo);
    } else {
      handleOnSearch(query);
    }
  }, [query, index]);
  return (
    <>
      {/* <div className="absolute centraliseSearch z-20"> */}
      <div
        className="absolute top-0 left-0  bottom-0 right-0 w-full h-full overflow-hidden z-50"
      >
        <XIcon
          className="absolute w-8 h-8 crossIcon hover:text-indigo-500 cursor-pointer"
          onClick={() => {
            setShowSearch(false);
          }}
        />

        <div className="relative">
          <div className="mt-24 flex justify-center items-center">
            <div className="relative">
              <div className="">
                <div className="absolute top-3 left-3">
                  <SearchIcon className="text-gray-400 z-20 hover:text-gray-500 w-8 h-8" />
                </div>
                <input
                  type="text"
                  className="h-14 w-80 pl-12 pr-6 rounded-lg z-0 focus:shadow focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="Search for a movie..."
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  value={query}
                  autoFocus
                />
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-10 h-4/5 overflow-auto">
          {searchInfo.movies.length && (
            <div className="px-8 bg-white pt-12 pb-6 my-10 rounded-lg mx-10  overflow-scoll ">
              <div className="text-center sm:text-justify sm:pl-14">About {searchInfo.totalResults} results</div>
              <SearchMoviesGrid movies={searchInfo.movies} favourites={favourites} />
              <Pagination index={index} currentTab={"Search"} setIndex={setIndex} numberOfPages={searchInfo.totalPages} />
            </div>
          )}
        </div>

        {/* <div className="mx-auto">
          <div className="flex overflow-scroll">
            {movies.map((movie) => {
              return (
                <MovieBox movie={movie} key={movie.id} isFavourited={false} />
              );
            })}
          </div>
        </div> */}
      </div>

      <div
        className="absolute top-0 left-0 z-10 w-full h-full bg-black opacity-70 overflow-hidden"
        onClick={() => {
          setShowSearch(false);
        }}
      />
    </>
  );
};

export default Search;
