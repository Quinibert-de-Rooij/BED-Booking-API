import { PrismaClient } from "@prisma/client";

const deleteHostById = async (id) => {
  const prisma = new PrismaClient();
  const deleteHost = await prisma.host.deleteMany({
    where: { id },
  });
  if (!deleteHost || deleteHost.count === 0) {
    return false;
  }
  return true;
};

export default deleteHostById;
