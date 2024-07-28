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
  //To complete the clean lines while testing (Noticed DB constraints were still possible)
  try {
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
  } catch (error) {
    return false;
  }
};

export default createBooking;
