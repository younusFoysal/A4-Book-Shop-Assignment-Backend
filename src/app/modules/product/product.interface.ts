export type TProduct = {
  title: string;
  author: string;
  price: number;
  category: "Fiction" | "Science" | "SelfDevelopment" | "Poetry" | "Religious";
  description: string;
  image: string;
  rating: number;
  quantity: number;
  inStock: boolean;
};
