import { PrismaClient } from "@prisma/client";

const getHosts = async (
  username,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  //in the hosts searching on name and about me can be flexible with contains.
  //No conversion needed.
  //consideration to not return passwords.
  const recordCount = await prisma.host.count({
    where: {
      username,
      name: {
        contains: name,
      },
      email,
      phoneNumber,
      profilePicture,
      aboutMe: {
        contains: aboutMe,
      },
    },
  });
  console.log(`Q Says: records found for your host-user query: `, recordCount);
  const hosts = await prisma.host.findMany({
    where: {
      username,
      name: {
        contains: name,
      },
      email,
      phoneNumber,
      profilePicture,
      aboutMe: {
        contains: aboutMe,
      },
    },
  });

  return hosts;
};

export default getHosts;
