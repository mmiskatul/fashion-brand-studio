import { PageHeader } from "@/components/dashboard/Bits";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { products } from "@/data/products";
import { sellers } from "@/data/mock";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const trend = months.map((m, i) => ({ month: m, revenue: 8000 + Math.round(Math.sin(i)*4000)+i*500, sales: 50 + Math.round(Math.cos(i)*15)+i*3 }));
const colorTrend = [
  { name: "Black", value: 320 }, { name: "White", value: 280 }, { name: "Navy", value: 220 },
  { name: "Beige", value: 180 }, { name: "Olive", value: 130 }, { name: "Gray", value: 110 },
];
const sizeTrend = [
  { name: "S", value: 180 }, { name: "M", value: 380 }, { name: "L", value: 320 },
  { name: "XL", value: 200 }, { name: "XXL", value: 90 },
];
const catTrend = [
  { name: "T-Shirts", value: 420 }, { name: "Hoodies", value: 310 }, { name: "Shirts", value: 240 },
  { name: "Pants", value: 190 }, { name: "Jackets", value: 140 }, { name: "Accessories", value: 200 },
];
const COLORS = ["hsl(var(--accent))","hsl(var(--info))","hsl(var(--success))","hsl(var(--warning))","hsl(var(--foreground))","hsl(var(--muted-foreground))"];

export default function AdminAnalytics() {
  const topProducts = [...products].sort((a,b) => b.variants.reduce((s,v)=>s+v.sold,0) - a.variants.reduce((s,v)=>s+v.sold,0)).slice(0, 5);
  return (
    <div>
      <PageHeader title="Analytics" description="Performance, trends, and leaderboards" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Revenue trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11}/><YAxis stroke="hsl(var(--muted-foreground))" fontSize={11}/><Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/><Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={false}/></LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Sales trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}><LineChart data={trend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/><XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11}/><YAxis stroke="hsl(var(--muted-foreground))" fontSize={11}/><Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/><Line type="monotone" dataKey="sales" stroke="hsl(var(--success))" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Trending colors</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={250}><BarChart data={colorTrend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/><XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/><Bar dataKey="value" radius={[4,4,0,0]}>{colorTrend.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Bar></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Trending sizes</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={sizeTrend} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>{sizeTrend.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}</Pie><Legend wrapperStyle={{fontSize:11}}/><Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/></PieChart></ResponsiveContainer></CardContent>
        </Card>
        <Card className="border-0 shadow-soft lg:col-span-2">
          <CardHeader><CardTitle className="text-base">Trending categories</CardTitle></CardHeader>
          <CardContent><ResponsiveContainer width="100%" height={250}><BarChart data={catTrend}><CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))"/><XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip contentStyle={{ background: "hsl(var(--background))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}/><Bar dataKey="value" fill="hsl(var(--accent))" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Top products</CardTitle></CardHeader>
          <CardContent><div className="space-y-3">{topProducts.map((p,i) => (<div key={p.id} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs">{i+1}</span><img src={p.images[0]} className="h-10 w-9 rounded object-cover" alt=""/><div className="flex-1 text-sm"><p className="font-medium">{p.name}</p><p className="text-xs text-muted-foreground">{p.category}</p></div><p className="text-sm font-semibold">{p.variants.reduce((s,v)=>s+v.sold,0)}</p></div>))}</div></CardContent>
        </Card>
        <Card className="border-0 shadow-soft">
          <CardHeader><CardTitle className="text-base">Top sellers</CardTitle></CardHeader>
          <CardContent><div className="space-y-3">{sellers.slice(0,5).map((s,i) => (<div key={s.id} className="flex items-center gap-3"><span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs">{i+1}</span><div className="flex-1 text-sm"><p className="font-medium">{s.name}</p><p className="text-xs text-muted-foreground">{s.ordersHandled} orders</p></div><p className="text-sm font-semibold">${s.totalSales.toLocaleString()}</p></div>))}</div></CardContent>
        </Card>
      </div>
    </div>
  );
}
