import { PrismaClient } from "@prisma/client";

// To keep things clean, named all columns.

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  const booking = await prisma.booking.create({
    data: {
      userBooking: {
        connect: { id: userId },
      },
      propertyBooking: {
        connect: { id: propertyId },
      },
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return booking;
};

export default createBooking;
