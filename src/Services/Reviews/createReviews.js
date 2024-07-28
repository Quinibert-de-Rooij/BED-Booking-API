import { PrismaClient } from "@prisma/client";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  //To complete the clean lines while testing (Noticed DB constraints were still possible)
  try {
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
  } catch (error) {
    return false;
  }
};

export default createReview;
