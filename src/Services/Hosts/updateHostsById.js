import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, hostUpdateData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.host.count({
    where: { id },
  });
  console.log("Q says: Records to update is: ", recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
  const host = await prisma.host.updateMany({
    where: { id },
    data: hostUpdateData,
  });

  return host.count > 0 ? id : null;
};

export default updateHostById;
