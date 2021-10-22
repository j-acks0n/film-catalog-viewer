/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'image.tmdb.org', 'critics.io'],
  }, env: {
    NEXT_MOVIE_DB_API_KEY: process.env.NEXT_MOVIE_DB_API_KEY,
  }
}
