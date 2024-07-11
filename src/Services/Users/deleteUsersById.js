import { PrismaClient } from "@prisma/client";

const deleteUserById = async (id) => {
  const prisma = new PrismaClient();
  const deleteUser = await prisma.user.deleteMany({
    where: { id },
  });
  if (!deleteUser || deleteUser.count === 0) {
    return false;
  }
  return true;
};

export default deleteUserById;
