import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function StatCard({ label, value, change, icon: Icon }: { label: string; value: string | number; change?: number; icon?: any }) {
  return (
    <Card className="border-0 shadow-soft">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          {Icon && <div className="rounded-md bg-secondary p-2"><Icon className="h-4 w-4"/></div>}
        </div>
        <p className="mt-3 font-display text-3xl">{value}</p>
        {change !== undefined && (
          <p className={`mt-1 flex items-center gap-1 text-xs ${change >= 0 ? "text-success" : "text-destructive"}`}>
            {change >= 0 ? <ArrowUpRight className="h-3 w-3"/> : <ArrowDownRight className="h-3 w-3"/>}
            {Math.abs(change)}% vs last period
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
      <div>
        <h1 className="font-display text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}
