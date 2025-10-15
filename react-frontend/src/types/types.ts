export interface Product {
    brand: string;
    name: string;
    price: string;
    location: {
        lat: number;
        lon: number;
    };
    city: string;
    distance: string;
    score: number;
}

export interface ProductsAPIResponse {
    results: Product[]
    hasMore: Boolean;
    currentRecords: number;
    totalHits: number;
}