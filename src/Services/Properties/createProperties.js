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
  //To complete the clean lines while testing (Noticed DB constraints were still possible)
  try {
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
  } catch (error) {
    return false;
  }
};

export default createProperty;
