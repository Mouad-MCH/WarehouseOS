
export interface IProduct {
  _id: string;
  name: string;
  sku : string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}