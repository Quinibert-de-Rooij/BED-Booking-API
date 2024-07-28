import { Router } from "express";
//changed name to createNewHost createHost seems to be part of the syntax.
import createNewHost from "../Services/Hosts/createHosts.js";
import deleteHostById from "../Services/Hosts/deleteHostsById.js";
import getHosts from "../Services/Hosts/getHosts.js";
import getHostById from "../Services/Hosts/getHostsById.js";
import updateHostById from "../Services/Hosts/updateHostsById.js";
import authMiddleware from "../Middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { username, name, email, phoneNumber, profilePicture, aboutMe } =
      req.query;
    const hosts = await getHosts(
      username,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );
    res.json(hosts);
  } catch (error) {
    next(error);
  }
});

router.post("/", authMiddleware, async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    //If statement tip from stack overflow:
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      console.log(`Q says: 400 Bad request; Host-user was not created.`);
      res.status(400).json({
        message: `Q says: 400 Bad request; Host-user was not created.`,
      });
    } else {
      const newHost = await createNewHost(
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe
      );
      if (newHost) {
        console.log(`Q says: 201 Created; Host-user created, for: ${name}`);
        res.status(201).json(newHost);
      } else {
        //409 as error as there is a conflict with putting data in the database.
        console.log(`Q says: 409 Conflict; Host-user was not created.`);
        res.status(409).json({
          message: `Q says: 409 Conflict; Host-user was not created.`,
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const host = await getHostById(id);

    if (!host) {
      console.log(`Q says: 404 Not found; Host-user with id: ${id}`);
      res.status(404).json({
        message: `Q says: 404 Not found; Host-user with id: ${id}`,
      });
    } else {
      console.log(`Q says: 200 Found; Returning host-user with id: ${id}`);
      res.status(200).json(host);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteHost = await deleteHostById(id);

    if (deleteHost) {
      console.log(`Q says: 200 OK; Host-user with id: ${id} is deleted`);
      res.status(200).send({
        message: `Q says: 200 OK; Host-user with id: ${id} is deleted`,
        deleteHost,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Delete failed, for host-user with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Delete failed, for host-user with id: ${id}`,
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
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;
    const upsateHost = await updateHostById(id, {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    });

    if (upsateHost) {
      console.log(`Q says: 200 OK; Host-user with id: ${id} is updated`);
      res.status(200).send({
        message: `Q says: 200 OK; Host-user with id ${id} is updated`,
      });
    } else {
      console.log(
        `Q says: 404 Not found; Update did not run for, host-user with id: ${id}`
      );
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, host-user with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
