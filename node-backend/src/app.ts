import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();
const port = 3000;

const corsOptions = {
    origin: 'http://geo.carenest.services'
}

// handle CORS errors
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", routes);


export default app;