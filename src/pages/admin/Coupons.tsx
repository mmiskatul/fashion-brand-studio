import { useState } from "react";
import { PageHeader } from "@/components/dashboard/Bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2 } from "lucide-react";
import { coupons } from "@/data/mock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { couponSchema, type CouponInput } from "@/schemas/couponSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminCoupons() {
  return (
    <div>
      <PageHeader title="Coupons" description={`${coupons.length} coupons`} action={<CouponForm/>} />
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Code</th><th className="font-medium">Type</th><th className="font-medium">Value</th><th className="font-medium">Min order</th><th className="font-medium">Used</th><th className="font-medium">Period</th><th className="font-medium">Status</th><th></th></tr></thead>
          <tbody>
            {coupons.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4 font-mono font-medium">{c.code}</td>
                <td className="capitalize">{c.discountType}</td>
                <td>{c.discountType === "percent" ? `${c.discountValue}%` : `$${c.discountValue}`}</td>
                <td>${c.minOrder}</td>
                <td>{c.usedCount} / {c.usageLimit}</td>
                <td className="text-muted-foreground text-xs">{c.startDate} → {c.endDate}</td>
                <td><Badge variant={c.status === "active" ? "default" : "secondary"}>{c.status}</Badge></td>
                <td className="pr-4"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function CouponForm() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<CouponInput>({ resolver: zodResolver(couponSchema), defaultValues: { discountType: "percent", status: "active" } });
  const onSubmit = () => { toast.success("Coupon created"); setOpen(false); reset(); };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4"/> New coupon</Button></DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Create coupon</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
          <Field label="Code" error={errors.code?.message}><Input {...register("code")} className="font-mono uppercase"/></Field>
          <Field label="Type">
            <Select value={watch("discountType")} onValueChange={(v) => setValue("discountType", v as any)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="percent">Percentage</SelectItem><SelectItem value="fixed">Fixed amount</SelectItem></SelectContent></Select>
          </Field>
          <Field label="Value" error={errors.discountValue?.message}><Input type="number" {...register("discountValue")}/></Field>
          <Field label="Min order" error={errors.minOrder?.message}><Input type="number" {...register("minOrder")}/></Field>
          <Field label="Usage limit" error={errors.usageLimit?.message}><Input type="number" {...register("usageLimit")}/></Field>
          <Field label="Status">
            <Select value={watch("status")} onValueChange={(v) => setValue("status", v as any)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="disabled">Disabled</SelectItem></SelectContent></Select>
          </Field>
          <Field label="Start date" error={errors.startDate?.message}><Input type="date" {...register("startDate")}/></Field>
          <Field label="End date" error={errors.endDate?.message}><Input type="date" {...register("endDate")}/></Field>
          <div className="sm:col-span-2 flex justify-end gap-2"><Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function Field({ label, error, children }: any) { return <div><Label className="mb-1.5 block text-xs">{label}</Label>{children}{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>; }
