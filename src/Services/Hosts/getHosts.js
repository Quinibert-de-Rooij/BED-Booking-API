import { PrismaClient } from "@prisma/client";

const getHosts = async (
  id,
  name,
  email,
  phoneNumberGiven,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();
  const hosts = await prisma.host.findMany({
    where: { id, name, email, phoneNumberGiven, profilePicture, aboutMe },
  });

  return hosts;
};

export default getHosts;
