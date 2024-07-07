import express from "express";
import * as Sentry from "@sentry/node";
import "dotenv/config";
import log from "./Middleware/logMiddleware.js";
import errorHandler from "./Middleware/errorHandler.js";

//import routers
import amenitiesRouter from "./Routes/Amenities.js";
import bookingsRouter from "./Routes/Bookings.js";
import hostsRouter from "./Routes/Hosts.js";
import propertiesRouter from "./Routes/Properties.js";
import reviewsRouter from "./Routes/Reviews.js";
import usersRouter from "./Routes/Users.js";
import loginRouter from "./Routes/login.js";

const app = express();

// Sentry and other key components for project qdr-booking-winc: Ask me on Slack for the .env file.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

//Sentry Handlers:
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

//Start log:
app.use(log);

//Routers:
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/reviews", reviewsRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//Error handling
app.use(Sentry.Handlers.errorHandler());
app.use(errorHandler);

app.listen(3000, () => {
  console.log(
    "Q says: 100 Continue; Server is listening on port 3000; please proceed to send the request body."
  );
});
