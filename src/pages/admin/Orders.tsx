import { useState } from "react";
import { PageHeader } from "@/components/dashboard/Bits";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { orders } from "@/data/mock";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { sellers } from "@/data/mock";

const statusColor: Record<string, any> = { pending: "secondary", confirmed: "default", processing: "default", shipped: "default", delivered: "default", cancelled: "destructive", returned: "destructive" };

export default function AdminOrders() {
  const [q, setQ] = useState("");
  const [st, setSt] = useState("all");
  const [pay, setPay] = useState("all");
  const filtered = orders.filter((o) =>
    (st === "all" || o.status === st) &&
    (pay === "all" || o.paymentStatus === pay) &&
    (q === "" || o.id.toLowerCase().includes(q.toLowerCase()) || o.customer.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div>
      <PageHeader title="Orders" description={`${orders.length} total orders`} />
      <Card className="border-0 shadow-soft">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
          <div className="relative flex-1"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by order ID or customer..." className="pl-9"/></div>
          <Select value={st} onValueChange={setSt}><SelectTrigger className="w-[160px]"><SelectValue/></SelectTrigger><SelectContent>
            <SelectItem value="all">All statuses</SelectItem>{["pending","confirmed","processing","shipped","delivered","cancelled","returned"].map((s)=><SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
          </SelectContent></Select>
          <Select value={pay} onValueChange={setPay}><SelectTrigger className="w-[160px]"><SelectValue/></SelectTrigger><SelectContent>
            <SelectItem value="all">All payments</SelectItem>{["pending","paid","failed","refunded"].map((s)=><SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
          </SelectContent></Select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Date</th><th className="font-medium">Total</th><th className="font-medium">Payment</th><th className="font-medium">Status</th><th></th></tr></thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-secondary/30">
                  <td className="p-4 font-medium">{o.id}</td>
                  <td>{o.customer.name}</td>
                  <td className="text-muted-foreground">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>${o.total}</td>
                  <td><Badge variant="outline" className="capitalize">{o.paymentStatus}</Badge></td>
                  <td><Badge variant={statusColor[o.status]} className="capitalize">{o.status}</Badge></td>
                  <td className="pr-4"><OrderDetails order={o}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function OrderDetails({ order }: { order: any }) {
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="ghost" size="icon"><Eye className="h-4 w-4"/></Button></SheetTrigger>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader><SheetTitle>{order.id}</SheetTitle></SheetHeader>
        <div className="mt-6 space-y-6 text-sm">
          <Section title="Customer">
            <p>{order.customer.name}</p>
            <p className="text-muted-foreground">{order.customer.email}</p>
            <p className="text-muted-foreground">{order.customer.phone}</p>
          </Section>
          <Section title="Address">
            <p className="text-muted-foreground">{order.customer.address}<br/>{order.customer.area}, {order.customer.city} {order.customer.postalCode}</p>
          </Section>
          <Section title="Items">
            <div className="divide-y">
              {order.items.map((it: any, i: number) => (
                <div key={i} className="flex gap-3 py-2"><img src={it.image} className="h-14 w-12 rounded object-cover" alt=""/><div className="flex-1"><p className="font-medium">{it.name}</p><p className="text-xs text-muted-foreground">{it.color} · {it.size} · ×{it.quantity}</p></div><p>${it.price*it.quantity}</p></div>
              ))}
            </div>
          </Section>
          <Section title="Summary">
            <Row label="Subtotal" value={`$${order.subtotal}`}/>
            <Row label="Discount" value={`-$${order.discount}`}/>
            <Row label="Delivery" value={`$${order.delivery}`}/>
            <div className="my-2 border-t"/>
            <Row label={<strong>Total</strong>} value={<strong>${order.total}</strong>}/>
          </Section>
          <Section title="Status">
            <div className="grid grid-cols-2 gap-2">
              <Select defaultValue={order.status}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["pending","confirmed","processing","shipped","delivered","cancelled","returned"].map((s)=><SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent></Select>
              <Select defaultValue={order.paymentStatus}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>{["pending","paid","failed","refunded"].map((s)=><SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent></Select>
            </div>
            <Select defaultValue={order.sellerId}><SelectTrigger className="mt-2"><SelectValue placeholder="Assign seller"/></SelectTrigger><SelectContent>{sellers.map((s)=><SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent></Select>
          </Section>
          <Section title="Timeline">
            <ul className="space-y-2">
              {order.timeline.map((t: any, i: number) => (
                <li key={i} className="flex gap-3 text-xs"><span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-foreground"/><span><span className="font-medium capitalize">{t.status}</span> · <span className="text-muted-foreground">{new Date(t.date).toLocaleString()}</span></span></li>
              ))}
            </ul>
          </Section>
        </div>
      </SheetContent>
    </Sheet>
  );
}
function Section({ title, children }: any) { return <div><p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>{children}</div>; }
function Row({ label, value }: any) { return <div className="flex justify-between"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>; }
