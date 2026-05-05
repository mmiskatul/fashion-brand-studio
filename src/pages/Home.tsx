import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, Recycle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/shop/ProductCard";
import { products } from "@/data/products";
import { categories, collections } from "@/data/products";

export default function Home() {
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);
  const trending = products.slice(2, 6);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container-px mx-auto grid min-h-[80vh] items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Autumn / Winter 2025</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">Quietly considered<br/>essentials.</h1>
            <p className="mt-6 max-w-md text-base text-muted-foreground">A wardrobe of timeless silhouettes, crafted from premium natural fibers in small, ethical batches.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><Link to="/shop">Shop the collection <ArrowRight className="ml-2 h-4 w-4"/></Link></Button>
              <Button size="lg" variant="outline" asChild><Link to="/collection/autumn-essentials">Lookbook</Link></Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80" alt="Hero" className="h-[60vh] w-full rounded-md object-cover shadow-elegant lg:h-[70vh]" />
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-px mx-auto py-20">
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-3xl sm:text-4xl">Shop by category</h2>
          <Link to="/shop" className="hidden text-sm text-muted-foreground hover:text-foreground sm:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.id} to={`/category/${c.slug}`} className="group relative overflow-hidden rounded-md">
              <img src={c.image} alt={c.name} loading="lazy" className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-overlay" />
              <p className="absolute inset-x-0 bottom-3 text-center text-sm font-medium text-white">{c.name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <Section title="New arrivals" link="/shop?new=1" products={newArrivals} />

      {/* PROMO BANNER */}
      <section className="container-px mx-auto py-16">
        <div className="relative overflow-hidden rounded-lg bg-foreground px-8 py-16 text-center text-background sm:px-16 sm:py-24">
          <p className="text-xs uppercase tracking-[0.2em] opacity-70">Limited time</p>
          <h3 className="mt-3 font-display text-4xl sm:text-5xl">Free shipping over $100</h3>
          <p className="mx-auto mt-4 max-w-md text-sm opacity-80">Complimentary worldwide shipping on orders above $100. Use code <span className="font-medium">WELCOME10</span> for 10% off your first order.</p>
          <Button variant="secondary" size="lg" className="mt-8" asChild><Link to="/shop">Start shopping</Link></Button>
        </div>
      </section>

      {/* BEST SELLERS */}
      <Section title="Best sellers" link="/shop?best=1" products={bestSellers} />

      {/* COLLECTIONS */}
      <section className="container-px mx-auto py-20">
        <h2 className="mb-10 font-display text-3xl sm:text-4xl">Featured collections</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {collections.map((col) => (
            <Link key={col.id} to={`/collection/${col.slug}`} className="group relative overflow-hidden rounded-md">
              <img src={col.image} alt={col.name} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-overlay" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl">{col.name}</h3>
                <p className="mt-1 text-sm opacity-90">{col.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <Section title="Trending now" link="/shop" products={trending} />

      {/* BRAND STORY */}
      <section className="container-px mx-auto grid items-center gap-10 py-24 lg:grid-cols-2">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80" alt="Atelier" className="aspect-[4/5] rounded-md object-cover" />
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">Made to last,<br/>designed to disappear into your wardrobe.</h2>
          <p className="mt-6 text-muted-foreground">Founded in 2018, Atelier was born from a simple idea: clothing should be made well, worn often, and last for years. Every piece is sketched in our studio, sampled by hand, and produced in small batches by partner factories we've worked with for years.</p>
          <Button variant="outline" className="mt-8" asChild><Link to="/about">Read more</Link></Button>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="border-y bg-secondary/40">
        <div className="container-px mx-auto grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {[
            [Truck, "Free shipping", "On orders over $100"],
            [ShieldCheck, "Secure checkout", "Protected payments"],
            [Recycle, "Easy returns", "30-day window"],
            [Award, "Premium quality", "Ethically made"],
          ].map(([Icon, t, d]: any) => (
            <div key={t} className="flex flex-col items-center text-center">
              <Icon className="h-6 w-6" />
              <p className="mt-3 text-sm font-semibold">{t}</p>
              <p className="text-xs text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Section({ title, link, products }: { title: string; link: string; products: typeof import("@/data/products").products }) {
  return (
    <section className="container-px mx-auto py-20">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-3xl sm:text-4xl">{title}</h2>
        <Link to={link} className="text-sm text-muted-foreground hover:text-foreground">View all →</Link>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
