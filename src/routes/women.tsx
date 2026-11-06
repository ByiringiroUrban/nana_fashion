import { createFileRoute } from "@tanstack/react-router";
import { CollectionPage } from "@/components/CollectionPage";
import { products, womenCategories } from "@/lib/products";

export const Route = createFileRoute("/women")({
  head: () => ({ meta: [
    { title: "Women's Collection — Nana Fashion and Shoes" },
    { name: "description", content: "Dresses, tops, jeans, skirts, heels and sneakers for women in RWF." },
    { property: "og:title", content: "Women's Collection — Nana Fashion" },
    { property: "og:description", content: "Shop women's fashion and shoes." },
  ] }),
  component: () => <CollectionPage title="Women's Collection" subtitle="Elegant pieces made to be noticed." items={products.filter((p) => p.gender === "women")} categories={womenCategories} />,
});
