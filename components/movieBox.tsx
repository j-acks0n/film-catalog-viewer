import { useMemo, useState } from "react";
import { Movie } from "../utils/types";
import Image from "next/image";
import Link from "next/link";

type MovieType = {
  movie: Movie;
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
const MovieBox = ({ movie }: MovieType) => {
  const [hovered, eventHandlers] = useHover();
  let imgSRC = startOfPosterLink + movie.poster_path;
  imgSRC =
    imgSRC == "https://image.tmdb.org/t/p/w500null"
      ? "https://critics.io/img/movies/poster-placeholder.png"
      : startOfPosterLink + movie.poster_path;
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <li key={movie.id} className="relative" {...eventHandlers}>
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

          <button type="button" className="absolute inset-0 focus:outline-none">
            <span className="sr-only">View details for {movie.title}</span>
          </button>
        </div>
        <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
          {movie.title}
        </p>
        <p className="block text-sm font-medium text-gray-500 pointer-events-none">
          {movie.release_date}
        </p>
      </li>
    </Link>
  );
};

export default MovieBox;

// className={classNames(
//   hovered ? "" : "group-hover:opacity-75",
//   "object-cover pointer-events-none"
// )}
