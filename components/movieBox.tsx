import { useEffect, useMemo, useState } from "react";
import { Movie } from "../utils/types";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon as EmptyHeartIcon } from "@heroicons/react/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/solid";
import ReactTooltip from "react-tooltip";
import { useUser } from "@auth0/nextjs-auth0";
import {
  addMovieToFavourite,
  removeMovieFromFavourite,
} from "../utils/general";
import Alert from "./Alert";
type MovieBoxType = {
  movie: Movie;
  isFavourited: boolean;
};
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const useHover = () => {
  const [hovered, setHovered] = useState(false);
  const eventHandlers = useMemo(
    () => ({
      onMouseOver() {
        setHovered(true);
      },
      onMouseOut() {
        setHovered(false);
      },
    }),
    []
  );

  return [hovered, eventHandlers];
};

export const startOfPosterLink = "https://image.tmdb.org/t/p/w500";
const MovieBox = ({ movie, isFavourited }: MovieBoxType) => {
  const [hovered, eventHandlers] = useHover();
  const [favourited, setFavourited] = useState(isFavourited);
  const [heartHovered, setHeartHovered] = useState(false);
  const [showAlert, setShowAlert] = useState<Boolean>(false);
  let imgSRC = movie.poster_path
    ? startOfPosterLink + movie.poster_path
    : "https://critics.io/img/movies/poster-placeholder.png";
  const { user } = useUser();

  useEffect(() => {
    setFavourited(isFavourited);
  }, [isFavourited]);
  return (
    <>
      {showAlert && (
        <Alert
          setShowAlert={setShowAlert}
          text={"In order to favourite a movie, you have to be logged in."}
        />
      )}
      <li key={movie.id} className="relative">
        <div>
          {favourited ? (
            heartHovered ? (
              <a
                data-for="unfavourite"
                data-tip="Remove from Favourite"
                data-iscapture="true"
              >
                <EmptyHeartIcon
                  className="w-8 h-8 absolute text-pink-600 heartIcon z-10"
                  onMouseLeave={() => {
                    setHeartHovered(false);
                  }}
                  onClick={() => {
                    if (user && user.email) {
                      removeMovieFromFavourite(user.email, movie.id.toString());
                      setFavourited(false);
                    } else {
                      setShowAlert(true);
                    }
                  }}
                />
                <ReactTooltip id="unfavourite" />
              </a>
            ) : (
              <a
                data-for="favourite"
                data-tip="Add to Favourite"
                data-iscapture="true"
              >
                <SolidHeartIcon
                  className="w-8 h-8 absolute text-pink-600 heartIcon z-10"
                  onMouseEnter={() => {
                    setHeartHovered(true);
                  }}
                />
              </a>
            )
          ) : heartHovered ? (
            <a
              data-for="favourite"
              data-tip="Add to Favourite"
              data-iscapture="true"
            >
              <SolidHeartIcon
                className="w-8 h-8 absolute text-pink-600 heartIcon z-10"
                onMouseLeave={() => {
                  setHeartHovered(false);
                }}
                onClick={() => {
                  if (user && user.email) {
                    addMovieToFavourite(user.email, movie.id.toString());
                    setFavourited(true);
                  } else {
                    setShowAlert(true);
                  }
                }}
              />
              <ReactTooltip id="favourite" />
            </a>
          ) : (
            <EmptyHeartIcon
              className="w-8 h-8 absolute text-pink-600 heartIcon z-10"
              onMouseLeave={() => {}}
              onMouseOver={() => {
                setHeartHovered(true);
              }}
            />
          )}
        </div>

        <Link href={`/movie/${movie.id}`} passHref>
          <div
            className={classNames(
              // hovered
              //   ? "ring-2 ring-offset-2 ring-indigo-500 cursor-pointer"
              //   : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
              // "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden"
              hovered
                ? "ring-2 ring-offset-2 ring-indigo-500 cursor-pointer"
                : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
              "group block bg-gray-100 overflow-hidden rounded-lg relative"
            )}
            style={{ height: "350px", width: "275px" }}
            {...eventHandlers}
          >
            <Image
              src={imgSRC}
              alt="Picture of the author"
              layout="fill"
              objectFit="cover"
            />

            {/* <img
          src={imgSRC}
          alt=""
          className={classNames(
            hovered ? "" : "group-hover:opacity-75",
            "object-cover pointer-events-none"
          )}
        /> */}

            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            >
              <span className="sr-only">View details for {movie.title}</span>
            </button>
          </div>
        </Link>
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {movie.title}
        </p>
        <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          {movie.release_date}
        </p>
      </li>
    </>
  );
};

export default MovieBox;

// className={classNames(
//   hovered ? "" : "group-hover:opacity-75",
//   "object-cover pointer-events-none"
// )}
