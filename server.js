import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import compression from "compression";

import connectDB from "./configs/db";
import contactRouter from "./routes/contact.route";

const app = express();

// Config .env
dotenv.config();

// Connect to database.
connectDB()
  .then((connection) => {
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  })
  .catch((e) => {
    throw e;
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  compression({
    level: 6,
    threshold: 100 * 1000, //(100 KB)
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);

// Static directory
app.use("/uploads", express.static("uploads"));

// Config for only development
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL_DEV,
    })
  );

  app.use(morgan("dev"));
}

//production stuff
if (process.env.NODE_ENV === "production") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
}

// Routes
app.use("/contact", contactRouter);
app.use("/", (_, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Welcome to the Personal Website APIs!!!" });
})

const port = process.env.PORT || 5000;

app.listen(port || 2000, () => console.log(`Server started on port ${port}`));
