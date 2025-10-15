import { Router, Request, Response } from "express";
import findProductsByLocation from "../services/productService";

const router = Router();

router.get("/", async (req: Request, res: Response) => {

    const { lat, lng, distance, page, searchTerm, sort } = req.query;

    if (!lat || !lng || !page) {
        return res.status(400).json({ error: "Missing one of the required parameter: lat, lng, page" });
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    const pageNumber = parseInt(page as string) || 1;

    if (isNaN(latitude) || isNaN(longitude) || isNaN(pageNumber)) {
        return res.status(400).json({ error: "Invalid format for lat, lng or page" });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return res.status(400).json({ error: "Invalid Latitude Longitude range" });
    }

    if (pageNumber < 1) {
        return res.status(400).json({ error: "Page number cannot be negative" });
    }

    // pagination logic
    const PAGE_SIZE = 30;
    const from = (pageNumber - 1) * PAGE_SIZE;
    const searchDistance = (distance as string) || '100km';
    const searchText = (searchTerm as string);
    const sortBy = (sort as string) || 'relevance';


    try {
        const data = await findProductsByLocation({
            lat: latitude,
            lon: longitude,
            distance: searchDistance,
            page: pageNumber,
            pageSize: PAGE_SIZE,
            searchText: searchText,
            sortBy: sortBy
        });

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json(({ error: "An internal server error occurred" }));
    }

});

export default router;