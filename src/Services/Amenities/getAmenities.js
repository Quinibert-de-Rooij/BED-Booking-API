import { PrismaClient } from "@prisma/client";

const getAmenities = async (name) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.amenity.count({
    where: {
      name: {
        contains: name,
      },
    },
  });
  console.log(`Q Says: records found for your amenity query: `, recordCount);
  const amenities = await prisma.amenity.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
  return amenities;
};

export default getAmenities;
