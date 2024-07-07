import { PrismaClient } from "@prisma/client";

//only a name can be updated:
const updateAmenityById = async (id, amenityData) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: amenityData,
  });

  return amenity.count > 0 ? id : null;
};

export default updateAmenityById;
