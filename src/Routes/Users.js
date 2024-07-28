import { Router } from "express";
import createUser from "../Services/Users/createUsers.js";
import deleteUserById from "../Services/Users/deleteUsersById.js";
import getUsers from "../Services/Users/getUsers.js";
import getUserById from "../Services/Users/getUsersById.js";
import updateUserById from "../Services/Users/updateUsersById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, profilePicture } = req.query;
    const users = await getUsers(
      username,
      name,
      email,
      phoneNumber,
      profilePicture
    );
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const { username, password, name, email, phoneNumber, profilePicture } =
      req.body;
    //If statement tip from stack overflow:
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log(`Q says: 400 Bad request; User was not created.`);
      res
        .status(400)
        .json({ message: `Q says: 400 Bad request; User was not created.` });
    } else {
      console.log("start function");
      const newUser = await createUser(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture
      );
      if (newUser) {
        console.log(`Q says: 201 Created; User created, for: ${name}`);
        res.status(201).json(newUser);
      } else {
        //409 as error as there is a conflict with putting data in the database.
        console.log(`Q says: 409 Conflict; User was not created.`);
        res
          .status(409)
          .json({ message: `Q says: 409 Conflict; User was not created.` });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      console.log(`Q says: 404 Not found; User with id: ${id}`);
      res
        .status(404)
        .json({ message: `Q says: 404 Not found; User with id: ${id}` });
    } else {
      console.log(`Q says: 200 Found; Returning user with id: ${id}`);
      res.status(200).json(user);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteUser = await deleteUserById(id);

    if (deleteUser) {
      console.log(`Q says: 200 OK; User with id: ${id} is deleted`);
      res.status(200).send({
        message: `Q says: 200 OK; User with id: ${id} is deleted`,
        deleteUser,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Delete failed, for user with id: ${id}`
      );
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
    const { username, password, name, phoneNumber, email, profilePicture } =
      req.body;
    const updateUser = await updateUserById(id, {
      username,
      name,
      password,
      phoneNumber,
      email,
      profilePicture,
    });

    if (updateUser) {
      console.log(`Q says: 200 OK; User with id: ${id} is updated`);
      res.status(200).send({
        message: `Q says: 200 OK; User with id: ${id} is updated`,
        updateUser,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Update did not run for, user with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, user with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
