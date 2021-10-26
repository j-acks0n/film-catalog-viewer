import MoviesWrapper from "../../components/MoviesWrapper";
import MoviesGrid from "../../components/MoviesGrid";
import { useEffect, useState } from "react";
import { Movies } from "../../utils/types";
import { getTopRatedMovies } from "../../utils/movie";
import { useUser } from "@auth0/nextjs-auth0";
import { getFavourites } from "../../utils/general";
import { useRouter } from "next/router";

interface TopRatedMoviesInterface {
  numberOfPages: number;
  movies: Movies;
  originalIndex: number;
}

const TopRatedMovies = ({
  numberOfPages,
  movies,
  originalIndex,
}: TopRatedMoviesInterface) => {
  const { user } = useUser();
  const currentTab = "Top Rated";
  const [index, setIndex] = useState<number>(originalIndex);
  const [favourites, setFavourites] = useState<string[]>([]);
  // const [numOfPages, setNumOfPages] = useState(numberOfPages);

  // useEffect(() => {
  //   setNumOfPages(numberOfPages);
  // }, [numberOfPages]);

  // useEffect(() => {
  //   setIndex(originalIndex);
  // }, [originalIndex]);
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
        <MoviesGrid movies={movies} favourites={favourites} />
      </MoviesWrapper>
    </>
  );
};

export async function getServerSideProps(context: {
  params: { index: number };
}) {
  const originalIndex = context.params.index;
  const moviesData = await getTopRatedMovies(originalIndex);
  const numberOfPages = moviesData.total_pages;
  const movies = moviesData.results;
  return { props: { numberOfPages, movies, originalIndex } };
}
// export async function getStaticProps({ params} :any) {
//   const originalIndex = params.index;
//   const moviesData = await getTopRatedMovies(originalIndex);
//   const numberOfPages = moviesData.total_pages;
//   const movies = moviesData.results;
//   return { props: { numberOfPages, movies, originalIndex } };
// }
export default TopRatedMovies;
