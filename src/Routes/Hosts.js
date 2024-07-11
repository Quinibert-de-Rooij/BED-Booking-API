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
    const hosts = await getHosts();
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
      res
        .status(400)
        .json({ message: `Q says: 400 Bad request; Host was not created.` });
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
      res.status(201).json(newHost);
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
      res.status(404).json({
        message: `Q says: 404 Not found; Host-user with id: ${id}`,
      });
    } else {
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
      res.status(200).send({
        message: `Q says: 200 OK; Host-user with id ${id} is deleted`,
        deleteHost,
      });
    } else {
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
      res.status(200).send({
        message: `Q says: 200 OK; Host-user with id ${id} is updated`,
      });
    } else {
      res.status(404).json({
        message: `Q says: 404 Not found; Update did not run for, host-user with id: ${id}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
