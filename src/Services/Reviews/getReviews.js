import { PrismaClient } from "@prisma/client";

const getReviews = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  //Revieuws convert ratings and search on minimum rating.
  //commenths in contian search.
  rating = rating && parseInt(rating);
  const recordCount = await prisma.review.count({
    where: {
      userId,
      propertyId,
      rating: {
        gte: rating,
      },
      comment: {
        contains: comment,
      },
    },
  });
  console.log(`Q Says: records found for your host-user query: `, recordCount);
  const reviews = await prisma.review.findMany({
    where: {
      userId,
      propertyId,
      rating: {
        gte: rating,
      },
      comment: {
        contains: comment,
      },
    },
  });

  return reviews;
};

export default getReviews;
