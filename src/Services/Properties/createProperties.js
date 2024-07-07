import { PrismaClient } from "@prisma/client";

const createProperty = async (
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();
  //With mappings it seems handy to name per column.
  const property = await prisma.property.create({
    data: {
      hostProperty: {
        connect: { id: hostId },
      },
      title: title,
      description: description,
      location: location,
      pricePerNight: pricePerNight,
      bedroomCount: bedroomCount,
      bathRoomCount: bathRoomCount,
      maxGuestCount: maxGuestCount,
      rating: rating,
    },
  });

  return property;
};

export default createProperty;
