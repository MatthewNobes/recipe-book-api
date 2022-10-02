import router from "./routes/index.mjs";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use("/api", router);

app.get("/", (request, response) => {
  response.json("docs, maybe swagger, will go here");
});

export default app;
