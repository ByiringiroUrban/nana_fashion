import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { formatRWF, type Product } from "@/lib/products";

export function Price({ p, large }: { p: Product; large?: boolean }) {
  return (
    <div className={`flex items-baseline gap-2 ${large ? "text-2xl" : "text-sm"}`}>
      <span className="font-semibold">{formatRWF(p.salePrice ?? p.price)}</span>
      {p.salePrice && <span className="text-muted-foreground line-through text-[0.8em]">{formatRWF(p.price)}</span>}
    </div>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const off = p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;
  return (
    <div className="group animate-rise">
      <div className="relative overflow-hidden bg-muted">
        <img src={p.image} alt={p.name} loading="lazy" width={768} height={960}
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
        {off > 0 && <span className="absolute left-3 top-3 bg-gradient-gold px-2 py-1 text-xs font-semibold text-accent-foreground">-{off}%</span>}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100">
          <Button className="flex-1 rounded-none" onClick={() => { add(p.id); toast.success(`${p.name} added to cart`); }}>Add to Cart</Button>
          <Button asChild variant="outline" className="rounded-none bg-background">
            <Link to="/product/$id" params={{ id: p.id }}>View Details</Link>
          </Button>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-xs tracking-widest uppercase text-muted-foreground">{p.gender === "men" ? "Men" : "Women"} · {p.category}</p>
        <h3 className="mt-1 text-xl">{p.name}</h3>
        <Price p={p} />
      </div>
    </div>
  );
}
