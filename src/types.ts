export type Category =
  | "Fresh Lemons"
  | "Pickles"
  | "Lemon Juice"
  | "Ghee"
  | "Rice & Grains"
  | "Spices & More";

export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  unit: string;
  image: string;
  featured?: boolean;
  stock?: boolean;
};
