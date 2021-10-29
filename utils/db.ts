import prisma from "./prisma";

const createUser = async (email: string) => {
  const user = await prisma.user.create({
    data: { email },
  });
  await prisma.$disconnect();
  return user;
};

const getAllFavourites = async (email: string) => {
  let favouriteFilms: string[] | [] = [];
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    if (user.favouriteFilms) {
      favouriteFilms = user.favouriteFilms;
    }
  }
  await prisma.$disconnect();
  return favouriteFilms;
};
const addToFavourite = async (email: string, movieId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    if (user.favouriteFilms) {
      if (!user.favouriteFilms.includes(movieId)) {
        user.favouriteFilms.push(movieId);
      }
    } else {
      user.favouriteFilms = [];
      user.favouriteFilms.push(movieId);
    }
  }
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      favouriteFilms: user?.favouriteFilms,
    },
  });

  await prisma.$disconnect();
  return user;
};

const removeFromFavourite = async (email: string, movieId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    if (user.favouriteFilms) {
      if (user.favouriteFilms.includes(movieId)) {
        user.favouriteFilms = user.favouriteFilms.filter(
          (film: string) => film !== movieId
        );
      }
    } else {
      user.favouriteFilms = [];
    }
  }
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      favouriteFilms: user?.favouriteFilms,
    },
  });

  await prisma.$disconnect();
  return user;
};
export { createUser, addToFavourite, getAllFavourites, removeFromFavourite };
