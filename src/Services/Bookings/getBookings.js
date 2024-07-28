import { PrismaClient } from "@prisma/client";

const getBookings = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();
  //in the bookings there is no real problem other thant he int conversion.
  //tested with date, #guests and prices, only int makes the query crash when not converted.
  numberOfGuests = numberOfGuests && parseInt(numberOfGuests);
  const recordCount = await prisma.booking.count({
    where: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });
  console.log(`Q Says: records found for your booking query: `, recordCount);
  const bookings = await prisma.booking.findMany({
    where: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  return bookings;
};

export default getBookings;
