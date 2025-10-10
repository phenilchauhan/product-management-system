import { Category } from './category.model';

export interface Product {
  id?: number;
  uniqueId?: string;
  name: string;
  price: number;
  categoryId: number;
  image?: string;
}
