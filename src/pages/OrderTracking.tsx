import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Package, Search, ChevronRight, Truck, Clock, HelpCircle, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Order tracking", description: "Order tracking is coming soon. Please check your email for tracking updates." });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10 md:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Order Tracking</span>
        </nav>

        {/* Tracking Form */}
        <div className="max-w-md mx-auto text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Track Your Order</h1>
          <p className="mt-3 text-muted-foreground">
            Enter your order number and email address to check the status of your delivery.
          </p>

          <form onSubmit={handleTrack} className="mt-8 space-y-4 text-left">
            <div>
              <label htmlFor="order" className="text-sm font-medium text-foreground mb-1.5 block">Order Number</label>
              <Input
                id="order"
                placeholder="e.g., DV-2026-12345"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="bg-card border-border text-foreground"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-foreground mb-1.5 block">Email Address</label>
              <Input
                id="email"
                type="email"
                placeholder="The email used for your order"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card border-border text-foreground"
                required
              />
            </div>
            <Button type="submit" className="btn-gradient w-full gap-2">
              <Search className="h-4 w-4" /> Track Order
            </Button>
          </form>

          <p className="mt-6 text-xs text-muted-foreground">
            Can't find your order number? Check your confirmation email or{" "}
            <Link to="/contact" className="text-primary hover:underline">contact support</Link>.
          </p>
        </div>

        {/* Info Section */}
        <div className="max-w-2xl mx-auto mt-16 space-y-8">
          <h2 className="text-xl font-heading font-bold text-foreground text-center">How Order Tracking Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Mail, title: "1. Confirmation", desc: "After placing your order, you'll receive a confirmation email with your order number." },
              { icon: Truck, title: "2. Shipped", desc: "Once shipped, we'll send a tracking number via email. It may take 24h to activate." },
              { icon: Package, title: "3. Delivered", desc: "Track your package in real-time until it arrives at your doorstep." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-lg border border-border bg-card p-5 text-center">
                <div className="mx-auto mb-3 h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-heading font-semibold text-foreground mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h2 className="text-xl font-heading font-bold text-foreground text-center">Tracking FAQ</h2>
            <div className="space-y-3">
              {[
                { q: "My tracking number isn't working.", a: "Tracking info can take up to 24 hours to activate after you receive the shipping confirmation email. If it still isn't working after 48 hours, please contact us." },
                { q: "My order shows 'delivered' but I haven't received it.", a: "Sometimes carriers mark a package as delivered slightly before drop-off. Wait 24 hours, check around your delivery area, and then contact us if it's still missing." },
                { q: "Can I change my shipping address after ordering?", a: "We can update the address if the order hasn't been shipped yet. Contact us as soon as possible at support@datavault.store." },
                { q: "How long does shipping take?", a: "Domestic standard shipping takes 5–7 business days. International shipping varies by region (7–21 business days). See our Shipping Policy for full details." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start gap-2">
                    <HelpCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-heading font-semibold text-foreground">{q}</p>
                      <p className="text-xs text-muted-foreground mt-1">{a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground">
              For more shipping details, see our <Link to="/shipping-policy" className="text-primary hover:underline">Shipping Policy</Link>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
