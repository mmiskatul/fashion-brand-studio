import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/store/cart";
import { coupons } from "@/data/mock";
import { useState } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/components/shop/States";

export default function Cart() {
  const { items, remove, updateQty, subtotal, discount, delivery, total, applyCoupon, coupon } = useCart();
  const [code, setCode] = useState("");
  const nav = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto py-20">
        <EmptyState title="Your cart is empty" description="Looks like you haven't added anything yet." action={<Button asChild><Link to="/shop"><ShoppingBag className="mr-2 h-4 w-4"/> Shop now</Link></Button>} />
      </div>
    );
  }

  const apply = () => {
    const c = coupons.find((x) => x.code.toLowerCase() === code.toLowerCase() && x.status === "active");
    if (!c) return toast.error("Invalid coupon");
    if (subtotal() < c.minOrder) return toast.error(`Minimum order $${c.minOrder}`);
    applyCoupon({ code: c.code, type: c.discountType, value: c.discountValue });
    toast.success(`Coupon ${c.code} applied`);
  };

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-4xl">Your cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="divide-y rounded-md border">
          {items.map((i) => (
            <div key={i.productId + i.color + i.size} className="flex gap-4 p-4 sm:p-6">
              <Link to={`/product/${i.slug}`} className="shrink-0">
                <img src={i.image} alt={i.name} className="h-24 w-20 rounded object-cover sm:h-32 sm:w-28" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/product/${i.slug}`} className="font-medium hover:underline">{i.name}</Link>
                    <p className="mt-1 text-xs text-muted-foreground">{i.color} · {i.size}</p>
                  </div>
                  <p className="font-semibold">${i.price * i.quantity}</p>
                </div>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded border">
                    <button onClick={() => updateQty(i.productId, i.color, i.size, i.quantity - 1)} className="px-2 py-1.5 hover:bg-secondary"><Minus className="h-3 w-3"/></button>
                    <span className="w-8 text-center text-sm">{i.quantity}</span>
                    <button onClick={() => updateQty(i.productId, i.color, i.size, i.quantity + 1)} className="px-2 py-1.5 hover:bg-secondary"><Plus className="h-3 w-3"/></button>
                  </div>
                  <button onClick={() => remove(i.productId, i.color, i.size)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5"/> Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <div className="mt-5 flex gap-2">
              <Input placeholder="Coupon code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} />
              <Button variant="outline" onClick={apply}>Apply</Button>
            </div>
            {coupon && <p className="mt-2 text-xs text-success">Coupon {coupon.code} applied</p>}
            <div className="mt-6 space-y-2 text-sm">
              <Row label="Subtotal" value={`$${subtotal()}`} />
              <Row label="Discount" value={`-$${discount()}`} />
              <Row label="Delivery" value={delivery() === 0 ? "Free" : `$${delivery()}`} />
              <div className="my-3 border-t" />
              <Row label={<span className="font-semibold">Total</span>} value={<span className="font-semibold">${total()}</span>} />
            </div>
            <Button size="lg" className="mt-6 w-full" onClick={() => nav("/checkout")}>Checkout</Button>
            <Link to="/shop" className="mt-3 block text-center text-xs text-muted-foreground hover:text-foreground">Continue shopping</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return <div className="flex items-center justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>;
}
