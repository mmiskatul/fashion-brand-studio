import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OrderConfirmation() {
  const { id } = useParams();
  return (
    <div className="container-px mx-auto flex min-h-[70vh] items-center py-16">
      <div className="mx-auto max-w-lg text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
        <h1 className="mt-6 font-display text-4xl">Thank you for your order</h1>
        <p className="mt-3 text-muted-foreground">Your order <span className="font-semibold text-foreground">{id}</span> has been placed. We've sent a confirmation email with the details.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild><Link to={`/track`}><Package className="mr-2 h-4 w-4"/> Track order</Link></Button>
          <Button variant="outline" asChild><Link to="/shop">Continue shopping</Link></Button>
        </div>
      </div>
    </div>
  );
}
