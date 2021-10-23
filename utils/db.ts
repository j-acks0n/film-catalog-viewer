import { PrismaClient } from "@prisma/client";

const createUser = async (email: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: { email },
  });
  await prisma.$disconnect();
  return user;
};

export { createUser };
