import { PrismaClient } from "@prisma/client";

const getUsers = async (username, name, email, phoneNumber, profilePicture) => {
  const prisma = new PrismaClient();
  //in the users searching on name can be flexible with contains.
  //No conversion needed.
  //consideration to not return passwords.
  const recordCount = await prisma.user.count({
    where: {
      username,
      name: {
        contains: name,
      },
      email,
      phoneNumber,
      profilePicture,
    },
  });
  console.log(`Q Says: records found for your user query: `, recordCount);
  const users = await prisma.user.findMany({
    where: {
      username,
      name: {
        contains: name,
      },
      email,
      phoneNumber,
      profilePicture,
    },
  });

  return users;
};

export default getUsers;
