import { useRouter } from "next/router";
import { startOfPosterLink } from "../../components/MovieBox";
import {
  getMovieById,
  getMovieCasts,
  getMovieReviews,
} from "../../utils/movie";
import { Casts, Movie, Reviews } from "../../utils/types";
import Image from "next/image";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { classNames } from "../../utils/general";
import Cast from "../../components/CastBox";
import { useState } from "react";
import useDidMountEffect from "../../utils/useDidMountEffect";

type MovieType = {
  movieId: string;
  movie: Movie;
  reviews: Reviews;
  numberOfReviewPages: number;
  casts: Casts;
};

const MovieDetailedView = ({
  movieId,
  movie,
  reviews,
  numberOfReviewPages,
  casts,
}: MovieType) => {
  const router = useRouter();
  let trailerId;
  if (movie.videos) {
    movie.videos.results.map((video) => {
      if (video.type === "Trailer") {
        trailerId = video.key;
      }
    });
  }

  const [index, setIndex] = useState(1);
  const [currentReviews, setCurrentReviews] = useState(reviews);

  async function retrieveMovieReviews() {
    const newReviews = (await getMovieReviews(movieId, index)).results;
    setCurrentReviews(newReviews);
  }
  useDidMountEffect(() => {
    retrieveMovieReviews();
  }, [index]);
  let imgSRC = startOfPosterLink + movie.poster_path;
  imgSRC =
    imgSRC == "https://image.tmdb.org/t/p/w300null"
      ? "https://critics.io/img/movies/poster-placeholder.png"
      : startOfPosterLink + movie.poster_path;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <div className="bg-gray-50">
      <div className="bg-white max-w-7xl mx-6 md:mx-auto py-12 sm:px-6  my-8 rounded-lg shadow ">
        <div className="max-w-6xl mx-auto">
          <Link href={`/`} passHref>
            <button
              type="button"
              className="ml-4 inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon
                className="-ml-0.5 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Home
            </button>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 gap-y-32">
            <div className="text-center">
              {/* Image */}

              <div
                className={
                  "inline-block focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 group bg-gray-100 overflow-hidden rounded-lg relative"
                }
                style={{ height: "500px", width: "300px" }}
              >
                <Image
                  src={imgSRC}
                  alt="Picture of the author"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {}
              {trailerId && (
                <Link href={`/trailer/${movie.id}/${trailerId}`} passHref>
                  <div className="text-base cursor-pointer ">Watch Trailer</div>
                </Link>
              )}
            </div>
            <div className="">
              {/* Image */}
              <div className="bg-white  overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {movie.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {movie.original_title}
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Release Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {movie.release_date}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Genres
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {movie.genres.map((genre) => {
                          return <div key={genre.id}>{genre.name} </div>;
                        })}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Budget
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatter.format(movie.budget)}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Revenue
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {formatter.format(movie.revenue)}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Production Companies
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {movie.production_companies.map((company) => {
                          return <div key={company.id}>{company.name} </div>;
                        })}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {movie.status}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div>
              <div className="overflow-scroll list-none mx-4">
                <div className="text-primary text-xl pl-2">Cast</div>
                <div className="flex gap-4 overflow-scroll mt-8">
                  {casts.map((cast) => {
                    return <Cast cast={cast} key={cast.id} />;
                  })}
                </div>
              </div>
            </div>
            {currentReviews.length > 0 && (
              <div className="mx-4 md:mx-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Recent reviews
                </h2>
                <div className="mt-6 pb-10 border-t border-gray-200 space-y-10" />

                <div className="mt-16 lg:mt-0 lg:col-start-6 lg:col-span-7">
                  <h3 className="sr-only">Recent reviews</h3>
                  <div className="flow-root">
                    <div className="-my-12 divide-y divide-gray-200">
                      {currentReviews.map((review) => {
                        return (
                          <div key={review.id} className="py-12">
                            <div className="flex items-center">
                              <div className="">
                                <h4 className="text-sm font-bold text-gray-900">
                                  {review.author_details.username}
                                </h4>
                                <h5 className="text-sm text-gray-400 mt-2">
                                  {review.created_at}
                                </h5>
                                <div className="mt-1 flex items-center">
                                  {review.author_details.rating ? (
                                    [0, 1, 2, 3, 4].map((rating) => (
                                      <StarIcon
                                        key={rating}
                                        className={classNames(
                                          review.author_details.rating > rating
                                            ? "text-yellow-400"
                                            : "text-gray-300",
                                          "h-5 w-5 flex-shrink-0"
                                        )}
                                        aria-hidden="true"
                                      />
                                    ))
                                  ) : (
                                    <h5 className="text-sm text-gray-400">
                                      Not rated
                                    </h5>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div
                              className="mt-4 space-y-6 text-base italic text-gray-600"
                              dangerouslySetInnerHTML={{
                                __html: review.content,
                              }}
                            />
                          </div>
                        );
                      })}

                      <nav className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0 mb-12">
                        <div className="-mt-px w-0 flex-1 flex"></div>
                        <div className="hidden md:-mt-px md:flex">
                          {Array.from(Array(numberOfReviewPages).keys()).map(
                            (number) => {
                              const actualNumber = number + 1;
                              if (actualNumber === index) {
                                return (
                                  <a
                                    className="border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                                    aria-current="page"
                                  >
                                    {actualNumber}
                                  </a>
                                );
                              } else {
                                return (
                                  <a
                                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                                    onClick={() => {
                                      setIndex(actualNumber);
                                    }}
                                  >
                                    {actualNumber}
                                  </a>
                                );
                              }
                            }
                          )}
                        </div>
                        <div className="-mt-px w-0 flex-1 flex justify-end"></div>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  params: { movieId: string };
}) {
  const movieId = context.params.movieId;
  const movie = await getMovieById(movieId);
  const reviewsData = await getMovieReviews(movieId, 1);
  const numberOfReviewPages = reviewsData.page;
  const reviews = reviewsData.results;
  const casts = (await getMovieCasts(movieId)).cast.slice(0, 10);
  return { props: { movieId, movie, reviews, numberOfReviewPages, casts } };
}
export default MovieDetailedView;
