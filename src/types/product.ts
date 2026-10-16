export interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
  images: string[];
  creationAt: string;
  updatedAt: string;
}

export interface NewProduct {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  creationAt: string;
}

export interface EditedProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
  creationAt: string;
}
