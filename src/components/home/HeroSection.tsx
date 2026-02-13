import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Zap } from "lucide-react";
import heroImage from "@/assets/hero-storage.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImage} alt="Premium storage devices" className="w-full h-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
    </div>

    <div className="relative container mx-auto px-4 py-24 md:py-36">
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 mb-6">
          <Zap className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-medium text-primary">Up to 2800 MB/s Transfer Speeds</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.1] tracking-tight">
          Premium USB{" "}
          <span className="gradient-text">Storage & Equipment</span>
        </h1>

        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
          High-speed drives, USB hubs, cables, adapters & accessories — everything you need for seamless connectivity.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Link
            to="/shop"
            className="btn-gradient inline-flex items-center justify-center gap-2 rounded-lg px-8 py-3.5 text-sm"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm text-foreground hover:bg-secondary transition-colors"
          >
            Learn More
          </Link>
        </div>

        <div className="flex flex-wrap gap-6 mt-12 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>Secure Payments</span>
          </div>
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-primary" />
            <span>Worldwide Shipping</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span>Quality Tested</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
