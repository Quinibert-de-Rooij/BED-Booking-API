import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, propertyUpdateData) => {
  const prisma = new PrismaClient();
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
