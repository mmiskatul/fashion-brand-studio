import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { toast } from "sonner";

export default function ProductCard({ product, onQuickView }: { product: Product; onQuickView?: (p: Product) => void }) {
  const add = useCart((s) => s.add);
  const price = product.discountPrice ?? product.price;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4 }} className="group">
      <div className="relative overflow-hidden rounded-md bg-secondary/50">
        <Link to={`/product/${product.slug}`}>
          <img src={product.images[0]} alt={product.name} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <img src={product.images[1] ?? product.images[0]} alt="" loading="lazy" className="absolute inset-0 aspect-[3/4] w-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {product.newArrival && <Badge variant="secondary" className="bg-background/95">New</Badge>}
          {product.bestSeller && <Badge className="bg-accent text-accent-foreground">Best Seller</Badge>}
          {product.discountPrice && <Badge variant="destructive">-{Math.round((1 - product.discountPrice/product.price)*100)}%</Badge>}
        </div>
        <button aria-label="Wishlist" className="absolute right-3 top-3 rounded-full bg-background/80 p-2 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-background">
          <Heart className="h-4 w-4" />
        </button>
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button size="sm" className="flex-1" onClick={(e) => { e.preventDefault(); add({ productId: product.id, name: product.name, image: product.images[0], price, color: product.colors[0].name, size: product.sizes[0], quantity: 1, slug: product.slug }); toast.success("Added to cart"); }}>
            <ShoppingBag className="mr-1.5 h-4 w-4" /> Add
          </Button>
          {onQuickView && (
            <Button size="sm" variant="secondary" onClick={(e) => { e.preventDefault(); onQuickView(product); }}>
              <Eye className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-start justify-between gap-3">
        <div>
          <Link to={`/product/${product.slug}`} className="text-sm font-medium hover:underline">{product.name}</Link>
          <p className="mt-0.5 text-xs text-muted-foreground">{product.category}</p>
          <div className="mt-1.5 flex gap-1">
            {product.colors.slice(0,5).map((c) => (
              <span key={c.name} className="h-3 w-3 rounded-full border border-border" style={{ background: c.hex }} title={c.name} />
            ))}
          </div>
        </div>
        <div className="text-right">
          {product.discountPrice ? (
            <>
              <p className="text-sm font-semibold">${product.discountPrice}</p>
              <p className="text-xs text-muted-foreground line-through">${product.price}</p>
            </>
          ) : (
            <p className="text-sm font-semibold">${product.price}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
