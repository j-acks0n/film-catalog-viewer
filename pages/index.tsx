import { Movies } from "../utils/types";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getMostPopularMovies, getTopRatedMovies } from "../utils/movie";
import { useEffect, useMemo, useState } from "react";
import { ViewGridIcon as ViewGridIconSolid } from "@heroicons/react/solid";
import MoviesGrid from "../components/moviesGrid";
import useDidMountEffect from "../utils/useDidMountEffect";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const tabs = [
  { name: "Most Popular", href: "/" },
  { name: "Top Rated", href: "/" },
  { name: "Favorited", href: "/" },
];
export type HomeType = {
  movies: Movies;
  numberOfPages: number;
};

function setLocalStorage(value: string) {
  try {
    window.localStorage.setItem("currentTab", JSON.stringify(value));
  } catch (e) {
    // catch possible errors:
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
  }
}

export function getLocalStorage(initialValue: string) {
  try {
    const value = window.localStorage.getItem("currentTab");
    return value ? JSON.parse(value) : initialValue;
  } catch (e) {
    // if error, return initial value
    return initialValue;
  }
}

const Home = () => {
  // const { user, error, isLoading } = useUser();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;
  // const authButton = user ? (
  //   <div>
  //     Welcome {user.name}! <Link href="/api/auth/logout">Logout</Link>
  //   </div>
  // ) : (
  //   <Link href="/api/auth/login">Login</Link>
  // );

  // return (
  //   <div>
  //     <div>{authButton}</div>
  //     {movies && <Movies movies={movies} />}
  //   </div>
  // );
  const [index, setIndex] = useState(1);
  const [currentTab, setCurrentTab] = useState(getLocalStorage("Most Popular"));
  const [currentMovies, setCurrentMovies] = useState<Movies>([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const start = index - 3 >= 1 ? index - 3 : index;
  const end = index + 3 <= numberOfPages - 1 ? index + 3 : numberOfPages;
  const paginationArray = Array.from(Array(numberOfPages).keys()).slice(
    start,
    end
  );

  useEffect(() => {
    console.log(currentMovies);
  }, [currentMovies]);

  useEffect(() => {
    async function retrievePopularMovies() {
      try {
        const moviesData = await getMostPopularMovies(index);
        const numberOfPages = moviesData.total_pages;
        const movies = moviesData.results;
        if (index === 1) setNumberOfPages(numberOfPages);
        setCurrentMovies(movies);
      } catch (e) {
        console.error(e);
      }
    }

    async function retrieveTopRatedMovies() {
      try {
        const moviesData = await getTopRatedMovies(index);
        const numberOfPages = moviesData.total_pages;
        const movies = moviesData.results;
        if (index === 1) setNumberOfPages(numberOfPages);
        setCurrentMovies(movies);
      } catch (e) {
        console.error(e);
      }
    }
    async function retrieveMovies() {
      if (currentTab === "Most Popular") {
        retrievePopularMovies();
      } else if (currentTab === "Top Rated") {
        retrieveTopRatedMovies();
      }
    }
    setLocalStorage(currentTab);
    retrieveMovies();
  }, [currentTab, index]);

  return (
    <>
      <div className="flex-1 flex items-stretch overflow-hidden bg-gray-50">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8  px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-gray-900">
                Movies
              </h1>
              <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center sm:hidden">
                <button
                  type="button"
                  className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <ViewGridIconSolid className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">Use grid view</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-3 sm:mt-2">
              <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id="tabs"
                  name="tabs"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  defaultValue="Recently Viewed"
                >
                  <option>Most popular</option>
                  <option>Top Rated</option>
                  <option>Favorited</option>
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center border-b border-gray-200">
                  <nav
                    className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => (
                      <a
                        key={tab.name}
                        className={`${
                          tab.name === currentTab
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }
                         whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                        onClick={() => {
                          setCurrentTab(tab.name);
                          if (index !== 1) setIndex(1);
                        }}
                      >
                        {tab.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <MoviesGrid movies={currentMovies} />
            <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-12">
              <div className="-mt-px w-0 flex-1 flex"></div>
              <div className="hidden md:-mt-px md:flex">
                {paginationArray.map((number) => {
                  if (number === index) {
                    return (
                      <a
                        key={number}
                        className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                        aria-current="page"
                      >
                        {number}
                      </a>
                    );
                  } else {
                    return (
                      <a
                        key={number}
                        className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                        onClick={() => {
                          if (number !== index) setIndex(number);
                        }}
                      >
                        {number}
                      </a>
                    );
                  }
                })}
              </div>
              <div className="-mt-px w-0 flex-1 flex justify-end"></div>
            </nav>
          </div>
        </main>

        {/* Details sidebar */}
      </div>
    </>
  );
};

export default Home;
