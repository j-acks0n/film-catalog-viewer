import { Movies } from "../utils/types";
import { useUser } from "@auth0/nextjs-auth0";
import {
  fetchFavouritedMovies,
  getMostPopularMovies,
  getTopRatedMovies,
} from "../utils/movie";
import { useEffect, useMemo, useState } from "react";
import { ViewGridIcon as ViewGridIconSolid } from "@heroicons/react/solid";
import MoviesGrid from "../components/MoviesGrid";
import { getFavourites } from "../utils/general";
import Alert from "../components/Alert";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const tabs = [
  { name: "Most Popular", href: "/" },
  { name: "Top Rated", href: "/" },
  { name: "Favourited", href: "/" },
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
  const [index, setIndex] = useState(1);
  const [currentTab, setCurrentTab] = useState(getLocalStorage("Most Popular"));
  const [currentMovies, setCurrentMovies] = useState<Movies>([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  const start = index - 1 >= 1 ? index - 1 : index;
  const end = index + 3 <= numberOfPages - 1 ? index + 3 : numberOfPages;
  const paginationArray = Array.from(Array(numberOfPages).keys()).slice(
    start,
    end
  );
  const { user } = useUser();

  // useEffect(() => {
  //   console.log(currentMovies);
  // }, [currentMovies]);
  useEffect(() => {
    console.log(favourites);
  }, [favourites]);
  useEffect(() => {
    async function retrieveFavourites() {
      try {
        const favourites = user ? await getFavourites() : [];
        setFavourites(favourites);
      } catch (e) {
        console.error(e);
      }
    }

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

    async function retrieveFavouriteMovies() {
      try {
        const favourites = user ? await getFavourites() : [];
        const movies: Movies = await fetchFavouritedMovies(favourites);
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
      } else {
        retrieveFavouriteMovies();
      }
    }
    if (currentTab !== "Favourited") retrieveFavourites();

    retrieveMovies();
    return () => {
      setLocalStorage(currentTab);
    };
  }, [currentTab, index, user]);

  return (
    <>
      {showAlert && (
        <Alert
          setShowAlert={setShowAlert}
          text={
            "In order to see your favourited movies. You have to be logged in first."
          }
        />
      )}
      <div className="flex-1 flex items-stretch overflow-hidden bg-gray-50">
        <main className="flex-1 overflow-y-auto">
          <div className="pt-8  px-4 sm:px-6 lg:px-8">
            <div className="flex">
              <h1 className="flex-1 text-2xl font-bold text-gray-900">
                Movies
              </h1>

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
                  onChange={(event) => {
                    //setCurrentTab(event.target.value);
                    const value = event.target.value;
                    if (value === "Favourited" && !user) {
                      setShowAlert(true);
                    } else {
                      setCurrentTab(value);
                      if (index !== 1) setIndex(1);
                    }
                  }}
                  value={currentTab}
                >
                  {/* <option>Most popular</option>
                  <option>Top Rated</option>
                  <option>Favourited</option> */}
                  {tabs.map((tab) => {
                    return (
                      <option
                        key={`tab.name + ${Math.random()}`}
                        value={tab.name}
                      >
                        {tab.name}
                      </option>
                      // <a
                      //   key={tab.name}
                      //   className={`${
                      //     tab.name === currentTab
                      //       ? "border-indigo-500 text-indigo-600"
                      //       : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      //   }
                      //    whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                      //   onClick={() => {
                      //     if (tab.name === "Favourited" && !user) {
                      //       setShowAlert(true);
                      //     } else {
                      //       setCurrentTab(tab.name);
                      //       if (index !== 1) setIndex(1);
                      //     }
                      //   }}
                      // >
                      //   {tab.name}
                      // </a>
                    );
                  })}
                </select>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center border-b border-gray-200">
                  <nav
                    className="flex-1 -mb-px flex space-x-6 xl:space-x-8"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab) => {
                      return (
                        <a
                          key={tab.name}
                          className={`${
                            tab.name === currentTab
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                          }
                         whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-pointer`}
                          onClick={() => {
                            if (tab.name === "Favourited" && !user) {
                              setShowAlert(true);
                            } else {
                              setCurrentTab(tab.name);
                              if (index !== 1) setIndex(1);
                            }
                          }}
                        >
                          {tab.name}
                        </a>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <MoviesGrid movies={currentMovies} favourites={favourites} />
            {currentTab !== "Favourited" && (
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
            )}
          </div>
        </main>

        {/* Details sidebar */}
      </div>
    </>
  );
};

export default Home;
