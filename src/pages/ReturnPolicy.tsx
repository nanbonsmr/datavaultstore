import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, RotateCcw, CheckCircle2, XCircle, CreditCard, Clock, HelpCircle } from "lucide-react";

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Return Policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Return & Refund Policy</h1>
      <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        {/* Overview */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">30-Day Money-Back Guarantee</h2>
          </div>
          <p>
            We want you to be completely satisfied with your purchase. If for any reason you are not happy with your order, you may return eligible items within <strong className="text-foreground">30 days of delivery</strong> for a full refund or exchange.
          </p>
        </section>

        {/* Eligibility */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Eligible for Return</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Item is in its <strong className="text-foreground">original, unopened packaging</strong> with all accessories and documentation.</li>
            <li>Item is unused and in the same condition as received.</li>
            <li>Return is initiated within 30 days of the delivery date.</li>
            <li>Proof of purchase (order confirmation email or receipt) is provided.</li>
          </ul>
        </section>

        {/* Non-eligible */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Not Eligible for Return</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Items that have been opened, used, or show signs of wear.</li>
            <li>Items returned after the 30-day window.</li>
            <li>Clearance or final-sale items (marked as non-returnable at the time of purchase).</li>
            <li>Items damaged due to misuse, neglect, or unauthorized modifications.</li>
            <li>Gift cards or downloadable software.</li>
          </ul>
        </section>

        {/* How to Return */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">How to Initiate a Return</h2>
          </div>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Email us at <a href="mailto:support@datavault.store" className="text-primary hover:underline">support@datavault.store</a> with your order number and reason for return.</li>
            <li>Our team will review your request and respond within <strong className="text-foreground">1–2 business days</strong> with a Return Merchandise Authorization (RMA) number and return shipping instructions.</li>
            <li>Pack the item securely in its original packaging and include the RMA number on the outside of the box.</li>
            <li>Ship the item to the address provided. We recommend using a trackable shipping method.</li>
          </ol>
          <p className="mt-3 text-xs">*Return shipping costs are the responsibility of the customer unless the return is due to a defective or incorrect item.</p>
        </section>

        {/* Refund */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Refund Process</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>Once we receive and inspect your return, we'll email you to confirm receipt.</li>
            <li>Approved refunds are processed within <strong className="text-foreground">5–7 business days</strong> to your original payment method.</li>
            <li>Depending on your bank or card issuer, it may take an additional 3–5 business days for the refund to appear on your statement.</li>
            <li>Original shipping costs are non-refundable unless the return is due to our error.</li>
          </ul>
        </section>

        {/* Exchanges */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <RotateCcw className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Exchanges</h2>
          </div>
          <p>
            Want a different product or variant? The fastest way is to return the original item for a refund and place a new order. If you need assistance, our support team is happy to help coordinate an exchange.
          </p>
        </section>

        {/* Damaged/Defective */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Damaged or Defective Items</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>If you receive a damaged or defective product, contact us within <strong className="text-foreground">48 hours of delivery</strong> with photos of the item and packaging.</li>
            <li>We will arrange a <strong className="text-foreground">free replacement or full refund</strong> — no return shipping required in most cases.</li>
            <li>If you received the wrong item, we'll send the correct one at no additional cost and provide a prepaid return label.</li>
          </ul>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Need Help?</h2>
          </div>
          <p>
            For any return or refund questions, <Link to="/contact" className="text-primary hover:underline">contact our support team</Link> or email{" "}
            <a href="mailto:support@datavault.store" className="text-primary hover:underline">support@datavault.store</a>. We're here to help!
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
