import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Price, ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({ meta: [
    { title: loaderData ? `${loaderData.name} — Nana Fashion` : "Product not found" },
    { name: "description", content: loaderData?.description ?? "Product not found" },
    { property: "og:title", content: loaderData?.name ?? "Product" },
    { property: "og:description", content: loaderData?.description ?? "" },
  ] }),
  notFoundComponent: () => <p className="py-32 text-center">Product not found. <Link to="/" className="underline">Go home</Link></p>,
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  const related = products.filter((x) => x.gender === p.gender && x.id !== p.id).slice(0, 4);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="grid gap-10 md:grid-cols-2">
        <img src={p.image} alt={p.name} width={768} height={960} className="aspect-[4/5] w-full bg-muted object-cover animate-rise" />
        <div className="flex flex-col justify-center animate-rise">
          <p className="text-xs tracking-[0.3em] uppercase text-gold">{p.gender === "men" ? "Men" : "Women"} · {p.category}</p>
          <h1 className="mt-3 text-5xl">{p.name}</h1>
          <div className="mt-4"><Price p={p} large /></div>
          <p className="mt-6 text-muted-foreground">{p.description}</p>
          <Button size="lg" className="mt-8 rounded-none" onClick={() => { add(p.id); toast.success(`${p.name} added to cart`); }}>Add to Cart</Button>
          <p className="mt-4 text-xs text-muted-foreground">Free delivery in Kigali over 50,000 RWF · 7-day exchanges</p>
        </div>
      </div>
      <h2 className="mt-20 text-4xl">You may also like</h2>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
        {related.map((r) => <ProductCard key={r.id} p={r} />)}
      </div>
    </div>
  );
}
