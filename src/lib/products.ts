import shirt from "@/assets/p-shirt.jpg";
import dress from "@/assets/p-dress.jpg";
import sneakers from "@/assets/p-sneakers.jpg";
import jacket from "@/assets/p-jacket.jpg";
import heels from "@/assets/p-heels.jpg";
import jeans from "@/assets/p-jeans.jpg";
import oxford from "@/assets/p-oxford.jpg";

export type Gender = "men" | "women";
export type Product = {
  id: string;
  name: string;
  gender: Gender;
  category: string;
  isShoe: boolean;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  featured?: boolean;
};

export const menCategories = ["Shirts", "T-Shirts", "Trousers & Jeans", "Jackets", "Shoes", "Sneakers"];
export const womenCategories = ["Dresses", "Tops & Blouses", "Jeans & Trousers", "Skirts", "Shoes", "Heels & Sneakers"];

export const products: Product[] = [
  { id: "m1", name: "Classic Linen Shirt", gender: "men", category: "Shirts", isShoe: false, price: 25000, salePrice: 19500, image: shirt, description: "Breathable pure linen shirt with a relaxed tailored fit, perfect for Kigali afternoons.", featured: true },
  { id: "m2", name: "Oxford Cotton Shirt", gender: "men", category: "Shirts", isShoe: false, price: 22000, image: shirt, description: "Crisp cotton oxford shirt for office and weekend wear." },
  { id: "m3", name: "Essential Crew T-Shirt", gender: "men", category: "T-Shirts", isShoe: false, price: 9000, image: shirt, description: "Soft heavyweight cotton tee in a clean, everyday cut." },
  { id: "m4", name: "Premium Polo Tee", gender: "men", category: "T-Shirts", isShoe: false, price: 14000, salePrice: 11000, image: shirt, description: "Pique polo with refined collar and pearl buttons." },
  { id: "m5", name: "Raw Indigo Jeans", gender: "men", category: "Trousers & Jeans", isShoe: false, price: 30000, image: jeans, description: "Slim-straight denim in deep indigo with contrast stitching.", featured: true },
  { id: "m6", name: "Tailored Chinos", gender: "men", category: "Trousers & Jeans", isShoe: false, price: 26000, salePrice: 21000, image: jeans, description: "Stretch cotton chinos with a sharp tapered leg." },
  { id: "m7", name: "Suede Bomber Jacket", gender: "men", category: "Jackets", isShoe: false, price: 85000, salePrice: 69000, image: jacket, description: "Soft tan suede bomber with ribbed trims — a timeless layer.", featured: true },
  { id: "m8", name: "Smart Casual Blazer", gender: "men", category: "Jackets", isShoe: false, price: 75000, image: jacket, description: "Unstructured blazer for effortless smart looks." },
  { id: "m9", name: "Leather Oxford Shoes", gender: "men", category: "Shoes", isShoe: true, price: 65000, image: oxford, description: "Hand-finished black leather oxfords with cap-toe detail.", featured: true },
  { id: "m10", name: "Derby Dress Shoes", gender: "men", category: "Shoes", isShoe: true, price: 58000, salePrice: 49000, image: oxford, description: "Polished derby shoes for formal occasions." },
  { id: "m11", name: "Gold Tab Sneakers", gender: "men", category: "Sneakers", isShoe: true, price: 45000, salePrice: 38000, image: sneakers, description: "Minimal white leather sneakers with gold heel tab." },
  { id: "m12", name: "Court Leather Sneakers", gender: "men", category: "Sneakers", isShoe: true, price: 40000, image: sneakers, description: "Clean court silhouette, cushioned for all-day comfort." },
  { id: "w1", name: "Satin Evening Dress", gender: "women", category: "Dresses", isShoe: false, price: 55000, salePrice: 44000, image: dress, description: "Floor-length satin slip dress with a cowl neckline.", featured: true },
  { id: "w2", name: "Midi Wrap Dress", gender: "women", category: "Dresses", isShoe: false, price: 38000, image: dress, description: "Flattering wrap midi dress for day-to-night style." },
  { id: "w3", name: "Silk Blend Blouse", gender: "women", category: "Tops & Blouses", isShoe: false, price: 24000, image: shirt, description: "Fluid silk-blend blouse with delicate buttons." },
  { id: "w4", name: "Linen Button Top", gender: "women", category: "Tops & Blouses", isShoe: false, price: 18000, salePrice: 14500, image: shirt, description: "Airy linen top, relaxed and effortlessly chic." },
  { id: "w5", name: "High-Rise Mom Jeans", gender: "women", category: "Jeans & Trousers", isShoe: false, price: 28000, image: jeans, description: "Vintage-inspired high-rise jeans in dark wash." },
  { id: "w6", name: "Wide-Leg Trousers", gender: "women", category: "Jeans & Trousers", isShoe: false, price: 32000, salePrice: 26000, image: jeans, description: "Elegant wide-leg trousers with a pressed crease." },
  { id: "w7", name: "Satin Midi Skirt", gender: "women", category: "Skirts", isShoe: false, price: 27000, image: dress, description: "Bias-cut satin skirt that moves beautifully." },
  { id: "w8", name: "Pleated A-Line Skirt", gender: "women", category: "Skirts", isShoe: false, price: 23000, salePrice: 18500, image: dress, description: "Soft pleats and an easy A-line silhouette." },
  { id: "w9", name: "Leather Loafers", gender: "women", category: "Shoes", isShoe: true, price: 42000, image: oxford, description: "Polished black loafers for elevated everyday wear." },
  { id: "w10", name: "Classic Ballet Flats", gender: "women", category: "Shoes", isShoe: true, price: 30000, salePrice: 25000, image: heels, description: "Comfortable nude flats that pair with everything." },
  { id: "w11", name: "Gold Stiletto Heels", gender: "women", category: "Heels & Sneakers", isShoe: true, price: 60000, salePrice: 48000, image: heels, description: "Nude patent pumps on a sculpted gold heel.", featured: true },
  { id: "w12", name: "Gold Accent Sneakers", gender: "women", category: "Heels & Sneakers", isShoe: true, price: 44000, image: sneakers, description: "White leather sneakers finished with gold details.", featured: true },
];

export const formatRWF = (n: number) => `${n.toLocaleString("en-US")} RWF`;
export const effectivePrice = (p: Product) => p.salePrice ?? p.price;
export const getProduct = (id: string) => products.find((p) => p.id === id);
