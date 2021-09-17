export interface Message {
  message: string;
}
export interface RealEstateData {
  totalPriceRent: number;
  priceSale: number;
  productType: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  isToRent: boolean;
  isToSell: boolean;
  photos: string[];
}
