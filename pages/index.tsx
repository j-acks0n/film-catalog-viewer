import { Movie } from "../utils/types";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { getAllMovies } from "../utils/movie";
import Movies from "../components/moviesGrid";
import React, {  useState } from "react";
import {
  ViewGridIcon as ViewGridIconSolid,
} from "@heroicons/react/solid";
import MoviesGrid from "../components/moviesGrid";
import Header from "../components/Header";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const tabs = [
  { name: 'Recently Viewed', href: '#', current: true },
  { name: 'Recently Added', href: '#', current: false },
  { name: 'Favorited', href: '#', current: false },
]

export type Movies = Movie[];
export type HomeType = {
  movies: Movies;
};

const Home = ({ movies }: HomeType) => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="relative h-screen bg-gray-50 flex overflow-hidden">
      {/* Narrow sidebar */}

      {/* Mobile menu */}

      {/* Content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
          <Header />



        {/* Main content */}


        <div className="flex-1 flex items-stretch overflow-hidden">
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
                    <option>Recently Viewed</option>
                    <option>Recently Added</option>
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
                          href={tab.href}
                          aria-current={tab.current ? "page" : undefined}
                          className={classNames(
                            tab.current
                              ? "border-indigo-500 text-indigo-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                        >
                          {tab.name}
                        </a>
                      ))}
                    </nav>
                    <div className="hidden ml-6 bg-gray-100 p-0.5 rounded-lg items-center sm:flex">
                      <button
                        type="button"
                        className="ml-0.5 bg-white p-1.5 rounded-md shadow-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                      >
                        <ViewGridIconSolid
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Use grid view</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery */}
              <MoviesGrid movies={movies} />
            </div>
          </main>

          {/* Details sidebar */}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  //Call an external API endpoint to get posts
  // const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=38b17f196cd011f46deca055abebe093')
  // const movie = await res.json()
  const movies = (await getAllMovies(1)).results;
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  // return {
  //   props: {
  //     movies
  //   },
  // }
  return {
    props: {
      movies,
    },
  };
}
export default Home;
