const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_MOVIE_DB_API_KEY;

//async function fetchAPI(query : string, { variables: any } = {}) {
// const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=38b17f196cd011f46deca055abebe093')

export async function fetchAPI(param: string, query: string) {
  const URL = `${API_URL}${param}?api_key=${API_KEY}${query}`;
  const res = await fetch(URL);
  //console.log(URL)
  const json = await res.json();
  //console.log(json);
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}

export async function getMostPopularMovies(pageNumber: number) {
  // const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  console.log(pageNumber)
  const data = await fetchAPI(
    "/movie/popular",
    `&language=en-US&include_adult=false&page=${pageNumber}`
  );
  return data;
}

export async function getTopRatedMovies(pageNumber: number) {
  // const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  const data = await fetchAPI(
    "/movie/top_rated",
    `&language=en-US&include_adult=false&page=${pageNumber}`
  );
  return data;
}

export async function getMovieById(id: string) {
  const data = await fetchAPI(`/movie/${id}}`, `&append_to_response=videos`);
  return data;
}



export async function getSimilarMovies(movieId: string) {
  // const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  const data = await fetchAPI(
    `/movie/${movieId}/similar`,
    `&language=en-US&page=1`
  );
  return data;
}

export async function getMovieReviews(movieId: string, pageNumber: number) {
  // const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  const data = await fetchAPI(
    `/movie/${movieId}/reviews`,
    `&language=en-US&page=${pageNumber}`
  );
  return data;
}


export async function getMovieCasts(movieId: string) {
  // const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  const data = await fetchAPI(
    `/movie/${movieId}/credits`,
    `&language=en-US`
  );
  return data;
}
