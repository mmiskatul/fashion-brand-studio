import { PageHeader } from "@/components/dashboard/Bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function AdminInventory() {
  const [filter, setFilter] = useState("all");
  const variants = products.flatMap((p) => p.variants.map((v) => ({ ...v, productName: p.name, image: p.images[0] })));
  const out = (s: number) => s === 0;
  const low = (s: number) => s > 0 && s < 5;
  const filtered = variants.filter((v) => filter === "all" || (filter === "low" && low(v.stock)) || (filter === "out" && out(v.stock)));

  return (
    <div>
      <PageHeader title="Inventory" description={`${variants.length} variants tracked`}/>
      <div className="mb-4 flex gap-3">
        <Input placeholder="Filter by SKU..." className="max-w-xs"/>
        <Select value={filter} onValueChange={setFilter}><SelectTrigger className="w-[180px]"><SelectValue/></SelectTrigger><SelectContent>
          <SelectItem value="all">All</SelectItem><SelectItem value="low">Low stock</SelectItem><SelectItem value="out">Out of stock</SelectItem>
        </SelectContent></Select>
      </div>
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Product</th><th className="font-medium">Color</th><th className="font-medium">Size</th><th className="font-medium">SKU</th><th className="font-medium">Stock</th><th className="font-medium">Sold</th><th className="font-medium">Status</th><th></th></tr></thead>
          <tbody>
            {filtered.slice(0, 40).map((v) => (
              <tr key={v.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4"><div className="flex items-center gap-3"><img src={v.image} className="h-10 w-9 rounded object-cover" alt=""/><span className="font-medium">{v.productName}</span></div></td>
                <td>{v.color}</td><td>{v.size}</td><td className="text-muted-foreground">{v.sku}</td><td>{v.stock}</td><td>{v.sold}</td>
                <td>{out(v.stock) ? <Badge variant="destructive">Out</Badge> : low(v.stock) ? <Badge variant="secondary">Low</Badge> : <Badge>In stock</Badge>}</td>
                <td className="pr-4 text-right"><Button variant="ghost" size="sm">Adjust</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
