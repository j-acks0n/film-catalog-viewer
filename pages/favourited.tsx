import {
  useUser,
  withPageAuthRequired,
} from "@auth0/nextjs-auth0/dist/frontend";
import { useEffect, useState } from "react";
import { getFavourites } from "../utils/general";
import MoviesWrapper from "../components/MoviesWrapper";
import MoviesGrid from "../components/MoviesGrid";
import { fetchFavouritedMovies } from "../utils/movie";
import { Movies } from "../utils/types";

const Favourited = () => {
  const currentTab = "Favourited";
  const [favourites, setFavourites] = useState<string[]>([]);
  const [currentMovies, setCurrentMovies] = useState<Movies>([]);
  const { user } = useUser();

  useEffect(() => {
    async function retrieveFavouriteMovies() {
      try {
        const favourites = user ? await getFavourites() : [];
        const movies: Movies = await fetchFavouritedMovies(favourites);
        setFavourites(favourites)
        setCurrentMovies(movies);
      } catch (e) {
        console.error(e);
      }
    }

    retrieveFavouriteMovies();
  }, [user]);
  return (
    <>
      <MoviesWrapper
        numberOfPages={0}
        index={0}
        currentTab={currentTab}
        setIndex={() => {}}
      >
        <MoviesGrid movies={currentMovies} favourites={favourites} />
      </MoviesWrapper>
    </>
  );
};

export default withPageAuthRequired(Favourited);
