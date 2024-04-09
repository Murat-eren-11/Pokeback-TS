import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World !");
});

import pokemonsRoutes from "./routes/pokemon";
app.use(pokemonsRoutes);

app.listen(process.env.PORT, () => {
  console.log("serveur STARTED ON TYPESCRIPT BITCHES");
});
