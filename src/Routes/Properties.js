import { Router } from "express";
import createProperty from "../Services/Properties/createProperties.js";
import deletePropertyById from "../Services/Properties/deletePropertiesById.js";
import getProperties from "../Services/Properties/getProperties.js";
import getPropertyById from "../Services/Properties/getPropertiesById.js";
import updatePropertyById from "../Services/Properties/updatePropertiesById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.query;
    const properties = await getProperties(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.json(properties);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    //If statement tip from stack overflow:
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log(`Q says: 400 Bad request; Property was not created.`);
      res.status(400).json({
        message: `Q says: 400 Bad request; Property was not created.`,
      });
    } else {
      const newProperty = await createProperty(
        title,
        description,
        location,
        pricePerNight,
        bedroomCount,
        bathRoomCount,
        maxGuestCount,
        hostId,
        rating
      );
      if (newProperty) {
        console.log(
          `Q says: 201 Created; Property created, with title: ${title}`
        );
        res.status(201).json(newProperty);
      } else {
        //409 as error as there is a conflict with putting data in the database.
        console.log(`Q says: 409 Conflict; Property was not created.`);
        res
          .status(409)
          .json({ message: `Q says: 409 Conflict; Property was not created.` });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await getPropertyById(id);
    if (!property) {
      console.log(`Q says: 404 Not found; Property with id: ${id}`);
      res
        .status(404)
        .json({ message: `Q says: 404 Not found; Property with id: ${id}` });
    } else {
      console.log(`Q says: 200 Found; Returning property with id: ${id}`);
      res.status(200).json(property);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteProperty = await deletePropertyById(id);
    if (deleteProperty) {
      console.log(`Q says: 200 OK; Property with id: ${id} is deleted`);
      res.status(200).send({
        message: `Q says: 200 OK; Property with id: ${id} is deleted`,
        deleteProperty,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Delete failed, for property with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Delete failed, for property with id: ${id}`,
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
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;
    const updateProperty = await updatePropertyById(id, {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    });
    if (updateProperty) {
      console.log(`Q says: 200 OK; Property with id: ${id} is updated`);
      res.status(200).send({
        message: `Q says: 200 OK; Property with id: ${id} is updated`,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Update did not run for, property with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, property with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
