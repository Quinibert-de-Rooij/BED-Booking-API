import { PrismaClient } from "@prisma/client";

const deleteReviewById = async (id) => {
  const prisma = new PrismaClient();
  const deleteReview = await prisma.review.deleteMany({
    where: { id },
  });
  if (!deleteReview || deleteReview.count === 0) {
    return false;
  }
  return true;
};

export default deleteReviewById;
