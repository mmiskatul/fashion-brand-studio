import { StatCard, PageHeader } from "@/components/dashboard/Bits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingCart, Users, Package, TrendingUp, AlertTriangle } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend, Line, LineChart } from "recharts";
import { orders, sellers } from "@/data/mock";
import { products } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const salesData = Array.from({ length: 12 }).map((_, i) => ({
  month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  revenue: 8000 + Math.round(Math.random() * 12000),
  orders: 50 + Math.round(Math.random() * 80),
}));

const statusData = [
  { name: "Pending", value: orders.filter((o) => o.status === "pending").length, fill: "hsl(var(--warning))" },
  { name: "Processing", value: orders.filter((o) => o.status === "processing").length, fill: "hsl(var(--info))" },
  { name: "Shipped", value: orders.filter((o) => o.status === "shipped").length, fill: "hsl(var(--accent))" },
  { name: "Delivered", value: orders.filter((o) => o.status === "delivered").length, fill: "hsl(var(--success))" },
  { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, fill: "hsl(var(--destructive))" },
];

export default function AdminOverview() {
  const totalRev = orders.reduce((s, o) => s + o.total, 0);
  const lowStock = products.filter((p) => p.variants.some((v) => v.stock > 0 && v.stock < 5)).length;
  const outStock = products.filter((p) => p.variants.every((v) => v.stock === 0)).length;
  const aov = Math.round(totalRev / orders.length);

  return (
    <div>
      <PageHeader title="Dashboard" description="At-a-glance performance for your brand." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={`$${totalRev.toLocaleString()}`} change={12.4} icon={DollarSign} />
        <StatCard label="Total Orders" value={orders.length} change={8.2} icon={ShoppingCart} />
        <StatCard label="Customers" value={284} change={4.1} icon={Users} />
        <StatCard label="Avg Order Value" value={`$${aov}`} change={2.3} icon={TrendingUp} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Today" value={`$${Math.round(totalRev*0.04)}`} />
        <StatCard label="This Week" value={`$${Math.round(totalRev*0.18)}`} />
        <StatCard label="This Month" value={`$${Math.round(totalRev*0.62)}`} />
        <StatCard label="Pending Orders" value={orders.filter((o)=>o.status==="pending").length} icon={Package} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Revenue & Orders</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={salesData}>
                <defs><linearGradient id="rev" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.4}/><stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11}/>
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/>
                <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" fill="url(#rev)" strokeWidth={2}/>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Order Status</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                  {statusData.map((d, i) => <Cell key={i} fill={d.fill}/>)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/>
                <Legend wrapperStyle={{ fontSize: 11 }}/>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Recent Orders</CardTitle>
            <Link to="/admin/orders" className="text-xs text-muted-foreground hover:text-foreground">View all →</Link>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr className="border-b text-xs uppercase text-muted-foreground"><th className="py-2 text-left font-medium">Order</th><th className="text-left font-medium">Customer</th><th className="text-left font-medium">Total</th><th className="text-left font-medium">Status</th></tr></thead>
                <tbody>
                  {orders.slice(0, 6).map((o) => (
                    <tr key={o.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{o.id}</td>
                      <td className="text-muted-foreground">{o.customer.name}</td>
                      <td>${o.total}</td>
                      <td><Badge variant={o.status === "delivered" ? "default" : "secondary"} className="capitalize">{o.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Top Sellers</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sellers.slice(0,5).map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium">{i+1}</div>
                  <div className="flex-1 text-sm"><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.ordersHandled} orders</p></div>
                  <p className="text-sm font-semibold">${s.totalSales.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="flex items-center gap-2 text-base"><AlertTriangle className="h-4 w-4 text-warning"/> Inventory Alerts</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Low stock</span><span className="font-semibold">{lowStock} products</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Out of stock</span><span className="font-semibold">{outStock} products</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Total products</span><span className="font-semibold">{products.length}</span></div>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Top Selling Products</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={products.slice(0, 6).map((p) => ({ name: p.name.split(" ").slice(0,2).join(" "), sold: p.variants.reduce((s,v)=>s+v.sold,0) }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={10}/>
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11}/>
                <Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/>
                <Bar dataKey="sold" fill="hsl(var(--accent))" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
