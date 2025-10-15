export interface IProduct {
    name: string;
    price: number;
    description: string;
    location: {
        lon: number;
        lat: number;
    };
    city: string;
}

export interface IProductsByLocation {
    lat: number;
    lon: number;
    distance: string;
    page: number;
    pageSize: number;
    searchText: string;
    sortBy: string;
}