import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { checkoutSchema, type CheckoutInput } from "@/schemas/checkoutSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/store/cart";
import { orderService } from "@/services/orderService";
import { toast } from "sonner";

export default function Checkout() {
  const { items, subtotal, discount, delivery, total, clear } = useCart();
  const nav = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  if (items.length === 0) {
    nav("/cart");
    return null;
  }

  const onSubmit = async (data: CheckoutInput) => {
    setSubmitting(true);
    try {
      const res = await orderService.create({
        customer: data,
        items: items.map((i) => ({ productId: i.productId, name: i.name, image: i.image, color: i.color, size: i.size, quantity: i.quantity, price: i.price })),
        subtotal: subtotal(),
        discount: discount(),
        delivery: delivery(),
        total: total(),
        paymentMethod: data.paymentMethod,
      });
      const orderId = res.data.id!;
      clear();
      toast.success("Order placed");
      nav(`/order-confirmation/${orderId}`);
    } catch {
      toast.error("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  const pm = watch("paymentMethod");

  return (
    <div className="container-px mx-auto py-10">
      <h1 className="font-display text-4xl">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          <Section title="Contact information">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name?.message}><Input {...register("name")} /></Field>
              <Field label="Phone" error={errors.phone?.message}><Input {...register("phone")} /></Field>
              <Field label="Email" error={errors.email?.message} className="sm:col-span-2"><Input type="email" {...register("email")} /></Field>
            </div>
          </Section>
          <Section title="Shipping address">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Street address" error={errors.address?.message} className="sm:col-span-2"><Input {...register("address")} /></Field>
              <Field label="City" error={errors.city?.message}><Input {...register("city")} /></Field>
              <Field label="Area" error={errors.area?.message}><Input {...register("area")} /></Field>
              <Field label="Postal code" error={errors.postalCode?.message}><Input {...register("postalCode")} /></Field>
              <Field label="Delivery note (optional)" error={errors.note?.message} className="sm:col-span-2"><Textarea rows={3} {...register("note")} /></Field>
            </div>
          </Section>
          <Section title="Payment method">
            <RadioGroup value={pm} onValueChange={(v) => setValue("paymentMethod", v as any)} className="space-y-2">
              {[
                ["cod","Cash on Delivery","Pay when your order arrives"],
                ["manual","Manual payment","Bank transfer / mobile wallet"],
                ["online","Online payment","Card / wallet (placeholder)"],
              ].map(([v, label, desc]) => (
                <Label key={v} className="flex cursor-pointer items-start gap-3 rounded-md border p-4 hover:bg-secondary/30 [&:has(:checked)]:border-foreground">
                  <RadioGroupItem value={v} className="mt-1" />
                  <div><p className="text-sm font-medium">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
                </Label>
              ))}
            </RadioGroup>
          </Section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-md border p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <div className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((i) => (
                <div key={i.productId+i.color+i.size} className="flex gap-3">
                  <img src={i.image} className="h-16 w-14 rounded object-cover" alt="" />
                  <div className="flex-1 text-xs">
                    <p className="font-medium">{i.name}</p>
                    <p className="text-muted-foreground">{i.color} · {i.size} · ×{i.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${i.price*i.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-2 border-t pt-4 text-sm">
              <Row label="Subtotal" value={`$${subtotal()}`} />
              <Row label="Discount" value={`-$${discount()}`} />
              <Row label="Delivery" value={delivery() === 0 ? "Free" : `$${delivery()}`} />
              <div className="my-3 border-t" />
              <Row label={<span className="font-semibold">Total</span>} value={<span className="font-semibold">${total()}</span>} />
            </div>
            <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>{submitting ? "Placing order..." : "Place order"}</Button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: any) { return <div><h2 className="mb-4 font-display text-2xl">{title}</h2>{children}</div>; }
function Field({ label, error, children, className }: any) {
  return (
    <div className={className}>
      <Label className="mb-1.5 block text-xs font-medium">{label}</Label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
function Row({ label, value }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>; }
