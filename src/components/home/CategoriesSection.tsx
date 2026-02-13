import { Link } from "react-router-dom";
import { Usb, HardDrive, Cpu, Layers, Cable, Monitor, Headphones } from "lucide-react";

const cats = [
  { name: "USB Drives", icon: Usb, desc: "Flash drives & thumb drives" },
  { name: "External Storage", icon: HardDrive, desc: "HDDs, SSDs & portable drives" },
  { name: "USB Hubs & Docks", icon: Monitor, desc: "Multi-port hubs & docking stations" },
  { name: "Cables & Adapters", icon: Cable, desc: "USB-C, Lightning & more" },
  { name: "USB Accessories", icon: Headphones, desc: "Chargers, readers & peripherals" },
];

const CategoriesSection = () => (
  <section className="section-padding">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Shop by Category</h2>
        <p className="mt-3 text-muted-foreground">Find the perfect storage solution for your needs</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cats.map((cat) => (
          <Link
            key={cat.name}
            to={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="card-glow group flex flex-col items-center gap-3 rounded-lg border border-border bg-card p-6 text-center"
          >
            <div className="rounded-xl bg-primary/10 p-4 group-hover:bg-primary/20 transition-colors">
              <cat.icon className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-sm text-card-foreground">{cat.name}</h3>
            <p className="text-xs text-muted-foreground">{cat.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
