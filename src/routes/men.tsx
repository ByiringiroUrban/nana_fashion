import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { menCategories, products } from "@/lib/products";

export const Route = createFileRoute("/men")({
  head: () => ({ meta: [
    { title: "Men's Collection — Nana Fashion and Shoes" },
    { name: "description", content: "Shirts, T-shirts, jeans, jackets, shoes and sneakers for men in RWF." },
    { property: "og:title", content: "Men's Collection — Nana Fashion" },
    { property: "og:description", content: "Shop men's fashion and shoes." },
  ] }),
  component: () => <CollectionPage title="Men's Collection" subtitle="Sharp essentials for every occasion." items={products.filter((p) => p.gender === "men")} categories={menCategories} />,
});
