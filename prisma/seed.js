import { PrismaClient } from "@prisma/client";
import usersData from "../src/data/users.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import propertiesData from "../src/data/properties.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };

const prisma = new PrismaClient({ log: ["query", "info", "warn", "error"] });

async function main() {
  const { users } = usersData;
  const { reviews } = reviewsData;
  const { bookings } = bookingsData;
  const { properties } = propertiesData;
  const { hosts } = hostsData;
  const { amenities } = amenitiesData;

  //Issue with user data, column pictureURL need to fill with profilePicture from the JSON file.
  //Update picture URL ia removed for programebility purpose.
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id,
        username: user.username,
        password: user.password,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        profilePicture: user.profilePicture,
      },
    });
  }

  //Preventing similar issue on host:
  //Update picture URL ia removed for programebility purpose.
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { id: host.id },
      update: {},
      create: {
        id: host.id,
        username: host.username,
        password: host.password,
        name: host.name,
        email: host.email,
        phoneNumber: host.phoneNumber,
        profilePicture: host.profilePicture,
        aboutMe: host.aboutMe,
      },
    });
  }

  //next propry, this is the first one and with 1 link to connect.
  //The other 2 tables have multi links with this one and the user.
  for (const property of properties) {
    await prisma.property.upsert({
      where: { id: property.id },
      update: {},
      create: {
        id: property.id,
        hostProperty: {
          connect: { id: property.hostId },
        },
        title: property.title,
        description: property.description,
        location: property.location,
        pricePerNight: property.pricePerNight,
        bedroomCount: property.bedroomCount,
        bathRoomCount: property.bathRoomCount,
        maxGuestCount: property.maxGuestCount,
        rating: property.rating,
      },
    });
  }

  //review and booking tables have multiole connections.
  //Since we create in this order it schould exist to make the connection.
  for (const review of reviews) {
    await prisma.review.upsert({
      where: { id: review.id },
      update: {},
      create: {
        id: review.id,
        userReview: {
          connect: { id: review.userId },
        },
        propertyReview: {
          connect: { id: review.propertyId },
        },
        rating: review.rating,
        comment: review.comment,
      },
    });
  }

  for (const booking of bookings) {
    await prisma.booking.upsert({
      where: { id: booking.id },
      update: {},
      create: {
        id: booking.id,
        userBooking: {
          connect: { id: booking.userId },
        },
        propertyBooking: {
          connect: { id: booking.propertyId },
        },
        checkinDate: booking.checkinDate,
        checkoutDate: booking.checkoutDate,
        numberOfGuests: booking.numberOfGuests,
        totalPrice: booking.totalPrice,
        bookingStatus: booking.bookingStatus,
      },
    });
  }

  //This one should copy 1 on 1
  for (const amenity of amenities) {
    await prisma.amenity.upsert({
      where: { id: amenity.id },
      update: {},
      create: amenity,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
