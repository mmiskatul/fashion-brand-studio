import { PageHeader } from "@/components/dashboard/Bits";
import { Card } from "@/components/ui/card";
import { customers, auditLogs, securityLogs, banners } from "@/data/mock";
import { categories, collections } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function AdminCustomers() {
  return (
    <div>
      <PageHeader title="Customers" description={`${customers.length} customers`}/>
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">Name</th><th className="font-medium">Email</th><th className="font-medium">Phone</th><th className="font-medium">Orders</th><th className="font-medium">Spent</th><th className="font-medium">Joined</th></tr></thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4 font-medium">{c.name}</td><td className="text-muted-foreground">{c.email}</td><td className="text-muted-foreground">{c.phone}</td>
                <td>{c.totalOrders}</td><td>${c.totalSpent}</td><td className="text-muted-foreground">{new Date(c.joinedAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function AdminCategories() {
  return (
    <div>
      <PageHeader title="Categories" description={`${categories.length} categories`} action={<Button><Plus className="mr-2 h-4 w-4"/>New category</Button>}/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Card key={c.id} className="border-0 shadow-soft overflow-hidden">
            <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover"/>
            <div className="flex items-center justify-between p-4"><div><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.productCount} products</p></div><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AdminCollections() {
  return (
    <div>
      <PageHeader title="Collections" description={`${collections.length} collections`} action={<Button><Plus className="mr-2 h-4 w-4"/>New collection</Button>}/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c) => (
          <Card key={c.id} className="border-0 shadow-soft overflow-hidden">
            <img src={c.image} alt="" className="aspect-[4/3] w-full object-cover"/>
            <div className="p-4"><p className="font-medium">{c.name}</p><p className="text-xs text-muted-foreground">{c.description}</p><p className="mt-2 text-xs">{c.productIds.length} products</p></div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AdminBanners() {
  return (
    <div>
      <PageHeader title="Banners & Content" description="Manage homepage content" action={<Button><Plus className="mr-2 h-4 w-4"/>New banner</Button>}/>
      <div className="space-y-4">
        {banners.map((b) => (
          <Card key={b.id} className="border-0 shadow-soft p-4 flex items-center gap-4">
            {b.image ? <img src={b.image} className="h-16 w-24 rounded object-cover" alt=""/> : <div className="h-16 w-24 rounded bg-secondary"/>}
            <div className="flex-1"><p className="font-medium">{b.title}</p><p className="text-xs text-muted-foreground">{b.subtitle}</p></div>
            <Badge variant="outline">{b.position}</Badge>
            <Badge variant={b.active ? "default" : "secondary"}>{b.active ? "Active" : "Inactive"}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function AdminSettings() {
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); toast.success("Settings saved"); };
  return (
    <div>
      <PageHeader title="Website Settings" description="Brand identity and store configuration"/>
      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-2">
        <Card className="border-0 shadow-soft p-6 space-y-4">
          <h3 className="font-medium">Brand</h3>
          <Field label="Brand name"><Input defaultValue="Atelier"/></Field>
          <Field label="Contact email"><Input type="email" defaultValue="hello@atelier.com"/></Field>
          <Field label="Contact phone"><Input defaultValue="+1 555 010 2025"/></Field>
          <Field label="Business address"><Textarea rows={3} defaultValue="245 Mercer Street, New York, NY 10012"/></Field>
        </Card>
        <Card className="border-0 shadow-soft p-6 space-y-4">
          <h3 className="font-medium">Commerce</h3>
          <Field label="Currency"><Input defaultValue="USD"/></Field>
          <Field label="Delivery charge"><Input type="number" defaultValue="8"/></Field>
          <Field label="Free delivery minimum"><Input type="number" defaultValue="100"/></Field>
        </Card>
        <Card className="border-0 shadow-soft p-6 space-y-4 lg:col-span-2">
          <h3 className="font-medium">SEO & Social</h3>
          <Field label="SEO title"><Input defaultValue="Atelier — Considered Clothing"/></Field>
          <Field label="SEO description"><Textarea rows={2} defaultValue="Premium clothing made in small batches."/></Field>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Instagram"><Input defaultValue="https://instagram.com/atelier"/></Field>
            <Field label="Twitter"><Input defaultValue="https://twitter.com/atelier"/></Field>
          </div>
        </Card>
        <div className="lg:col-span-2 flex justify-end"><Button type="submit">Save changes</Button></div>
      </form>
    </div>
  );
}

function Field({ label, children }: any) { return <div><Label className="mb-1.5 block text-xs">{label}</Label>{children}</div>; }

export function AdminAuditLogs() {
  return (
    <div>
      <PageHeader title="Audit Logs"/>
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">User</th><th className="font-medium">Action</th><th className="font-medium">Target</th><th className="font-medium">Date</th></tr></thead>
          <tbody>
            {auditLogs.map((l) => (
              <tr key={l.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4 font-medium">{l.user}</td><td>{l.action}</td><td className="text-muted-foreground">{l.target}</td><td className="text-muted-foreground">{new Date(l.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function AdminSecurityLogs() {
  return (
    <div>
      <PageHeader title="Security Logs"/>
      <Card className="border-0 shadow-soft overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase text-muted-foreground"><th className="p-4 font-medium">User</th><th className="font-medium">Event</th><th className="font-medium">IP</th><th className="font-medium">Date</th></tr></thead>
          <tbody>
            {securityLogs.map((l) => (
              <tr key={l.id} className="border-b last:border-0 hover:bg-secondary/30">
                <td className="p-4 font-medium">{l.user}</td><td>{l.event}</td><td className="text-muted-foreground font-mono text-xs">{l.ip}</td><td className="text-muted-foreground">{new Date(l.date).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

export function AdminReports() {
  return (
    <div>
      <PageHeader title="Reports" description="Export sales, product, and customer reports"/>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Sales report","Product performance","Inventory report","Customer report","Seller report","Tax report"].map((t) => (
          <Card key={t} className="border-0 shadow-soft p-6">
            <p className="font-medium">{t}</p><p className="mt-1 text-xs text-muted-foreground">CSV / PDF export</p>
            <Button variant="outline" size="sm" className="mt-4">Generate</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
