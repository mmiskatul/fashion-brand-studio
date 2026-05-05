import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Bell, Search, Menu, ChevronDown, LogOut, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function DashboardLayout({
  brand, navItems, basePath, role,
}: {
  brand: string;
  navItems: { to: string; label: string; icon: any }[];
  basePath: string;
  role: string;
}) {
  const { pathname } = useLocation();
  const Sidebar = (
    <aside className="flex h-full w-64 flex-col border-r bg-sidebar text-sidebar-foreground">
      <Link to="/" className="flex h-16 items-center gap-2 border-b px-6 font-display text-xl">{brand}</Link>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3 text-sm">
        {navItems.map((it) => {
          const to = basePath === "/" ? it.to : `${basePath}${it.to}`;
          const active = pathname === to || (it.to !== "" && pathname.startsWith(to) && to !== basePath);
          return (
            <NavLink key={to} to={to} end={it.to === ""} className={`flex items-center gap-3 rounded-md px-3 py-2.5 transition-colors ${active ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50"}`}>
              <it.icon className="h-4 w-4" /><span>{it.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="border-t p-3">
        <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-xs text-muted-foreground hover:bg-sidebar-accent/50">← Back to store</Link>
      </div>
    </aside>
  );
  return (
    <div className="flex h-screen bg-secondary/30">
      <div className="hidden lg:block">{Sidebar}</div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center gap-3 border-b bg-background px-4 lg:px-6">
          <Sheet>
            <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden"><Menu className="h-5 w-5"/></Button></SheetTrigger>
            <SheetContent side="left" className="p-0 w-64">{Sidebar}</SheetContent>
          </Sheet>
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"/>
            <Input placeholder="Search..." className="pl-9 bg-secondary/50 border-0" />
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2 px-2">
                <Avatar className="h-7 w-7"><AvatarFallback className="text-xs">{role[0].toUpperCase()}</AvatarFallback></Avatar>
                <span className="hidden text-sm sm:inline">{role}</span>
                <ChevronDown className="h-3 w-3"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>{role} account</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem><SettingsIcon className="mr-2 h-4 w-4"/>Settings</DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/"><LogOut className="mr-2 h-4 w-4"/>Sign out</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-8"><Outlet /></main>
      </div>
    </div>
  );
}
