import { useState } from "react";
import { PageHeader } from "@/components/dashboard/Bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { sellers } from "@/data/mock";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerSchema, type SellerInput } from "@/schemas/sellerSchema";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function AdminSellers() {
  return (
    <div>
      <PageHeader title="Sellers" description={`${sellers.length} sellers`} action={<SellerForm/>}/>
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Name</th><th className="font-medium">Email</th><th className="font-medium">Phone</th><th className="font-medium">Orders</th><th className="font-medium">Sales</th><th className="font-medium">Status</th><th></th></tr></thead>
          <tbody>
            {sellers.map((s) => (
              <tr key={s.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="text-muted-foreground">{s.email}</td>
                <td className="text-muted-foreground">{s.phone}</td>
                <td>{s.ordersHandled}</td>
                <td>${s.totalSales.toLocaleString()}</td>
                <td><Badge variant={s.status === "active" ? "default" : "secondary"}>{s.status}</Badge></td>
                <td className="pr-4"><div className="flex justify-end gap-1"><Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function SellerForm() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<SellerInput>({ resolver: zodResolver(sellerSchema), defaultValues: { status: "active", permissions: [] } });
  const onSubmit = () => { toast.success("Seller created"); setOpen(false); reset(); };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4"/> New seller</Button></DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader><DialogTitle>Create seller</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}><Input {...register("name")}/></Field>
          <Field label="Email" error={errors.email?.message}><Input type="email" {...register("email")}/></Field>
          <Field label="Phone" error={errors.phone?.message}><Input {...register("phone")}/></Field>
          <Field label="Password" error={errors.password?.message}><Input type="password" {...register("password")}/></Field>
          <Field label="Status" error={errors.status?.message} full>
            <Select value={watch("status")} onValueChange={(v) => setValue("status", v as any)}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="disabled">Disabled</SelectItem></SelectContent></Select>
          </Field>
          <div className="sm:col-span-2 flex justify-end gap-2"><Button variant="outline" type="button" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Create</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function Field({ label, error, children, full }: any) { return <div className={full ? "sm:col-span-2" : ""}><Label className="mb-1.5 block text-xs">{label}</Label>{children}{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>; }
