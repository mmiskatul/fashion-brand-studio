import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-secondary/40">
      <div className="container-px mx-auto py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl">ATELIER</h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">Quietly considered clothing made in limited runs. Designed for longevity.</p>
            <form onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed to newsletter"); (e.target as HTMLFormElement).reset(); }} className="mt-6 flex max-w-md gap-2">
              <Input type="email" required placeholder="Email address" className="bg-background" />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
          {[
            { title: "Shop", links: [["Shop All","/shop"],["New Arrivals","/shop?new=1"],["Best Sellers","/shop?best=1"],["Collections","/collection/autumn-essentials"]] },
            { title: "Help", links: [["Contact","/contact"],["FAQ","/faq"],["Track Order","/track"],["Returns","/returns"]] },
            { title: "Company", links: [["About","/about"],["Privacy","/privacy"],["Terms","/terms"],["Returns Policy","/returns"]] },
          ].map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold">{c.title}</p>
              <ul className="mt-4 space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={href}><Link to={href} className="text-sm text-muted-foreground hover:text-foreground">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Atelier. All rights reserved.</p>
          <div className="flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-foreground"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
