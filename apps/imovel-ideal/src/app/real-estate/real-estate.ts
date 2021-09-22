export interface RealEstate {
    id: number;
    description: string;
    sourcePortal: string;
    PriceSale: number;
    PriceRent: number;
    totalPriceRent: number;
    iptuValue: number;
    condominiumValue: number;
    isToRent: boolean;
    isToSell: boolean;
    productType: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    photos: string[];
    attributes: any[];
}