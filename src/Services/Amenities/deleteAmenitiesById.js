import { PrismaClient } from "@prisma/client";

const deleteAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const deleteAmenity = await prisma.amenity.deleteMany({
    where: { id },
  });
  if (!deleteAmenity || deleteAmenity.count === 0) {
    return false;
  }
  return true;
};

export default deleteAmenityById;
