import { PrismaClient } from "@prisma/client";

const createUser = async (email: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: { email },
  });
  await prisma.$disconnect();
  return user;
};

const getAllFavourites = async (email: string) => {
  let favouriteFilms: string[] | [] = [];
  const prisma = new PrismaClient();
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
  const prisma = new PrismaClient();
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
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (user) {
    if (user.favouriteFilms) {
      if (user.favouriteFilms.includes(movieId)) {
        console.log(`before ${user.favouriteFilms} with id ${movieId}`)
        user.favouriteFilms = user.favouriteFilms.filter(film => film !== movieId)
        console.log(`after ${user.favouriteFilms}`)
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
