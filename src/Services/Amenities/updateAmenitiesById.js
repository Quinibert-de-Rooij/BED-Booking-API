import { PrismaClient } from "@prisma/client";

//only a name can be updated:
const updateAmenityById = async (id, amenityData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.amenity.count({
    where: { id },
  });
  console.log(`Q says: Records to update is: `, recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
  const amenity = await prisma.amenity.updateMany({
    where: { id },
    data: amenityData,
  });

  return amenity.count > 0 ? id : null;
};

export default updateAmenityById;
