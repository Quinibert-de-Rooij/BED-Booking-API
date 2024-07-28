import { PrismaClient } from "@prisma/client";

// To keep things clean, named all columns.

const createNewHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  //To complete the clean lines while testing (Noticed DB constraints were still possible)
  try {
    const host = await prisma.host.create({
      data: {
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    return host;
  } catch (error) {
    return false;
  }
};

export default createNewHost;
