import { Link } from "react-router-dom";
import { Usb, HardDrive, Cable, Monitor, Headphones } from "lucide-react";

const cats = [
  { name: "USB Drives", icon: Usb, desc: "Flash drives & thumb drives", color: "--primary" },
  { name: "External Storage", icon: HardDrive, desc: "HDDs, SSDs & portable drives", color: "--accent" },
  { name: "USB Hubs & Docks", icon: Monitor, desc: "Multi-port hubs & docking stations", color: "--glow-purple" },
  { name: "Cables & Adapters", icon: Cable, desc: "USB-C, Lightning & more", color: "--primary" },
  { name: "USB Accessories", icon: Headphones, desc: "Chargers, readers & peripherals", color: "--accent" },
];

const CategoriesSection = () => (
  <section className="section-padding relative overflow-hidden">
    {/* Subtle glow */}
    <div className="glow-orb glow-orb-primary w-[400px] h-[400px] -top-40 left-1/2 -translate-x-1/2" />

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Categories</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Shop by Category</h2>
        <p className="mt-3 text-muted-foreground">Find the perfect storage solution for your needs</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cats.map((cat) => (
          <Link
            key={cat.name}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="card-glow group flex flex-col items-center gap-4 rounded-2xl bg-card p-6 text-center relative overflow-hidden"
          >
            {/* Icon glow bg */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at center, hsl(var(${cat.color}) / 0.06), transparent 70%)` }}
            />
            <div className="relative rounded-2xl p-4 transition-all duration-500 group-hover:scale-110"
              style={{ background: `linear-gradient(135deg, hsl(var(${cat.color}) / 0.12), hsl(var(${cat.color}) / 0.04))` }}
            >
              <cat.icon className="h-7 w-7 transition-colors duration-300" style={{ color: `hsl(var(${cat.color}))` }} />
            </div>
            <div className="relative">
              <h3 className="font-heading font-semibold text-sm text-card-foreground">{cat.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{cat.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
