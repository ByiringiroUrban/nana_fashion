import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [
    { title: "About Us — Nana Fashion and Shoes" },
    { name: "description", content: "Fashionable, quality clothing and shoes for men and women at affordable prices." },
    { property: "og:title", content: "About Nana Fashion and Shoes" },
    { property: "og:description", content: "Our story and promise." },
  ] }),
  component: () => (
    <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 md:grid-cols-2 md:px-8">
      <img src={hero} alt="Nana Fashion style" loading="lazy" width={1600} height={1008} className="aspect-[4/5] w-full object-cover animate-rise" />
      <div className="animate-rise">
        <p className="text-xs tracking-[0.3em] uppercase text-gold">Our Story</p>
        <h1 className="mt-3 text-5xl md:text-6xl">About Nana Fashion & Shoes</h1>
        <p className="mt-6 text-muted-foreground leading-relaxed">Nana Fashion and Shoes Shop provides fashionable, quality clothing and shoes for men and women at affordable prices. Born in Kigali, we believe everyone deserves to look and feel their best — without overspending.</p>
        <p className="mt-4 text-muted-foreground leading-relaxed">From crisp shirts and tailored jackets to elegant dresses, heels and sneakers, every piece is carefully selected for style, comfort and durability.</p>
        <div className="mt-10 grid grid-cols-3 gap-4 text-center">
          {[["5K+", "Happy customers"], ["300+", "Styles"], ["4.9★", "Rating"]].map(([a, b]) => (
            <div key={a} className="border border-border p-4"><p className="font-display text-3xl text-gold">{a}</p><p className="text-xs text-muted-foreground">{b}</p></div>
          ))}
        </div>
      </div>
    </div>
  ),
});
