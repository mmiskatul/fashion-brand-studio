import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/store/cart";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/category/t-shirts", label: "T-Shirts" },
  { to: "/category/hoodies", label: "Hoodies" },
  { to: "/collection/autumn-essentials", label: "Collections" },
  { to: "/about", label: "About" },
];

export default function Header() {
  const count = useCart((s) => s.items.reduce((n, i) => n + i.quantity, 0));
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (q.trim()) { nav(`/search?q=${encodeURIComponent(q)}`); setSearchOpen(false); setQ(""); }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="container-px mx-auto flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px]">
              <nav className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} className={({isActive}) => `rounded-md px-3 py-3 text-sm font-medium ${isActive ? "bg-secondary" : "hover:bg-secondary/50"}`}>{l.label}</NavLink>
                ))}
                <div className="my-3 border-t" />
                <NavLink to="/track" className="rounded-md px-3 py-3 text-sm hover:bg-secondary/50">Track Order</NavLink>
                <NavLink to="/contact" className="rounded-md px-3 py-3 text-sm hover:bg-secondary/50">Contact</NavLink>
                <NavLink to="/admin" className="rounded-md px-3 py-3 text-sm hover:bg-secondary/50">Admin Dashboard</NavLink>
                <NavLink to="/seller" className="rounded-md px-3 py-3 text-sm hover:bg-secondary/50">Seller Dashboard</NavLink>
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="font-display text-2xl font-semibold tracking-tight">ATELIER</Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({isActive}) => `text-sm font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>{l.label}</NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen((v) => !v)}><Search className="h-5 w-5" /></Button>
          <Link to="/admin"><Button variant="ghost" size="icon" aria-label="Account"><User className="h-5 w-5" /></Button></Link>
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" aria-label="Cart"><ShoppingBag className="h-5 w-5" /></Button>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold text-background">{count}</span>
            )}
          </Link>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t bg-background">
          <form onSubmit={submit} className="container-px mx-auto flex items-center gap-2 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, categories..." className="border-0 focus-visible:ring-0" />
            <Button type="button" variant="ghost" size="icon" onClick={() => setSearchOpen(false)}><X className="h-4 w-4" /></Button>
          </form>
        </div>
      )}
    </header>
  );
}
