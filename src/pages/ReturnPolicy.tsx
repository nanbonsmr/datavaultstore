import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Return Policy</h1>
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">30-Day Money-Back Guarantee</h2>
          <p>We offer a 30-day return window on all products. If you're not satisfied, simply contact our support team to initiate a return.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Return Conditions</h2>
          <p>Items must be returned in their original packaging, unused, and in the same condition you received them. We reserve the right to refuse returns that don't meet these criteria.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Refund Process</h2>
          <p>Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds are issued to the original payment method.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Damaged or Defective Items</h2>
          <p>If you receive a damaged or defective product, contact us within 48 hours with photos. We'll arrange a free replacement or full refund immediately.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
