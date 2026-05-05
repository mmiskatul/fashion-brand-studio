import { Link } from "react-router-dom";
import { LayoutDashboard, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Home from "./Home";

// Index renders the customer home + a small dashboards strip at the bottom for discovery
export default function Index() {
  return (
    <>
      <Home />
      <div className="border-t bg-secondary/40">
        <div className="container-px mx-auto flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-center">
          <p className="text-sm text-muted-foreground">Looking for the dashboards?</p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild><Link to="/admin"><LayoutDashboard className="mr-2 h-4 w-4"/>Admin Dashboard</Link></Button>
            <Button size="sm" variant="outline" asChild><Link to="/seller"><ShoppingBag className="mr-2 h-4 w-4"/>Seller Dashboard</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
