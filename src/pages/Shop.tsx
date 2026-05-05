import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import ProductCard from "@/components/shop/ProductCard";
import { ProductGridSkeleton, EmptyState } from "@/components/shop/States";
import { productService } from "@/services/productService";
import { COLORS, SIZES } from "@/data/products";
import { categories } from "@/data/products";
import type { Product } from "@/types/product";

type Filters = {
  categories: string[];
  colors: string[];
  sizes: string[];
  price: [number, number];
  inStock: boolean;
  newOnly: boolean;
  bestOnly: boolean;
};

const defaultFilters: Filters = { categories: [], colors: [], sizes: [], price: [0, 500], inStock: false, newOnly: false, bestOnly: false };

export default function Shop({ mode }: { mode?: "search" | "category" | "collection" | "shop" }) {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";
  const [data, setData] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    setData(null); setError(null);
    const opts: any = {};
    if (mode === "category") opts.category = slug;
    if (mode === "collection") opts.collection = slug;
    if (mode === "search") opts.search = q;
    productService.list(opts).then(setData).catch(() => setError("Failed to load products"));
  }, [mode, slug, q]);

  // url query presets
  useEffect(() => {
    const f = { ...defaultFilters };
    if (params.get("new")) f.newOnly = true;
    if (params.get("best")) f.bestOnly = true;
    setFilters(f);
  }, [params]);

  const filtered = useMemo(() => {
    if (!data) return [];
    let out = data;
    if (filters.categories.length) out = out.filter((p) => filters.categories.includes(p.category));
    if (filters.colors.length) out = out.filter((p) => p.colors.some((c) => filters.colors.includes(c.name)));
    if (filters.sizes.length) out = out.filter((p) => p.sizes.some((s) => filters.sizes.includes(s)));
    out = out.filter((p) => {
      const pr = p.discountPrice ?? p.price;
      return pr >= filters.price[0] && pr <= filters.price[1];
    });
    if (filters.inStock) out = out.filter((p) => p.variants.some((v) => v.stock > 0));
    if (filters.newOnly) out = out.filter((p) => p.newArrival);
    if (filters.bestOnly) out = out.filter((p) => p.bestSeller);
    const arr = [...out];
    if (sort === "price-asc") arr.sort((a,b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    else if (sort === "price-desc") arr.sort((a,b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    else if (sort === "popular") arr.sort((a,b) => b.reviewCount - a.reviewCount);
    else arr.sort((a,b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return arr;
  }, [data, filters, sort]);

  const FiltersPanel = () => (
    <div className="space-y-6 text-sm">
      <FilterGroup title="Category">
        {categories.map((c) => (
          <label key={c.id} className="flex items-center gap-2">
            <Checkbox checked={filters.categories.includes(c.name)} onCheckedChange={(v) => setFilters((f) => ({ ...f, categories: v ? [...f.categories, c.name] : f.categories.filter((x) => x !== c.name) }))} />
            <span>{c.name}</span>
          </label>
        ))}
      </FilterGroup>
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {COLORS.map((c) => {
            const active = filters.colors.includes(c.name);
            return (
              <button key={c.name} type="button" aria-label={c.name} onClick={() => setFilters((f) => ({ ...f, colors: active ? f.colors.filter((x) => x !== c.name) : [...f.colors, c.name] }))} className={`h-7 w-7 rounded-full border-2 transition ${active ? "border-foreground ring-2 ring-foreground/20 ring-offset-2" : "border-border"}`} style={{ background: c.hex }} />
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => {
            const active = filters.sizes.includes(s);
            return (
              <button key={s} type="button" onClick={() => setFilters((f) => ({ ...f, sizes: active ? f.sizes.filter((x) => x !== s) : [...f.sizes, s] }))} className={`min-w-10 rounded border px-3 py-1.5 text-xs ${active ? "border-foreground bg-foreground text-background" : "border-border"}`}>{s}</button>
            );
          })}
        </div>
      </FilterGroup>
      <FilterGroup title="Price range">
        <Slider min={0} max={500} step={10} value={filters.price} onValueChange={(v) => setFilters((f) => ({ ...f, price: [v[0], v[1]] }))} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground"><span>${filters.price[0]}</span><span>${filters.price[1]}</span></div>
      </FilterGroup>
      <FilterGroup title="Availability">
        <label className="flex items-center gap-2"><Checkbox checked={filters.inStock} onCheckedChange={(v) => setFilters((f) => ({ ...f, inStock: !!v }))} /><span>In stock</span></label>
        <label className="flex items-center gap-2"><Checkbox checked={filters.newOnly} onCheckedChange={(v) => setFilters((f) => ({ ...f, newOnly: !!v }))} /><span>New arrivals</span></label>
        <label className="flex items-center gap-2"><Checkbox checked={filters.bestOnly} onCheckedChange={(v) => setFilters((f) => ({ ...f, bestOnly: !!v }))} /><span>Best sellers</span></label>
      </FilterGroup>
      <Button variant="outline" className="w-full" onClick={() => setFilters(defaultFilters)}>Clear filters</Button>
    </div>
  );

  const heading = mode === "search" ? `Results for "${q}"` : mode === "category" ? `${slug?.replace(/-/g, " ")}` : mode === "collection" ? `${slug?.replace(/-/g, " ")}` : "Shop all";

  return (
    <div className="container-px mx-auto py-10">
      <div className="mb-8 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{mode ?? "shop"}</p>
        <h1 className="font-display text-4xl capitalize sm:text-5xl">{heading}</h1>
      </div>
      <div className="flex items-center justify-between gap-3 border-y py-3">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden"><SlidersHorizontal className="mr-2 h-4 w-4"/>Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px] overflow-y-auto"><div className="mt-6"><FiltersPanel /></div></SheetContent>
          </Sheet>
          <p className="text-sm text-muted-foreground">{filtered.length} products</p>
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="popular">Most Popular</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block"><FiltersPanel /></aside>
        <div>
          {error ? (
            <EmptyState title="Something went wrong" description={error} action={<Button onClick={() => window.location.reload()}>Retry</Button>} />
          ) : !data ? (
            <ProductGridSkeleton />
          ) : filtered.length === 0 ? (
            <EmptyState title="No products found" description="Try adjusting your filters or browse all products." action={<Button onClick={() => setFilters(defaultFilters)}>Clear filters</Button>} />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider">{title}</Label>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
