export interface RealEstate {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    valueToRent: number;
    valueToSell: number;
    sourcePortal: string;
    photos: string[];
    // eslint-disable-next-line @typescript-eslint/ban-types
    attributes: object[];
}