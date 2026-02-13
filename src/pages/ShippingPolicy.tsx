import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ShippingPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Shipping Policy</h1>
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Processing Time</h2>
          <p>All orders are processed within 1-2 business days. Orders placed on weekends or holidays will be processed on the next business day.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Shipping Rates & Delivery Times</h2>
          <p>We offer free standard shipping on all orders over $50. Standard shipping typically takes 5-14 business days depending on your location. Express shipping options (2-5 business days) are available at checkout for an additional fee.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">International Shipping</h2>
          <p>We ship to over 180 countries worldwide. International delivery times vary between 7-21 business days. Import duties and taxes may apply and are the responsibility of the buyer.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Order Tracking</h2>
          <p>All orders include a tracking number sent via email once your order ships. You can track your order on our <a href="/order-tracking" className="text-primary hover:underline">Order Tracking page</a>.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ShippingPolicy;
