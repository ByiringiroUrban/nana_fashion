import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { products } from "@/lib/products";

const shoes = products.filter((p) => p.isShoe).map((p) => ({ ...p, category: p.gender === "men" ? "Men's" : "Women's" }));

export const Route = createFileRoute("/shoes")({
  head: () => ({ meta: [
    { title: "Shoes — Nana Fashion and Shoes" },
    { name: "description", content: "Oxfords, sneakers, heels and flats for men and women in RWF." },
    { property: "og:title", content: "Shoes — Nana Fashion" },
    { property: "og:description", content: "Shop shoes for men and women." },
  ] }),
  component: () => <CollectionPage title="Shoes" subtitle="Step out in comfort and style." items={shoes} categories={["Men's", "Women's"]} />,
});
