import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();
  const amenityData = {
    name,
  };
  const amenity = await prisma.amenity.create({
    data: amenityData,
  });
  return amenity;
};

export default createAmenity;
