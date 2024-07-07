import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.create({
    data: {
      userReview: {
        connect: { id: userId },
      },
      propertyReview: {
        connect: { id: propertyId },
      },
      rating: rating,
      comment: comment,
    },
  });

  return review;
};

export default createReview;
