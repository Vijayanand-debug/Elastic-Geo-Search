import { buildEsQuery } from "../utils/buildEsQuery";

describe('building elastic search query helper function', () => {

    const baseParams = {
        lat: 53.34,
        lon: -6.26,
        distance: '10km',
        page: 1,
        pageSize: 10,
        searchText: 'some item',
        sortBy: 'price_asc'
    }

    it('should sort rightly for "price_asc" ', () => {
        const resultQuery = buildEsQuery(baseParams, baseParams.page);
        expect(resultQuery.sort).toEqual([
            { price: 'asc' },
            { _score: 'desc' }
        ]);
    });

    it('should sort rightly for "relevance" ', () => {
        const params = { ...baseParams, sortBy: 'relevance' };
        const resultQuery = buildEsQuery(params, baseParams.page);
        expect(resultQuery.sort).toEqual([
            { _score: 'desc' }
        ]);
    });

    it('should create valid geo_disatnce filter ', () => {
        const resultQuery = buildEsQuery(baseParams, baseParams.page);
        expect(resultQuery.query.bool.filter.geo_distance).toBeDefined();
        expect(resultQuery.query.bool.filter.geo_distance.distance).toBe('10km');
        expect(resultQuery.query.bool.filter.geo_distance.location).toEqual({
            lat: baseParams.lat,
            lon: baseParams.lon
        });
    });

});