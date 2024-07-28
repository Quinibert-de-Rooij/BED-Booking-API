import { PrismaClient } from "@prisma/client";

const getProperties = async (
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
  //for some reason the Integers are giving issues when searched on.
  //to prevent this, the parseint is helping keep the query alife :)
  //GTE is greater or equal, the count and rating, the idea is that the guest might look at minimum rating.
  //for future referenses new variables can be introduced, to accommodate new features, like min max prises.
  //prise per night => uquals fot the exersize.
  //maxGuestCount is also gte, as we want perhaps a property that can at least have 3 persons the max should be 3 or higher.
  rating = rating && parseInt(rating);
  bedroomCount = bedroomCount && parseInt(bedroomCount);
  bathRoomCount = bathRoomCount && parseInt(bathRoomCount);
  maxGuestCount = maxGuestCount && parseInt(maxGuestCount);
  const prisma = new PrismaClient();
  const recordCount = await prisma.property.count({
    where: {
      title: {
        contains: title,
      },
      description: {
        contains: description,
      },
      location: {
        contains: location,
      },
      pricePerNight,
      bedroomCount: {
        gte: bedroomCount,
      },
      bathRoomCount: {
        gte: bathRoomCount,
      },
      maxGuestCount: {
        gte: maxGuestCount,
      },
      hostId,
      rating: {
        gte: rating,
      },
    },
  });
  console.log(`Q Says: records found for your property query: `, recordCount);
  const properties = await prisma.property.findMany({
    where: {
      title: {
        contains: title,
      },
      description: {
        contains: description,
      },
      location: {
        contains: location,
      },
      pricePerNight,
      bedroomCount: {
        gte: bedroomCount,
      },
      bathRoomCount: {
        gte: bathRoomCount,
      },
      maxGuestCount: {
        gte: maxGuestCount,
      },
      hostId,
      rating: {
        gte: rating,
      },
    },
  });

  return properties;
};

export default getProperties;
