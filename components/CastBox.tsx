import { Cast } from "../utils/types";
import { startOfPosterLink } from "./movieBox";
import Image from "next/image";
type CastType = {
  cast: Cast;
};

const CastBox = ({ cast }: CastType) => {
  let imgSRC = startOfPosterLink + cast.profile_path;
  imgSRC =
    imgSRC === "https://image.tmdb.org/t/p/w500null"
      ? "https://www.seekpng.com/png/full/110-1100707_person-avatar-placeholder.png"
      : imgSRC;
  console.log(imgSRC);
  return (
    <div>
      <div
        className={
          "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 group block bg-gray-100 overflow-hidden rounded-lg relative"
        }
        style={{ height: "350px", width: "275px" }}
      >
        <Image
          src={imgSRC}
          alt="Picture of the author"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <p className="mt-4 block text-md font-medium text-gray-900 truncate pointer-events-none text-center">
        {cast.name}
      </p>
    </div>
  );
};

export default CastBox;
