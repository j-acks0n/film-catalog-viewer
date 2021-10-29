import { Movies } from "../utils/types";
import { useUser } from "@auth0/nextjs-auth0";
import {
  getMostPopularMovies,
} from "../utils/movie";
import { useEffect, useState } from "react";
import MoviesGrid from "../components/MoviesGrid";
import { getFavourites } from "../utils/general";
import MoviesWrapper from "../components/MoviesWrapper";

export type HomeType = {
  movies: Movies;
  numberOfPages: number;
};

const Home = () => {
  const [index, setIndex] = useState<number>(1);
  const currentTab = "Most Popular";
  const [currentMovies, setCurrentMovies] = useState<Movies>([]);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [favourites, setFavourites] = useState<string[]>([]);

  const { user } = useUser();

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

    retrievePopularMovies();
    if (user) retrieveFavourites();
  }, [index, user]);

  return (
    <>
      <MoviesWrapper
        numberOfPages={numberOfPages}
        index={index}
        currentTab={currentTab}
        setIndex={setIndex}
      >
        <MoviesGrid movies={currentMovies} favourites={favourites} />
      </MoviesWrapper>
    </>
  );
};

export default Home;
