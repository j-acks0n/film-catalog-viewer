import axios from "axios";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const removeMovieFromFavourite = async (email: string, movieId: string) => {
  await axios({
    method: "post",
    url: "/api/database/remove_movie_from_favourite",
    data: {
      email,
      movieId,
    },
  });
};

const addMovieToFavourite = async (email: string, movieId: string) => {
  await axios({
    method: "post",
    url: "/api/database/add_movie_to_favourite",
    data: {
      email,
      movieId,
    },
  });
};

interface ServerData {
  received: number;
  favourites: string[];
}

interface ServerResponse {
  data: ServerData;
}

const getFavourites = async () => {
  const data = await axios
    .get<ServerData>("/api/database/get_favourites")
    .then((response: ServerResponse) => {
      // `response` is of type `AxiosResponse<ServerData>`
      const { data } = response;
      return data.favourites;
    });
  return data;
};

export {
  addMovieToFavourite,
  classNames,
  getFavourites,
  removeMovieFromFavourite,
};

// await axios({
//   method: "get",
//   url: "/api/database/get_favourites",
//   data: {
//     email,
//   },
// });
