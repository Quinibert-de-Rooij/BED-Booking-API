import { PrismaClient } from "@prisma/client";

// Best practice from Events exersize

const updateBookingById = async (id, bookingUpdateData) => {
  const prisma = new PrismaClient();
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
