import type { Product } from "../types";

export const products: Product[] = [
  {
    id: "lemons",
    name: "Fresh Lemons",
    category: "Fresh Lemons",
    description: "Farm Fresh Quality Lemons",
    price: 70,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=900&q=85",
    featured: true
  },
  {
    id: "lemon-pickle",
    name: "Lemon Pickle",
    category: "Pickles",
    description: "Traditional Homemade Pickle",
    price: 250,
    unit: "500g",
    image: "/lemon-pickle-1.jpg",
    featured: true
  },
  {
    id: "lemon-pickle-special",
    name: "Special Lemon Pickle",
    category: "Pickles",
    description: "Spicy traditional lemon pickle",
    price: 280,
    unit: "500g",
    image: "/lemon-pickle-2.jpg",
    featured: true
  },
  {
    id: "lemon-juice",
    name: "Lemon Juice",
    category: "Lemon Juice",
    description: "Pure & Natural Juice",
    price: 150,
    unit: "500ml",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85",
    featured: true
  },
  {
    id: "ghee",
    name: "Pure Cow Ghee",
    category: "Ghee",
    description: "Traditional Pure Cow Ghee",
    price: 650,
    unit: "1L",
    image: "/ghee.jpg",
    featured: true
  },
  {
    id: "rice",
    name: "Premium Rice",
    category: "Rice & Grains",
    description: "Premium Quality Rice",
    price: 80,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=85",
    featured: true
  },
  {
    id: "sugarless-rice",
    name: "Sugarless Rice",
    category: "Rice & Grains",
    description: "Quality rice selection",
    price: 110,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?auto=format&fit=crop&w=900&q=85"
  },
  {
    id: "minumullu",
    name: "Minumullu (Black Gram)",
    category: "Rice & Grains",
    description: "Premium whole black gram",
    price: 160,
    unit: "kg",
    image: "/minumullu.jpg",
    featured: true
  },
  {
    id: "nuvvulu",
    name: "Nuvvulu (Sesame)",
    category: "Spices & More",
    description: "Natural quality sesame seeds",
    price: 135,
    unit: "kg",
    image: "/nuvvulu.jpg",
    featured: true
  },
  {
    id: "yendu-mirchi",
    name: "Yendu Mirchi",
    category: "Spices & More",
    description: "Sun-Dried Dry Red Chillies",
    price: 180,
    unit: "kg",
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=900&q=85",
    featured: true
  },
];
