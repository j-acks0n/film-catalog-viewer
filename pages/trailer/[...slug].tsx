import YouTube from "react-youtube";
import { getSimilarMovies } from "../../utils/movie";
import MovieBox from "../../components/MovieBox";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { Movies } from "../../utils/types";

type TrailerType = {
  trailerId: string;
  similarMovies: Movies;
};

const Trailer = ({ trailerId, similarMovies }: TrailerType) => {
  const router = useRouter();

  const opts = {
    height: "520",
    width: "920",
  };
  return (
    <div className="overflow-auto bg-gray-50">
      <div className="bg-white max-w-5xl mx-auto py-4 sm:px-6  my-8 rounded-lg shadow">
        <div className="max-w-4xl mx-4 md:mx-auto">
          <div className="grid grid-cols-1 gap-4 ">
            <div className="text-center">
              <div
                className="flex mb-4 cursor-pointer group mt-2"
                onClick={() => router.back()}
              >
                <ArrowLeftIcon className="text-black w-8 h-8 group-hover:text-gray-700" />
                <span className="self-center pl-2 text-lg group-hover:text-gray-700">
                  Back
                </span>
              </div>
              <YouTube
                videoId={trailerId}
                className="inline-block w-full -h-full"
                opts={opts}
              />
            </div>

            <div className="overflow-scroll list-none my-16">
              <div className="text-primary text-xl border-l-4 pl-2">
                Similar movies:
              </div>
              <div className="flex gap-4 overflow-scroll mt-8">
                {similarMovies.slice(0, 5).map((similarMovie) => {
                  return (
                    <MovieBox key={similarMovie.id} movie={similarMovie} isFavourited={false} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: { params: { slug: any[] } }) {
  const movieId = context.params.slug[0];
  const trailerId = context.params.slug[1];
  // const id = context.params.movieId;
  // const movie = await getMovieById(id);
  // // Rest of `getServerSideProps` code
  const similarMovies = (await getSimilarMovies(movieId)).results;
  return { props: { trailerId, similarMovies } };
}

export default Trailer;
