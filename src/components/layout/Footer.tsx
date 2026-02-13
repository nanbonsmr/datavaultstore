import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const wishlistCount = 0; // not needed here

  return (
    <footer className="border-t border-border bg-card/50 relative overflow-hidden">
      <div className="glow-orb glow-orb-primary w-[300px] h-[300px] -bottom-40 left-1/4 opacity-[0.05]" />

      <div className="container mx-auto px-4 py-14 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-4">
              Data<span className="gradient-text">Vault</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted source for premium USB storage & equipment. Quality products, fast shipping, worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2.5 text-sm">
              {["USB Drives", "External Storage", "USB Hubs", "Cables & Adapters", "Accessories"].map((cat) => (
                <li key={cat}>
                  <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: "FAQ", path: "/faq" },
                { label: "Shipping Policy", path: "/shipping-policy" },
                { label: "Return Policy", path: "/return-policy" },
                { label: "Privacy Policy", path: "/privacy-policy" },
                { label: "Order Tracking", path: "/order-tracking" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-muted-foreground hover:text-primary transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-3.5 w-3.5 text-primary" />
                </div>
                nanbonkayu@gmail.com
              </li>
              <li className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                +251976892311
              </li>
              <li className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                </div>
                Worldwide Shipping
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-xs text-muted-foreground">© 2026 DataVault. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="glass px-3 py-1.5 rounded-full">🔒 SSL Secured</span>
            <span className="glass px-3 py-1.5 rounded-full">💳 Visa / MC / PayPal</span>
            <span className="glass px-3 py-1.5 rounded-full">🚚 Fast Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
