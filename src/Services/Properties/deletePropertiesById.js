import { PrismaClient } from "@prisma/client";

const deletePropertyById = async (id) => {
  const prisma = new PrismaClient();
  const deleteProperty = await prisma.property.deleteMany({
    where: { id },
  });
  if (!deleteProperty || deleteProperty.count === 0) {
    return false;
  }
  return true;
};

export default deletePropertyById;
