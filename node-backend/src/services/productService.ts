import client from "../elasticsearch";
import { IProduct, IProductsByLocation } from "../types/type";
import { buildEsQuery } from "../utils/buildEsQuery";
import { SORT_OPTIONS_MAP } from "../utils/sortOptions";


async function findProductsByLocation(params: IProductsByLocation) {

    const { lat, lon, distance, page, pageSize, searchText, sortBy } = params;

    const from = (page - 1) * pageSize;

    try {

        const baseQuery = buildEsQuery(params, from);

        const queryResult = await client.search(baseQuery);

        const results = queryResult.hits.hits.map((hit) => {
            const source = hit._source as IProduct;

            const distanceKm = hit.fields?.distance[0];

            return {
                ...source,
                distance: distanceKm ? `${distanceKm.toFixed(2)} Km` : 'N/A',
                score: hit._score ? `${hit._score.toFixed(2)}` : 'N/A'
            };

        });

        // logic to check if there are more results to fetch
        const totalHits = typeof queryResult.hits.total === 'number' ? queryResult.hits.total : queryResult.hits.total?.value || 0;
        const hasMore = from + results.length < totalHits;
        const currentRecords = ((from + pageSize) < totalHits) ? (from + pageSize) : totalHits;

        return {
            results,
            hasMore,
            currentRecords,
            totalHits
        };
    } catch (error) {
        console.log(error);
        throw new Error("Failed to retrieve product data.");
    }

}

export default findProductsByLocation;