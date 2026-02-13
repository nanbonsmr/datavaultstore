import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Truck, Clock, Globe, Package, AlertTriangle, HelpCircle } from "lucide-react";

const ShippingPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Shipping Policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Shipping Policy</h1>
      <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        {/* Processing */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Processing Time</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>All orders are processed within <strong className="text-foreground">1–2 business days</strong> (Monday–Friday, excluding holidays).</li>
            <li>Orders placed after 3:00 PM EST or on weekends/holidays will begin processing the next business day.</li>
            <li>During sales events or peak seasons, processing may take an additional 1–2 business days.</li>
            <li>You will receive a confirmation email with your order details immediately after purchase.</li>
          </ul>
        </section>

        {/* Domestic */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Truck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Domestic Shipping (United States)</h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Method</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Estimated Delivery</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="px-4 py-3">Standard Shipping</td><td className="px-4 py-3">5–7 business days</td><td className="px-4 py-3">Free on orders over $50 / $4.99</td></tr>
                <tr><td className="px-4 py-3">Expedited Shipping</td><td className="px-4 py-3">2–3 business days</td><td className="px-4 py-3">$9.99</td></tr>
                <tr><td className="px-4 py-3">Overnight Shipping</td><td className="px-4 py-3">1 business day</td><td className="px-4 py-3">$19.99</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs">*Delivery estimates begin after the order has been processed and shipped.</p>
        </section>

        {/* International */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">International Shipping</h2>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card border-b border-border">
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Region</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Estimated Delivery</th>
                  <th className="text-left px-4 py-3 font-heading font-semibold text-foreground">Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr><td className="px-4 py-3">Canada</td><td className="px-4 py-3">5–10 business days</td><td className="px-4 py-3">$7.99</td></tr>
                <tr><td className="px-4 py-3">Europe (EU/UK)</td><td className="px-4 py-3">7–14 business days</td><td className="px-4 py-3">$12.99</td></tr>
                <tr><td className="px-4 py-3">Asia Pacific</td><td className="px-4 py-3">10–18 business days</td><td className="px-4 py-3">$14.99</td></tr>
                <tr><td className="px-4 py-3">Rest of World</td><td className="px-4 py-3">14–21 business days</td><td className="px-4 py-3">$16.99</td></tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>International orders may be subject to <strong className="text-foreground">import duties, taxes, and customs fees</strong> imposed by the destination country. These charges are the responsibility of the recipient.</li>
            <li>DataVault is not responsible for delays caused by customs processing.</li>
            <li>Some remote areas may experience longer delivery times.</li>
          </ul>
        </section>

        {/* Tracking */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Order Tracking</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Once your order ships, you will receive an email with a tracking number and a link to track your package.</li>
            <li>You can also track your order anytime on our <Link to="/order-tracking" className="text-primary hover:underline">Order Tracking page</Link>.</li>
            <li>Please allow up to 24 hours after receiving your shipping confirmation for tracking information to update.</li>
          </ul>
        </section>

        {/* Issues */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Shipping Issues</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Lost packages:</strong> If your tracking shows "delivered" but you haven't received the package, please contact us within 7 days. We will work with the carrier to resolve the issue or send a replacement.</li>
            <li><strong className="text-foreground">Damaged packages:</strong> If your order arrives damaged, take photos and contact us within 48 hours at <a href="mailto:support@datavault.store" className="text-primary hover:underline">support@datavault.store</a>.</li>
            <li><strong className="text-foreground">Incorrect address:</strong> DataVault is not responsible for packages sent to incorrect addresses provided by the customer. Re-shipping fees may apply.</li>
            <li><strong className="text-foreground">P.O. Boxes:</strong> We ship to P.O. Boxes via USPS Standard only.</li>
          </ul>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Questions?</h2>
          </div>
          <p>
            If you have any questions about shipping, feel free to <Link to="/contact" className="text-primary hover:underline">contact our support team</Link> or email us at{" "}
            <a href="mailto:support@datavault.store" className="text-primary hover:underline">support@datavault.store</a>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPolicy;
