import { PrismaClient } from "@prisma/client";

// Best practice from Events exersize

const updateBookingById = async (id, bookingUpdateData) => {
  const prisma = new PrismaClient();
  const recordCount = await prisma.booking.count({
    where: { id },
  });
  console.log("Q says: Records to update is: ", recordCount);
  if (recordCount === 0) {
    return false;
  }

  //Count > 0 found the records to update, now we try to update:
  const { userId, propertyId, ...data } = bookingUpdateData;
  const booking = await prisma.booking.update({
    where: { id },
    data: {
      ...data,
      userBooking: userId
        ? {
            connect: { id: userId },
          }
        : undefined,
      propertyBooking: propertyId
        ? {
            connect: { id: propertyId },
          }
        : undefined,
    },
  });

  return booking;
};

export default updateBookingById;
