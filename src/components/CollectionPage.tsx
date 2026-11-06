import { useMemo, useState } from "react";
import { ProductCard } from "./ProductCard";
import { effectivePrice, type Product } from "@/lib/products";

type Sort = "featured" | "low" | "high";

export function CollectionPage({ title, subtitle, items, categories }: { title: string; subtitle: string; items: Product[]; categories: string[] }) {
  const [cat, setCat] = useState("All");
  const [sort, setSort] = useState<Sort>("featured");
  const [saleOnly, setSaleOnly] = useState(false);
  const list = useMemo(() => {
    let l = items.filter((p) => (cat === "All" || p.category === cat) && (!saleOnly || p.salePrice));
    if (sort === "low") l = [...l].sort((a, b) => effectivePrice(a) - effectivePrice(b));
    if (sort === "high") l = [...l].sort((a, b) => effectivePrice(b) - effectivePrice(a));
    return l;
  }, [items, cat, sort, saleOnly]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <div className="py-14 text-center animate-rise">
        <p className="text-xs tracking-[0.3em] uppercase text-gold">Collection</p>
        <h1 className="mt-2 text-5xl md:text-6xl">{title}</h1>
        <p className="mt-3 text-muted-foreground">{subtitle}</p>
      </div>
      <div className="mb-10 flex flex-col gap-4 border-y border-border py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button key={c} onClick={() => setCat(c)}
              className={`border px-4 py-1.5 text-xs tracking-widest uppercase transition-colors ${cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold"}`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-2"><input type="checkbox" checked={saleOnly} onChange={(e) => setSaleOnly(e.target.checked)} className="accent-gold" /> On sale</label>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="border border-border bg-background px-3 py-1.5">
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </div>
      <p className="mb-6 text-sm text-muted-foreground">{list.length} products</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
      {list.length === 0 && <p className="py-20 text-center text-muted-foreground">No products match your filters.</p>}
    </div>
  );
}
