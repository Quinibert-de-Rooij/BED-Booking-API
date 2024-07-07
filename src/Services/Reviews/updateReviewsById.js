import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, reviewUpdateData) => {
  const prisma = new PrismaClient();
  const { userId, propertyId, ...data } = reviewUpdateData;
  const review = await prisma.review.update({
    where: { id },
    data: {
      ...data,
      userReview: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      propertyReview: propertyId
        ? {
            connect: { id: propertyId },
          }
        : undefined,
    },
  });

  return review;
};

export default updateReviewById;
