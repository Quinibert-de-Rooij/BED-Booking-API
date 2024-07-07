import { Router } from "express";
import createAmenity from "../Services/Amenities/createAmenities.js";
import deleteAmenityById from "../Services/Amenities/deleteAmenitiesById.js";
import getAmenityById from "../Services/Amenities/getAmenitiesById.js";
import getAmenities from "../Services/Amenities/getAmenities.js";
import updateAmenityById from "../Services/Amenities/updateAmenitiesById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { id, name } = req.query;
    const amenities = await getAmenities(id, name);
    res.json(amenities);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { name } = req.body;
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const amenity = await getAmenityById(id);

    if (!amenity) {
      res
        .status(404)
        .json({ message: `Q says: 404 Not found; Amenity with id: ${id}` });
    } else {
      res.status(200).json(amenity);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteAmenity = await deleteAmenityById(id);

    if (deleteAmenity) {
      res.status(200).send({
        message: `Q says: 200 OK; Amenity with id: ${id} is deleted`,
        deleteAmenity,
      });
    } else {
      res.status(404).json({
        message: `Q says: 404 Not found; Delete failed, for amenity with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateAmenity = await updateAmenityById(id, { name });

    if (updateAmenity) {
      res.status(200).send({
        message: `Q says: 200 OK; Amenity with id: ${id} is updated`,
      });
    } else {
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, amenity with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
