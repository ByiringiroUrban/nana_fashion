import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/men", label: "Men" },
  { to: "/women", label: "Women" },
  { to: "/shoes", label: "Shoes" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="bg-primary py-2 text-center text-xs tracking-[0.2em] text-primary-foreground uppercase">
        Free delivery in Kigali on orders over 50,000 RWF
      </div>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="font-display text-2xl font-semibold tracking-wide">
          Nana <span className="text-gold">Fashion</span> & Shoes
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} activeOptions={{ exact: true }}
              className="relative text-sm tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full data-[status=active]:after:w-full">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/cart" aria-label="Shopping cart" className="relative p-2 transition-transform hover:scale-110">
            <ShoppingBag className="h-6 w-6" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[11px] font-semibold text-accent-foreground">{count}</span>
            )}
          </Link>
          <button className="p-2 md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col border-t border-border px-4 pb-4 md:hidden">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-sm tracking-widest uppercase">{l.label}</Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-3 md:px-8">
        <div>
          <p className="font-display text-2xl">Nana <span className="text-gold">Fashion</span> & Shoes</p>
          <p className="mt-3 text-sm opacity-70">Quality fashion for men and women at prices you'll love.</p>
        </div>
        <div className="text-sm opacity-80 space-y-2">
          <p className="tracking-widest uppercase text-gold">Shop</p>
          <Link to="/men" className="block hover:text-gold">Men</Link>
          <Link to="/women" className="block hover:text-gold">Women</Link>
          <Link to="/shoes" className="block hover:text-gold">Shoes</Link>
        </div>
        <div className="text-sm opacity-80 space-y-2">
          <p className="tracking-widest uppercase text-gold">Visit</p>
          <p>KN 4 Ave, Kigali, Rwanda</p>
          <p>+250 788 000 000</p>
          <p>hello@nanafashion.rw</p>
        </div>
      </div>
      <p className="border-t border-primary-foreground/10 py-5 text-center text-xs opacity-60">© 2026 Nana Fashion and Shoes Shop</p>
    </footer>
  );
}
