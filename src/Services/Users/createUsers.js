import { PrismaClient } from "@prisma/client";

// To keep things clean, named all columns.

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  console.log("user name: ", username);
  const prisma = new PrismaClient();
  const user = await prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
  return user;
};

export default createUser;
