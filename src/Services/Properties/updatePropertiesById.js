import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, propertyUpdateData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.property.count({
    where: { id },
  });
  console.log("Q says: Records to update is: ", recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
  const { hostId, ...data } = propertyUpdateData;
  const property = await prisma.property.update({
    where: { id },
    data: {
      ...data,
      hostProperty: hostId
        ? {
            connect: { id: hostId },
          }
        : undefined,
    },
  });

  return property;
};

export default updatePropertyById;
