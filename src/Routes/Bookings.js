import { Router } from "express";
import createBooking from "../Services/Bookings/createBookings.js";
import deleteBookingById from "../Services/Bookings/deleteBookingsById.js";
import getBookings from "../Services/Bookings/getBookings.js";
import getBookingById from "../Services/Bookings/getBookingsById.js";
import updateBookingById from "../Services/Bookings/updateBookingsById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.query;
    const bookings = await getBookings(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.json(bookings);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    //If statement tip from stack overflow:
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log(`Q says: 400 Bad request; Booking was not created.`);
      res
        .status(400)
        .json({ message: `Q says: 400 Bad request; Booking was not created.` });
    } else {
      const newBooking = await createBooking(
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus
      );
      if (newBooking) {
        console.log(
          `Q says: 201 Created; Booking created, for date: ${checkinDate}`
        );
        res.status(201).json(newBooking);
      } else {
        //409 as error as there is a conflict with putting data in the database.
        console.log(`Q says: 409 Conflict; Booking was not created.`);
        res
          .status(409)
          .json({ message: `Q says: 409 Conflict; Booking was not created.` });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const booking = await getBookingById(id);

    if (!booking) {
      console.log(`Q says: 404 Not found; Booking with id: ${id}`);
      res
        .status(404)
        .json({ message: `Q says: 404 Not found; Booking with id: ${id}` });
    } else {
      console.log(`Q says: 200 Found; Returning booking with id: ${id}`);
      res.status(200).json(booking);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteBooking = await deleteBookingById(id);

    if (deleteBooking) {
      console.log(`Q says: 200 OK; Booking with id: ${id} is deleted`);
      res.status(200).send({
        message: `Q says: 200 OK; Booking with id: ${id} is deleted`,
        deleteBooking,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Delete failed, for booking with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Delete failed, for booking with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log("Q says: Object missing");
    }
    const updateBooking = await updateBookingById(id, {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    });

    if (updateBooking) {
      console.log(`Q says: 200 OK; Booking with id: ${id} is updated`);
      res.status(200).send({
        message: `Q says: 200 OK; Booking with id: ${id} is updated`,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Update did not run for, booking with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, booking with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
