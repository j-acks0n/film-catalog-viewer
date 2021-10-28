import MoviesWrapper from "../../components/MoviesWrapper";
import MoviesGrid from "../../components/MoviesGrid";
import { useEffect, useState } from "react";
import { Genres, Movies } from "../../utils/types";
import { discoverMovies, getAllGenres } from "../../utils/movie";
import { useUser } from "@auth0/nextjs-auth0";
import { getFavourites } from "../../utils/general";
import Option from "../../components/Option";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker, {
  DayValue,
} from "@amir04lm26/react-modern-calendar-date-picker";
import { ChevronUpIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";

interface DiscoverMoviesInterface {
  numberOfPages: number;
  movies: Movies;
  originalIndex: number;
  genres: Genres;
}

const DiscoverMovies = ({
  numberOfPages,
  movies,
  originalIndex,
  genres,
}: DiscoverMoviesInterface) => {
  const { user } = useUser();
  const currentTab = "Discover";
  const [index, setIndex] = useState<number>(originalIndex);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [filter, setFilter] = useState({
    genres: genres,
    rating: 5,
    releaseDate: "",
  });
  const [showFilter, setShowFilter] = useState(true);
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
  return (
    <>
      <MoviesWrapper
        numberOfPages={numberOfPages}
        index={Number(index)}
        currentTab={currentTab}
        setIndex={setIndex}
      >
        {showFilter && (
          <div className="my-5 p-4 border-2 rounded-lg bg-white shadow border-gray-300 transition duration-500 ease-in-out w-full xl:w-1/2 ">
            <div className="flex justify-between">
              <div className="text-lg text-gray-500 mb-4">Filter by:</div>
              <a
                data-for="collaspse"
                data-tip="Collapse filter"
                data-iscapture="true"
                onClick={() => {
                  setShowFilter(false);
                }}
              >
                <ChevronUpIcon className="h-8 w-8 text-gray-400 hover:text-black cursor-pointer" />
                <ReactTooltip id="collaspse" />
              </a>
            </div>

            <div className="flex flex-col gap-y-8 md:flex-row gap-x-4">
              <div className="p-6 border-gray-200 rounded-lg border-2">
                <Option genres={genres} />
              </div>

              <div className="p-6 border-gray-200 rounded-lg border-2">
                <div className="text-sm font-medium text-gray-700">
                  Minimal Film Rating: {filter.rating}
                </div>
                <div className="flex flex-row mt-2">
                  <div>0</div>
                  <input
                    type="range"
                    max={10}
                    min={0}
                    value={filter.rating}
                    onChange={(val) => {
                      const value = val.target.value;
                      setFilter({
                        ...filter,
                        rating: Number(value),
                      });
                    }}
                    className="mx-2"
                  />
                  <div>10</div>
                </div>
              </div>
              <div className="p-6 border-gray-200 rounded-lg border-2">
                <div className="text-sm font-medium text-gray-700">
                  Release Date
                </div>
                <DatePicker
                  value={selectedDay}
                  onChange={setSelectedDay}
                  inputPlaceholder="Select a day"
                  shouldHighlightWeekends
                />
              </div>
              {/* <div className="text-sm font-medium text-gray-700 text-right align-bottom ml-auto">
                Apply
              </div> */}
              <div className="self-end ml-auto">
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
        {!showFilter && (
          <button
            type="button"
            className="mt-5 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setShowFilter(true);
            }}
          >
            Filters
          </button>
        )}

        <MoviesGrid movies={movies} favourites={favourites} />
      </MoviesWrapper>
    </>
  );
};

export async function getServerSideProps(context: { params: { slug: any[] } }) {
  const originalIndex = context.params.slug[0];
  const trailerId = context.params.slug[1];

  const moviesData = await discoverMovies(originalIndex);
  const numberOfPages = moviesData.total_pages;
  const movies = moviesData.results;

  const genres = (await getAllGenres()).genres;
  return { props: { originalIndex, numberOfPages, movies, genres } };
}
// export async function getStaticProps({ params} :any) {
//   const originalIndex = params.index;
//   const moviesData = await getTopRatedMovies(originalIndex);
//   const numberOfPages = moviesData.total_pages;
//   const movies = moviesData.results;
//   return { props: { numberOfPages, movies, originalIndex } };
// }
export default DiscoverMovies;
