import MovieBox from "./MovieBox";
import type { Movies } from "../utils/types";

type SearchMoviesGridType = {
  movies: Movies;
  favourites: string[];
};
const SearchMoviesGrid = ({ movies, favourites}: SearchMoviesGridType) => {
  return (
    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        Recently viewed
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 justify-items-center "
      >
        {movies.map((movie) => {
          return <MovieBox key={movie.id} movie={movie} isFavourited={favourites.includes(movie.id.toString()) ? true : false}/>;
        })}
      </ul>
    </section>
  );
};

export default SearchMoviesGrid;
