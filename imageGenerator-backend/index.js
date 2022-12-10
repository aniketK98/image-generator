import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Routes/imageRoutes.js";

const dotenvConfig = dotenv.config();
const port = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/openai", router);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
