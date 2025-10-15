

export const SORT_OPTIONS_MAP: {
    [key: string]: (lat: number, lon: number) => any[]
} = {

    'distance_asc': (lat, lon) => ([{ _geo_distance: { location: { lat, lon }, order: 'asc', unit: 'km', mode: 'min', distance_type: 'arc', ignore_unmapped: true } }]),
    'distance_desc': (lat, lon) => ([{ _geo_distance: { location: { lat, lon }, order: 'desc', unit: 'km', mode: 'min', distance_type: 'arc', ignore_unmapped: true } }]),
    'price_asc': (lat, lon) => ([{ price: 'asc' }]),
    'price_desc': (lat, lon) => ([{ price: 'desc' }]),
    'relevance': () => ([{ _score: 'desc' }])
}
