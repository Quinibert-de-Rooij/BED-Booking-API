import { PrismaClient } from "@prisma/client";

const getUsers = async (
  id,
  username,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany({
    where: { id, username, name, email, phoneNumber, profilePicture },
  });

  return users;
};

export default getUsers;
