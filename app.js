import express, { urlencoded } from "express";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import orderRoute from "./routes/order.js";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middleswares/errorMiddleware.js";
import cors from "cors";

const app = express();

dotenv.config({
  path: "./config/config.env",
});

// Using Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);

app.use(cookieParser()); // for isAuthentication

app.use(express.json()); // for placeorder functon in order controllers
app.use(
  // for placeorder functon in order controllers
  urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();

// importing routes
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

// using error middleware
app.use(errorMiddleware);

export default app;
