export type UrlString = string;

export interface Planet {
    name: string;
    rotation_period: string;
    orbital_period: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surface_water: string;
    population: string;
    residents: UrlString[];
    films: UrlString[];
    created: string;
    edited: string;
    url: UrlString;
}
