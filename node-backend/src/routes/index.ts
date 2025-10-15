import { Router, Request, Response } from "express";
import searchRoutes from "./search";
import healthCheckRoute from "./healthCheckRoute";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
    return res.status(200).json(({ error: "success" }));
});

router.use("/search", searchRoutes);
router.use("/health", healthCheckRoute);

export default router;