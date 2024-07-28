import { Router } from "express";
import createReview from "../Services/Reviews/createReviews.js";
import deleteReviewById from "../Services/Reviews/deleteReviewsById.js";
import getReviews from "../Services/Reviews/getReviews.js";
import getReviewById from "../Services/Reviews/getReviewsById.js";
import updateReviewById from "../Services/Reviews/updateReviewsById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.query;
    const reviews = await getReviews(userId, propertyId, rating, comment);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;
    //If statement tip from stack overflow:
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log(`Q says: 400 Bad request; Review was not created.`);
      res
        .status(400)
        .json({ message: `Q says: 400 Bad request; Review was not created.` });
    } else {
      const newReview = await createReview(userId, propertyId, rating, comment);
      if (newReview) {
        console.log(
          `Q says: 201 Created; Review created, by userId: ${userId}`
        );
        res.status(201).json(newReview);
      } else {
        //409 as error as there is a conflict with putting data in the database.
        console.log(`Q says: 409 Conflict; Review was not created.`);
        res
          .status(409)
          .json({ message: `Q says: 409 Conflict; Review was not created.` });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await getReviewById(id);
    if (!review) {
      console.log(`Q says: 404 Not found; Review with id: ${id}`);
      res
        .status(404)
        .json({ message: `Q says: 404 Not found; Review with id: ${id}` });
    } else {
      console.log(`Q says: 200 Found; Returning review with id: ${id}`);
      res.status(200).json(review);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteReview = await deleteReviewById(id);

    if (deleteReview) {
      console.log(`Q says: 200 OK; Review with id: ${id} is deleted`);
      res.status(200).send({
        message: `Q says: 200 OK; Review with id: ${id} is deleted`,
        deleteReview,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Delete failed, for review with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Delete failed, for review with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, propertyId, rating, comment } = req.body;
    const updateReview = await updateReviewById(id, {
      id,
      userId,
      propertyId,
      rating,
      comment,
    });

    if (updateReview) {
      console.log(`Q says: 200 OK; Review with id: ${id} is updated`);
      res
        .status(200)
        .send({ message: `Q says: 200 OK; Review with id: ${id} is updated` });
    } else {
      console.log(
        `Q says: 404 Not found; Update did not run for, review with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, review with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
