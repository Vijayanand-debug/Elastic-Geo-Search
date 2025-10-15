import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
const port = 3000;

// handle CORS errors
app.use(cors());
app.use(express.json());

app.use("/api", routes);


export default app;