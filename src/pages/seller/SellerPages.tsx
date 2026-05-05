import { PageHeader, StatCard } from "@/components/dashboard/Bits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { sellerService } from "@/services/sellerService";
import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

const SELLER_ID = "s1";

const trend = Array.from({length:12}).map((_,i)=>({ month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], sales: 1000+Math.round(Math.random()*3000) }));

export function SellerOverview() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(() => { sellerService.myStats(SELLER_ID).then(setStats); sellerService.myOrders(SELLER_ID).then(setOrders); }, []);
  if (!stats) return <p>Loading...</p>;
  return (
    <div>
      <PageHeader title="Welcome back" description="Your sales performance"/>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Sales" value={`$${stats.totalSales.toLocaleString()}`} change={9.2} icon={DollarSign}/>
        <StatCard label="Orders" value={stats.totalOrders} change={4.1} icon={ShoppingCart}/>
        <StatCard label="Today" value={`$${stats.todaySales}`} icon={TrendingUp}/>
        <StatCard label="Pending" value={stats.pending} icon={Package}/>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-0 shadow-soft lg:col-span-2"><CardHeader><CardTitle className="text-base">Sales</CardTitle></CardHeader><CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trend}><defs><linearGradient id="s" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/><stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/><XAxis dataKey="month" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{background:"hsl(var(--background))",border:"1px solid hsl(var(--border))",borderRadius:8,fontSize:12}}/><Area type="monotone" dataKey="sales" stroke="hsl(var(--accent))" fill="url(#s)" strokeWidth={2}/>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent></Card>
        <Card className="border-0 shadow-soft"><CardHeader><CardTitle className="text-base">Recent assigned orders</CardTitle></CardHeader><CardContent>
          <div className="space-y-3 text-sm">{orders.slice(0,5).map((o)=>(<div key={o.id} className="flex justify-between"><div><p className="font-medium">{o.id}</p><p className="text-xs text-muted-foreground">{o.customer.name}</p></div><Badge variant="secondary" className="capitalize">{o.status}</Badge></div>))}</div>
        </CardContent></Card>
      </div>
    </div>
  );
}

export function SellerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [q, setQ] = useState(""); const [st, setSt] = useState("all");
  useEffect(() => { sellerService.myOrders(SELLER_ID).then(setOrders); }, []);
  const filtered = orders.filter((o) => (st==="all"||o.status===st) && (q===""||o.id.toLowerCase().includes(q.toLowerCase())));
  return (
    <div>
      <PageHeader title="Assigned Orders"/>
      <Card className="border-0 shadow-soft">
        <div className="flex flex-col gap-3 border-b p-4 sm:flex-row">
          <Input placeholder="Search..." value={q} onChange={(e)=>setQ(e.target.value)} className="flex-1"/>
          <Select value={st} onValueChange={setSt}><SelectTrigger className="w-[160px]"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="all">All</SelectItem>{["pending","processing","shipped","delivered"].map((s)=><SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Order</th><th className="font-medium">Customer</th><th className="font-medium">Total</th><th className="font-medium">Status</th><th></th></tr></thead>
          <tbody>{filtered.map((o)=>(<tr key={o.id} className="border-b last:border-0 hover:bg-secondary/30"><td className="p-4 font-medium">{o.id}</td><td>{o.customer.name}</td><td>${o.total}</td><td><Badge className="capitalize">{o.status}</Badge></td><td className="pr-4 text-right"><Button variant="ghost" size="sm">Update</Button></td></tr>))}</tbody>
        </table></div>
      </Card>
    </div>
  );
}

export function SellerSimple({ title }: { title: string }) {
  return <div><PageHeader title={title} description="Coming soon — feature scaffolded for backend integration"/><Card className="border-0 shadow-soft p-12 text-center text-muted-foreground">This view is wired to the seller service and ready for real data.</Card></div>;
}
