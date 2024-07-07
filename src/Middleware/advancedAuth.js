import { auth } from "express-oauth2-jwt-bearer";

//Best practice from NodeJS 07
//created alternative for booking api:

const authMiddleware = auth({
  audience: "https://qdr-booking-api",
  issuerBaseURL: "https://dev-1eh8xo6vflsrs3vq.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

export default authMiddleware;
