import { Zap, ShieldCheck, CreditCard, Truck } from "lucide-react";

const features = [
  { icon: Zap, title: "High Speed Performance", desc: "Up to 2800 MB/s read speeds for demanding workloads and seamless file transfers.", color: "--primary" },
  { icon: ShieldCheck, title: "Quality Tested Products", desc: "Every product undergoes rigorous quality testing before reaching your doorstep.", color: "--accent" },
  { icon: CreditCard, title: "Secure Payments", desc: "256-bit SSL encryption with Stripe & PayPal. Your transactions are always safe.", color: "--glow-purple" },
  { icon: Truck, title: "Worldwide Shipping", desc: "Fast, tracked shipping to 180+ countries. Free shipping on orders over $50.", color: "--primary" },
];

const FeaturesSection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="glow-orb glow-orb-accent w-[350px] h-[350px] -bottom-32 -right-32" />

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Why DataVault</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Why Choose DataVault?</h2>
        <p className="mt-3 text-muted-foreground">Trusted by thousands of customers worldwide</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative rounded-2xl glass p-6 text-center hover:border-primary/20 transition-all duration-500 animate-fade-up overflow-hidden"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 50% 0%, hsl(var(${f.color}) / 0.08), transparent 70%)` }}
            />
            <div className="relative">
              <div
                className="mx-auto mb-5 h-14 w-14 rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                style={{ background: `linear-gradient(135deg, hsl(var(${f.color}) / 0.15), hsl(var(${f.color}) / 0.05))` }}
              >
                <f.icon className="h-7 w-7" style={{ color: `hsl(var(${f.color}))` }} />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
