import { IProduct, IProductsByLocation } from "../types/type";
import { SORT_OPTIONS_MAP } from "../utils/sortOptions";


export function buildEsQuery(params: IProductsByLocation, from: number) {

    const { lat, lon, distance, page, pageSize, searchText, sortBy } = params;

    // base query
    const baseQuery: any = {
        index: "products",
        from: from,
        size: pageSize,
        query: {
            bool: {
                filter: {
                    geo_distance: {
                        distance,
                        location: { lat, lon }
                    }
                }
            }
        },
        sort: [],
        _source: true,
        track_scores: true,
        script_fields: {
            distance: {
                script: {
                    source: "doc['location'].arcDistance(params.lat, params.lon) / 1000", // /1000 is for km output
                    params: {
                        lat: lat,
                        lon: lon
                    }

                }
            }
        }

    }


    // if search string is provided
    if (searchText && searchText.trim() !== '') {
        const normalizedSearchText = searchText.toLowerCase();
        baseQuery.query.bool.must = {

            bool: {
                should: [
                    {
                        multi_match: {
                            query: normalizedSearchText,
                            type: "bool_prefix",
                            fields: ["brand", "name"]
                        }
                    },
                    {
                        multi_match: {
                            query: normalizedSearchText,
                            type: "bool_prefix",
                            fields: ["brand", "name"],
                            fuzziness: "AUTO"
                        }
                    },
                    {
                        term: {
                            "city": {
                                value: normalizedSearchText,
                                boost: 2
                            }
                        }
                    }
                ],
                minimum_should_match: 1
            }
        };
    } else {
        baseQuery.query.bool.must = {
            match_all: {}
        };
    }

    if (sortBy === 'relevance' || (searchText && !sortBy)) {
        baseQuery.sort.push({ _score: 'desc' });
    } else {
        const sortKey = (sortBy as string) in SORT_OPTIONS_MAP ? (sortBy as string) : 'relevance';
        baseQuery.sort = SORT_OPTIONS_MAP[sortKey](lat, lon);
        if (sortKey !== 'relevance') {
            baseQuery.sort.push({ _score: 'desc' });
        }

    }

    return baseQuery;
}