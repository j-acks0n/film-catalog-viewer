import MovieBox from "./movieBox";
import type { Movies } from "../utils/types";

type MoviesGridType = {
  movies: Movies;
};
const MoviesGrid = ({ movies }: MoviesGridType) => {
  return (
    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        Recently viewed
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8 justify-items-center lg:justify-items-baseline "
      >
        {movies.map((movie) => {
          return <MovieBox key={movie.id} movie={movie} />;
        })}
      </ul>
    </section>
  );
};

export default MoviesGrid;
