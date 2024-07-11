import { PrismaClient } from "@prisma/client";

const updateReviewById = async (id, reviewUpdateData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.review.count({
    where: { id },
  });
  console.log("Q says: Records to update is: ", recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
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
