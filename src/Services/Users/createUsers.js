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
  //To complete the clean lines while testing (Noticed DB constraints were still possible)
  try {
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
  } catch (error) {
    return false;
  }
};

export default createUser;
