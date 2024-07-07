import { PrismaClient } from "@prisma/client";

const getAmenities = async (id, name) => {
  const prisma = new PrismaClient();
  const amenities = await prisma.amenity.findMany({
    where: { id, name },
  });

  return amenities;
};

export default getAmenities;
