import express from "express";
import dotEnv from "dotenv";
import cors from "cors";

const app = express();

dotEnv.config();

app.use(cors());
app.use(express.json());

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
