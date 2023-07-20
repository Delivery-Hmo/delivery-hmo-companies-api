import { Product } from './product';

export interface ProductBranchOffice {
  readonly id?: string;
  otherPrice: number;
  otherDiscount: number;
  otherDiscountedPrice: number;
  activeOtherPrice: boolean;
  activeOtherDiscount: boolean;
  product: string | Product;
}