import { PrismaClient } from "@prisma/client";

const deleteBookingById = async (id) => {
  const prisma = new PrismaClient();
  const deleteBooking = await prisma.booking.deleteMany({
    where: { id },
  });
  if (!deleteBooking || deleteBooking.count === 0) {
    return false;
  }
  return true;
};

export default deleteBookingById;
