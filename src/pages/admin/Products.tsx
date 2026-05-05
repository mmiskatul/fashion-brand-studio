import { useState } from "react";
import { PageHeader } from "@/components/dashboard/Bits";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { products } from "@/data/products";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductInput } from "@/schemas/productSchema";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AdminProducts() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const filtered = products.filter((p) => (cat === "all" || p.category === cat) && (q === "" || p.name.toLowerCase().includes(q.toLowerCase())));

  return (
    <div>
      <PageHeader title="Products" description={`${products.length} products in catalog`} action={<ProductForm />} />
      <Card className="border-0 shadow-soft">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products..." className="pl-9" />
          </div>
          <Select value={cat} onValueChange={setCat}>
            <SelectTrigger className="w-full sm:w-[180px]"><SelectValue/></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {[...new Set(products.map((p) => p.category))].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Product</th><th className="font-medium">Category</th><th className="font-medium">Price</th><th className="font-medium">Stock</th><th className="font-medium">Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((p) => {
                const stock = p.variants.reduce((s,v) => s+v.stock, 0);
                return (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt="" className="h-12 w-10 rounded object-cover"/>
                        <div><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.sku}</p></div>
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>${p.discountPrice ?? p.price}</td>
                    <td>{stock}</td>
                    <td>{stock === 0 ? <Badge variant="destructive">Out</Badge> : stock < 20 ? <Badge variant="secondary">Low</Badge> : <Badge>In stock</Badge>}</td>
                    <td className="px-4">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function ProductForm() {
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductInput>({ resolver: zodResolver(productSchema), defaultValues: { gender: "unisex", featured: false, bestSeller: false, newArrival: false, active: true } });
  const onSubmit = () => { toast.success("Product saved"); setOpen(false); reset(); };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4"/> New product</Button></DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader><DialogTitle>Create product</DialogTitle></DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 sm:grid-cols-2">
          <Field label="Name" error={errors.name?.message}><Input {...register("name")}/></Field>
          <Field label="Slug" error={errors.slug?.message}><Input {...register("slug")}/></Field>
          <Field label="Category" error={errors.category?.message}><Input {...register("category")}/></Field>
          <Field label="SKU" error={errors.sku?.message}><Input {...register("sku")}/></Field>
          <Field label="Price" error={errors.price?.message}><Input type="number" step="0.01" {...register("price")}/></Field>
          <Field label="Discount price" error={errors.discountPrice?.message}><Input type="number" step="0.01" {...register("discountPrice")}/></Field>
          <Field label="Material" error={errors.material?.message}><Input {...register("material")}/></Field>
          <Field label="Fit" error={errors.fit?.message}><Input {...register("fit")}/></Field>
          <Field label="Description" error={errors.description?.message} full><Textarea rows={4} {...register("description")}/></Field>
          <div className="sm:col-span-2 flex flex-wrap gap-6 rounded-md border p-4">
            <Toggle label="Featured" {...register("featured")} />
            <Toggle label="Best seller" {...register("bestSeller")} />
            <Toggle label="New arrival" {...register("newArrival")} />
            <Toggle label="Active" {...register("active")} />
          </div>
          <div className="sm:col-span-2 flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Save product</Button></div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
function Field({ label, error, children, full }: any) { return <div className={full ? "sm:col-span-2" : ""}><Label className="mb-1.5 block text-xs">{label}</Label>{children}{error && <p className="mt-1 text-xs text-destructive">{error}</p>}</div>; }
function Toggle({ label, ...rest }: any) { return <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...rest}/> {label}</label>; }
