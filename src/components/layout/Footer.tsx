import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-heading font-bold text-foreground mb-4">
            Data<span className="text-primary">Vault</span>
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your trusted source for high-speed storage solutions. Quality products, fast shipping, worldwide.
          </p>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            {["USB Drives", "External HDDs", "SSD", "Memory Cards", "Accessories"].map((cat) => (
              <li key={cat}>
                <Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-foreground mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
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
          <h4 className="font-heading font-semibold text-foreground mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@datavault.store</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +1 (800) 555-0199</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Worldwide Shipping</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border mt-8 pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between">
        <p className="text-xs text-muted-foreground">© 2026 DataVault. All rights reserved.</p>
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs text-muted-foreground">
          <span>🔒 SSL Secured</span>
          <span>💳 Visa / Mastercard / PayPal</span>
          <span>🚚 Fast Worldwide Shipping</span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
