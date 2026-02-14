import { Link } from "react-router-dom";
import { ArrowRight, Shield, Truck, Zap, Star } from "lucide-react";
import heroImage from "@/assets/hero-storage.jpg";

const HeroSection = () => (
  <section className="relative overflow-hidden min-h-[85vh] flex items-center">
    {/* Background layers */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/80" />
    <div className="absolute inset-0 grid-pattern opacity-20" />

    {/* Glow orbs */}
    <div className="glow-orb glow-orb-primary w-[500px] h-[500px] -top-40 -left-40" />
    <div className="glow-orb glow-orb-accent w-[400px] h-[400px] bottom-0 right-0" />
    <div className="glow-orb glow-orb-purple w-[300px] h-[300px] top-1/3 right-1/4" />

    <div className="relative container mx-auto px-4 py-24 md:py-36">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 mb-8 animate-fade-up">
            <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold text-accent tracking-wide uppercase">Up to 2800 MB/s Transfer Speeds</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-[1.05] tracking-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Premium USB{" "}
            <span className="gradient-text-glow">Storage & Equipment</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
            High-speed drives, USB hubs, cables, adapters & accessories — everything you need for seamless connectivity.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/shop"
              className="btn-gradient inline-flex items-center justify-center gap-2 rounded-xl px-8 py-4 text-sm font-bold tracking-wide"
            >
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-xl glass px-8 py-4 text-sm font-semibold text-foreground hover:bg-secondary/80 transition-all"
            >
              Learn More
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap gap-6 mt-14 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Shield, text: "Secure Payments" },
              { icon: Truck, text: "Worldwide Shipping" },
              { icon: Zap, text: "Quality Tested" },
              { icon: Star, text: "4.9/5 Rating" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hero image */}
        <div className="relative animate-fade-up hidden lg:block" style={{ animationDelay: '0.3s' }}>
          <div className="relative rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
            <img
              src={heroImage}
              alt="Premium USB storage devices with neon blue and purple lighting"
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10" />
          </div>
          {/* Decorative glow behind image */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-3xl blur-2xl -z-10" />
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
