import { Zap, ShieldCheck, CreditCard, Truck } from "lucide-react";

const features = [
  { icon: Zap, title: "High Speed Performance", desc: "Up to 2800 MB/s read speeds for demanding workloads and seamless file transfers." },
  { icon: ShieldCheck, title: "Quality Tested Products", desc: "Every product undergoes rigorous quality testing before reaching your doorstep." },
  { icon: CreditCard, title: "Secure Payments", desc: "256-bit SSL encryption with Stripe & PayPal. Your transactions are always safe." },
  { icon: Truck, title: "Worldwide Shipping", desc: "Fast, tracked shipping to 180+ countries. Free shipping on orders over $50." },
];

const FeaturesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Why Choose DataVault?</h2>
        <p className="mt-3 text-muted-foreground">Trusted by thousands of customers worldwide</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f) => (
          <div
            key={f.title}
            className="relative rounded-lg border border-border bg-card p-6 text-center group hover:border-primary/30 transition-colors"
          >
            <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:animate-pulse-glow transition-shadow">
              <f.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
