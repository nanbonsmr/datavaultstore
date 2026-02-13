import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const { toast } = useToast();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order tracking", description: "Order tracking will be available once Shopify is connected." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Track Your Order</h1>
          <p className="mt-3 text-muted-foreground">Enter your order number or tracking ID to check the status of your delivery.</p>

          <form onSubmit={handleTrack} className="mt-8 space-y-4">
            <Input
              placeholder="Order number (e.g., DV-2026-12345)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="bg-card border-border text-foreground text-center"
              required
            />
            <Button type="submit" className="btn-gradient w-full gap-2">
              <Search className="h-4 w-4" /> Track Order
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Can't find your order number? Check your email confirmation or <a href="/contact" className="text-primary hover:underline">contact support</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
