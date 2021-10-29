/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'image.tmdb.org', 'critics.io', 'www.seekpng.com', 'avatars.dicebear.com'],
  }, env: {
    NEXT_MOVIE_DB_API_KEY: process.env.NEXT_MOVIE_DB_API_KEY,
  },
  swcMinify: true
}
