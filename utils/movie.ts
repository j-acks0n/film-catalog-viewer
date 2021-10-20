const API_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.NEXT_MOVIE_DB_API_KEY;

//async function fetchAPI(query : string, { variables: any } = {}) {
    // const res = await fetch('https://api.themoviedb.org/3/movie/550?api_key=38b17f196cd011f46deca055abebe093')

async function fetchAPI(param :string, query: string) {
  const URL = `${API_URL}${param}?api_key=${API_KEY}${query}`
  const res = await fetch(URL)
  console.log(URL)
  const json = await res.json();
  console.log(json);
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  return json;
}

export async function getAllMovies(pageNumber : number) {
  const data = await fetchAPI("/search/movie", `&language=en-US&include_adult=false&query=${pageNumber}`);
  return data;
}



