import { PrismaClient } from "@prisma/client";

const updateUserById = async (id, userUpdateData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.user.count({
    where: { id },
  });
  console.log("Q says: Records to update is: ", recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
  const user = await prisma.user.updateMany({
    where: { id },
    data: userUpdateData,
  });

  return user.count > 0 ? id : null;
};

export default updateUserById;
