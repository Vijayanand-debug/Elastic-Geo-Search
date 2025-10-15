import app from "../app";
import request from 'supertest';
import esClient from "../elasticsearch";

jest.mock('../elasticsearch');

const mockedEsSearch = esClient.search as jest.Mock;


describe('GET /api/search', () => {

    beforeEach(() => {
        mockedEsSearch.mockClear();
    });

    it('should return 200 ok with search results for a valid request', async () => {

        const mockEsResponse = {
            hits: {
                hits: [
                    {
                        _source: {
                            name: 'powerbank',
                            brand: 'gokumart',
                            price: 15.50,
                            location: { lat: 53.34, lon: -6.26 },
                        },
                    },
                ],
            },
        };

        mockedEsSearch.mockResolvedValue(mockEsResponse);

        const response = await request(app)
            .get('/api/search?lat=53.425632&lng=-6.257375499999999&distance=100km&page=1&searchTerm=powerbank&sort=relevance');

        expect(response.status).toBe(200);
        expect(mockedEsSearch).toHaveBeenCalledTimes(1);
        expect(response.body.results[0].name).toBe('powerbank');
    });

    it('should return 400 Bad Request if lat or lng are missing', async () => {

        const response = await request(app)
            .get('/api/search?searchTerm=test');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Missing one of the required parameter: lat, lng, page',
        });
    });

    it('should return 400 Bad Request if lat,lng are out of range', async () => {

        const response = await request(app)
            .get('/api/search?lat=91&lng=181&distance=100km&page=1');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Invalid Latitude Longitude range',
        });
    });

    it('should return 400 Bad Request if page number is less than 1', async () => {

        const response = await request(app)
            .get('/api/search?lat=53.425632&lng=-6.257375499999999&distance=100km&page=-1');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            error: 'Page number cannot be negative',
        });
    });

});

