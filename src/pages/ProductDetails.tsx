import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Truck, RotateCcw, ShieldCheck, Star, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { productService } from "@/services/productService";
import type { Product } from "@/types/product";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/store/cart";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetails() {
  const { slug } = useParams();
  const nav = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<string>("");
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);

  useEffect(() => {
    setProduct(null); setActiveImg(0); setColor(""); setSize(""); setQty(1);
    if (!slug) return;
    productService.getBySlug(slug).then((p) => {
      if (!p) return;
      setProduct(p);
      productService.related(p.id).then(setRelated);
    });
  }, [slug]);

  if (!product) {
    return (
      <div className="container-px mx-auto grid gap-12 py-10 lg:grid-cols-2">
        <Skeleton className="aspect-[4/5] w-full" />
        <div className="space-y-4"><Skeleton className="h-10 w-2/3" /><Skeleton className="h-6 w-1/4" /><Skeleton className="h-32 w-full" /></div>
      </div>
    );
  }

  const variant = product.variants.find((v) => v.color === color && v.size === size);
  const stock = variant?.stock ?? 0;
  const price = product.discountPrice ?? product.price;

  const handleAdd = (buyNow = false) => {
    if (!color) return toast.error("Please select a color");
    if (!size) return toast.error("Please select a size");
    add({ productId: product.id, name: product.name, image: product.images[0], price, color, size, quantity: qty, slug: product.slug });
    toast.success("Added to cart");
    if (buyNow) nav("/checkout");
  };

  return (
    <div className="container-px mx-auto py-10">
      <nav className="mb-6 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link> / <Link to="/shop" className="hover:text-foreground">Shop</Link> / <span>{product.name}</span>
      </nav>
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <motion.div key={activeImg} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group relative overflow-hidden rounded-md bg-secondary/50">
            <img src={product.images[activeImg]} alt={product.name} className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          </motion.div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {product.images.map((src, i) => (
              <button key={i} onClick={() => setActiveImg(i)} className={`overflow-hidden rounded ${activeImg === i ? "ring-2 ring-foreground" : "opacity-70 hover:opacity-100"}`}>
                <img src={src} alt="" className="aspect-square w-full object-cover" />
              </button>
            ))}
          </div>
        </div>
        {/* Details */}
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><span>{product.category}</span>{product.bestSeller && <Badge>Best Seller</Badge>}{product.newArrival && <Badge variant="secondary">New</Badge>}</div>
          <h1 className="mt-2 font-display text-4xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-foreground text-foreground" : "text-muted-foreground"}`} />)}</div>
            <span className="text-xs text-muted-foreground">{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
          </div>
          <div className="mt-5 flex items-baseline gap-3">
            <p className="text-2xl font-semibold">${price}</p>
            {product.discountPrice && <p className="text-base text-muted-foreground line-through">${product.price}</p>}
            {product.discountPrice && <Badge variant="destructive">Save ${product.price - product.discountPrice}</Badge>}
          </div>
          <p className="mt-5 max-w-prose text-sm text-muted-foreground">{product.shortDescription}</p>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider">Color: <span className="text-muted-foreground">{color || "Select"}</span></p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button key={c.name} onClick={() => setColor(c.name)} className={`h-9 w-9 rounded-full border-2 transition ${color === c.name ? "border-foreground ring-2 ring-foreground/30 ring-offset-2" : "border-border"}`} style={{ background: c.hex }} title={c.name} />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider">Size: <span className="text-muted-foreground">{size || "Select"}</span></p>
              <Dialog>
                <DialogTrigger asChild><button className="text-xs underline">Size guide</button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Size Guide</DialogTitle></DialogHeader>
                  <table className="w-full text-sm">
                    <thead><tr className="border-b"><th className="py-2 text-left">Size</th><th>Chest (in)</th><th>Length (in)</th></tr></thead>
                    <tbody>{["S 36–38 27","M 39–41 28","L 42–44 29","XL 45–47 30","XXL 48–50 31"].map((r) => { const [s,c,l] = r.split(" "); return <tr key={s} className="border-b last:border-0"><td className="py-2">{s}</td><td className="text-center">{c}</td><td className="text-center">{l}</td></tr>; })}</tbody>
                  </table>
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSize(s)} className={`min-w-12 rounded border px-4 py-2 text-sm ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"}`}>{s}</button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center rounded border">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-secondary"><Minus className="h-3 w-3"/></button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2 hover:bg-secondary"><Plus className="h-3 w-3"/></button>
            </div>
            <p className="text-xs text-muted-foreground">{color && size ? (stock > 0 ? `${stock} in stock` : "Out of stock") : "Select options"}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={() => handleAdd(false)}>Add to cart</Button>
            <Button size="lg" variant="outline" className="flex-1" onClick={() => handleAdd(true)}>Buy now</Button>
          </div>

          <div className="mt-6 grid gap-2 rounded-md border p-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4"/> Free shipping on orders over $100</div>
            <div className="flex items-center gap-2"><RotateCcw className="h-4 w-4"/> 30-day easy returns</div>
            <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/> Secure checkout</div>
          </div>

          <Tabs defaultValue="desc" className="mt-8">
            <TabsList><TabsTrigger value="desc">Description</TabsTrigger><TabsTrigger value="details">Details</TabsTrigger><TabsTrigger value="ship">Shipping</TabsTrigger></TabsList>
            <TabsContent value="desc" className="text-sm text-muted-foreground">{product.description}</TabsContent>
            <TabsContent value="details" className="text-sm text-muted-foreground">
              <ul className="space-y-1">
                <li><strong>Material:</strong> {product.material}</li>
                <li><strong>Fit:</strong> {product.fit}</li>
                <li><strong>SKU:</strong> {product.sku}</li>
              </ul>
            </TabsContent>
            <TabsContent value="ship" className="text-sm text-muted-foreground">Standard delivery 3–5 business days. Express 1–2 days. International 7–14 days. Free over $100.</TabsContent>
          </Tabs>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-8 font-display text-3xl">You may also like</h2>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
        </section>
      )}
    </div>
  );
}
