import { PrismaClient } from "@prisma/client";

const getReviews = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const reviews = await prisma.review.findMany({
    where: {
      id,
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  return reviews;
};

export default getReviews;
