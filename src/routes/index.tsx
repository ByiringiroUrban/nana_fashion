import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import dress from "@/assets/p-dress.jpg";
import jacket from "@/assets/p-jacket.jpg";
import heels from "@/assets/p-heels.jpg";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nana Fashion and Shoes Shop — Style for Men & Women" },
      { name: "description", content: "Shop men's and women's clothing, shoes and accessories in RWF at Nana Fashion and Shoes Shop." },
      { property: "og:title", content: "Nana Fashion and Shoes Shop" },
      { property: "og:description", content: "Modern fashion and shoes for men and women in Rwanda." },
    ],
  }),
  component: Index,
});

const cats = [
  { to: "/men", label: "Men", img: jacket },
  { to: "/women", label: "Women", img: dress },
  { to: "/shoes", label: "Shoes", img: heels },
] as const;

function Index() {
  const featured = products.filter((p) => p.featured);
  return (
    <>
      <section className="relative h-[85vh] min-h-[520px] overflow-hidden">
        <img src={hero} alt="Models wearing Nana Fashion" width={1600} height={1008} className="absolute inset-0 h-full w-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 md:px-8">
          <div className="max-w-xl text-primary-foreground animate-rise">
            <p className="text-xs tracking-[0.4em] uppercase text-gold">New Season 2026</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">Nana Fashion <em className="text-gold">&</em> Shoes</h1>
            <p className="mt-5 text-lg opacity-90">Welcome to timeless style. Discover quality clothing and shoes for men and women — crafted to make you feel confident, at prices you'll love.</p>
            <Button asChild size="lg" className="mt-8 rounded-none bg-gradient-gold px-10 text-accent-foreground hover:opacity-90">
              <Link to="/women">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <h2 className="text-center text-4xl md:text-5xl">Popular Categories</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {cats.map((c) => (
            <Link key={c.to} to={c.to} className="group relative block overflow-hidden">
              <img src={c.img} alt={c.label} loading="lazy" width={768} height={960} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-primary-foreground">
                <h3 className="text-4xl">{c.label}</h3>
                <span className="text-xs tracking-widest uppercase text-gold">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-16 md:grid-cols-2 md:px-8">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-gold">Special Offer</p>
            <h2 className="mt-3 text-5xl md:text-6xl">Up to <span className="text-gold">20% off</span></h2>
            <p className="mt-4 opacity-80">Season sale on selected jackets, dresses, heels and sneakers. Limited stock — while it lasts.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            {[["FREE", "Delivery in Kigali over 50,000 RWF"], ["7 DAYS", "Easy exchanges"], ["MoMo", "Mobile Money accepted"], ["100%", "Quality guaranteed"]].map(([a, b]) => (
              <div key={a} className="border border-primary-foreground/15 p-5 transition-colors hover:border-gold">
                <p className="font-display text-3xl text-gold">{a}</p>
                <p className="mt-1 text-xs opacity-75">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex items-end justify-between">
          <h2 className="text-4xl md:text-5xl">Featured Products</h2>
          <Link to="/shoes" className="text-xs tracking-widest uppercase hover:text-gold">View shoes →</Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
