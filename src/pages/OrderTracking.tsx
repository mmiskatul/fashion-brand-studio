import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trackOrderSchema } from "@/schemas/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Circle, Package, Truck, MapPin, Home } from "lucide-react";
import { orderService } from "@/services/orderService";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const statuses = ["pending","confirmed","processing","shipped","delivered"];
const statusIcon: Record<string, any> = { pending: Circle, confirmed: CheckCircle2, processing: Package, shipped: Truck, delivered: Home };

export default function OrderTracking() {
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(trackOrderSchema) });
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: any) => {
    setLoading(true); setError(null); setOrder(null);
    const o = await orderService.track(data.orderId);
    setLoading(false);
    if (!o) return setError("No order found. Try ORD-1000 to ORD-1017.");
    setOrder(o);
  };

  const currentIdx = order ? statuses.indexOf(order.status) : -1;

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-4xl">Track your order</h1>
      <p className="mt-2 text-sm text-muted-foreground">Enter your order ID and contact info.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid max-w-xl gap-4 rounded-md border p-6">
        <div>
          <Label className="mb-1.5 block text-xs">Order ID</Label>
          <Input placeholder="ORD-1000" {...register("orderId")} />
          {errors.orderId && <p className="mt-1 text-xs text-destructive">{errors.orderId.message as string}</p>}
        </div>
        <div>
          <Label className="mb-1.5 block text-xs">Email or phone</Label>
          <Input {...register("contact")} />
          {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact.message as string}</p>}
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Searching..." : "Track order"}</Button>
        {error && <p className="text-sm text-destructive">{error}</p>}
      </form>

      {loading && <div className="mt-10 max-w-2xl space-y-3"><Skeleton className="h-32 w-full"/><Skeleton className="h-48 w-full"/></div>}

      {order && (
        <div className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="rounded-md border p-6">
            <div className="flex items-center justify-between"><h2 className="font-display text-2xl">{order.id}</h2><Badge>{order.status}</Badge></div>
            <p className="mt-1 text-xs text-muted-foreground">Payment: {order.paymentStatus} · {order.paymentMethod.toUpperCase()}</p>

            <div className="mt-8">
              <p className="mb-4 text-sm font-medium">Order timeline</p>
              <div className="relative flex justify-between">
                {statuses.map((s, i) => {
                  const Icon = statusIcon[s];
                  const done = i <= currentIdx;
                  return (
                    <div key={s} className="z-10 flex flex-1 flex-col items-center">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${done ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className={`mt-2 text-[10px] capitalize sm:text-xs ${done ? "font-medium" : "text-muted-foreground"}`}>{s}</p>
                    </div>
                  );
                })}
                <div className="absolute left-5 right-5 top-5 h-0.5 bg-border">
                  <div className="h-full bg-foreground transition-all" style={{ width: `${(currentIdx / (statuses.length - 1)) * 100}%` }} />
                </div>
              </div>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-sm font-medium">Items</p>
              <div className="divide-y">
                {order.items.map((it: any, i: number) => (
                  <div key={i} className="flex gap-3 py-3">
                    <img src={it.image} className="h-16 w-14 rounded object-cover" alt="" />
                    <div className="flex-1"><p className="text-sm font-medium">{it.name}</p><p className="text-xs text-muted-foreground">{it.color} · {it.size} · ×{it.quantity}</p></div>
                    <p className="text-sm font-medium">${it.price*it.quantity}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="rounded-md border p-6">
            <p className="flex items-center gap-2 text-sm font-medium"><MapPin className="h-4 w-4"/> Delivery address</p>
            <p className="mt-3 text-sm text-muted-foreground">{order.customer.name}<br/>{order.customer.address}<br/>{order.customer.area}, {order.customer.city} {order.customer.postalCode}<br/>{order.customer.phone}</p>
            <div className="mt-6 border-t pt-4">
              <p className="text-sm font-medium">Estimated delivery</p>
              <p className="mt-1 text-sm text-muted-foreground">3–5 business days</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
