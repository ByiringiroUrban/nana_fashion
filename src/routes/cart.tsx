import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { effectivePrice, formatRWF } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [
    { title: "Shopping Cart — Nana Fashion and Shoes" },
    { name: "description", content: "Review the items in your shopping cart." },
    { property: "og:title", content: "Shopping Cart — Nana Fashion" },
    { property: "og:description", content: "Your Nana Fashion shopping cart." },
  ] }),
  component: CartPage,
});

function CartPage() {
  const { lines, count, total, setQty, remove, clear } = useCart();
  const delivery = total >= 50000 || total === 0 ? 0 : 2000;
  if (lines.length === 0)
    return (
      <div className="py-32 text-center">
        <h1 className="text-5xl">Your cart is empty</h1>
        <Button asChild className="mt-8 rounded-none"><Link to="/">Continue shopping</Link></Button>
      </div>
    );
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <h1 className="text-5xl">Shopping Cart <span className="text-2xl text-muted-foreground">({count} items)</span></h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="divide-y divide-border border-y border-border">
          {lines.map(({ product: p, qty }) => (
            <li key={p.id} className="flex gap-4 py-5">
              <img src={p.image} alt={p.name} loading="lazy" width={96} height={120} className="h-30 w-24 object-cover bg-muted" />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-2">
                  <Link to="/product/$id" params={{ id: p.id }} className="font-display text-xl hover:text-gold">{p.name}</Link>
                  <p className="font-semibold">{formatRWF(effectivePrice(p) * qty)}</p>
                </div>
                <p className="text-sm text-muted-foreground">{formatRWF(effectivePrice(p))} each</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-border">
                    <button aria-label="Decrease" className="p-2 hover:bg-muted" onClick={() => setQty(p.id, qty - 1)}><Minus className="h-4 w-4" /></button>
                    <span className="w-10 text-center">{qty}</span>
                    <button aria-label="Increase" className="p-2 hover:bg-muted" onClick={() => setQty(p.id, qty + 1)}><Plus className="h-4 w-4" /></button>
                  </div>
                  <button aria-label="Remove" onClick={() => remove(p.id)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /> Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <aside className="h-fit bg-card p-6 shadow-soft">
          <h2 className="text-2xl">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatRWF(total)}</dd></div>
            <div className="flex justify-between"><dt>Delivery</dt><dd>{delivery ? formatRWF(delivery) : "Free"}</dd></div>
            <div className="flex justify-between border-t border-border pt-3 text-lg font-semibold"><dt>Total</dt><dd>{formatRWF(total + delivery)}</dd></div>
          </dl>
          <Button className="mt-6 w-full rounded-none bg-gradient-gold text-accent-foreground" onClick={() => { clear(); toast.success("Thank you! This is a demo store — no payment was taken."); }}>Checkout</Button>
        </aside>
      </div>
    </div>
  );
}
