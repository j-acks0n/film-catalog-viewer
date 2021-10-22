import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { startOfPosterLink } from "../../components/movieBox";
import { getMovieById } from "../../utils/movie";
import { Movie } from "../../utils/types";
import Image from "next/image";
import { PaperClipIcon } from "@heroicons/react/solid";
import Link from "next/link";

type MovieType = {
  movie: Movie;
};
const MovieDetailedView = ({ movie }: MovieType) => {
  let trailerId;
  if (movie.videos) {
    console.log(movie.videos);
    movie.videos.results.map((video) => {
      if (video.type === "Trailer") {
        trailerId = video.key;
      }
    });
  }

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
      <div className="bg-white max-w-7xl mx-auto py-12 sm:px-6 lg:px-8 my-8 rounded-lg shadow ">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4 ">
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
                  <div onClick={() => {}}>Trailer</div>
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
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        About
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud
                        anim incididunt cillum culpa consequat. Excepteur qui
                        ipsum aliquip consequat sint. Sit id mollit nulla mollit
                        nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul
                          role="list"
                          className="border border-gray-200 rounded-md divide-y divide-gray-200"
                        >
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                resume_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                          <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                            <div className="w-0 flex-1 flex items-center">
                              <PaperClipIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span className="ml-2 flex-1 w-0 truncate">
                                coverletter_back_end_developer.pdf
                              </span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <a
                                href="#"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Download
                              </a>
                            </div>
                          </li>
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
            <div className="">2</div>
            <div className="">3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: {
  params: { movieId: string };
}) {
  const id = context.params.movieId;
  const movie = await getMovieById(id);
  console.log(movie);
  // Rest of `getServerSideProps` code
  return { props: { movie } };
}
export default MovieDetailedView;
