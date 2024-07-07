import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, userUpdateData) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.updateMany({
    where: { id },
    data: userUpdateData,
  });

  return user.count > 0 ? id : null;
};

export default updateUserById;
