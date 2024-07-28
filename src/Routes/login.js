import { Router } from "express";
import login from "../Services/Auth/login.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);

    if (!token) {
      console.log(
        "%cQ says:",
        "color:red;",
        " 401 Unauthorized; Invalid credentials!"
      );
      res
        .status(401)
        .json({ message: "Q says: 401 Unauthorized; Invalid credentials!" });
    } else {
      console.log(
        "%cQ says:",
        "color:green;",
        "200 OK; Successfully logged in!",
        token
      );
      res
        .status(200)
        .json({ message: "Q says: 200 OK; Successfully logged in!", token });
    }
  } catch (error) {
    next(error);
  }
});

export default router;
