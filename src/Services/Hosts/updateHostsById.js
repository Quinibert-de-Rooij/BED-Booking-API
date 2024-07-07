import { PrismaClient } from "@prisma/client";

const updateHostById = async (id, hostUpdateData) => {
  const prisma = new PrismaClient();
  //Again: variable pictureURL <=> profilePicture
  const host = await prisma.host.updateMany({
    where: { id },
    data: hostUpdateData,
  });

  return host.count > 0 ? id : null;
};

export default updateHostById;
