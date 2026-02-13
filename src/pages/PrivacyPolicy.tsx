import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ChevronRight, Shield, Eye, Database, Lock, Cookie, UserCheck, Mail } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground">Privacy Policy</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">Privacy Policy</h1>
      <p className="text-muted-foreground mb-10">Last updated: February 2026</p>

      <div className="space-y-10 text-sm text-muted-foreground leading-relaxed">
        {/* Intro */}
        <section>
          <p>
            At DataVault ("we," "us," or "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and make purchases from our store.
          </p>
        </section>

        {/* Collection */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Information We Collect</h2>
          </div>
          <p className="mb-3"><strong className="text-foreground">Personal Information:</strong></p>
          <ul className="list-disc pl-5 space-y-1 mb-4">
            <li>Full name, email address, phone number</li>
            <li>Shipping and billing address</li>
            <li>Payment information (processed securely by third-party payment providers — we never store card details)</li>
            <li>Order history and transaction records</li>
          </ul>
          <p className="mb-3"><strong className="text-foreground">Automatically Collected Information:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>IP address, browser type, and operating system</li>
            <li>Pages visited, time spent on pages, and referring URLs</li>
            <li>Device identifiers and cookies (see Cookie Policy below)</li>
          </ul>
        </section>

        {/* Usage */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Database className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">How We Use Your Information</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Process orders:</strong> Fulfill purchases, send order confirmations and shipping updates.</li>
            <li><strong className="text-foreground">Customer support:</strong> Respond to inquiries, returns, and refund requests.</li>
            <li><strong className="text-foreground">Improve our services:</strong> Analyze usage patterns to enhance website functionality and user experience.</li>
            <li><strong className="text-foreground">Marketing:</strong> Send promotional emails and offers (only with your consent; you can unsubscribe at any time).</li>
            <li><strong className="text-foreground">Legal compliance:</strong> Meet legal obligations, resolve disputes, and enforce our agreements.</li>
          </ul>
        </section>

        {/* Sharing */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Information Sharing & Disclosure</h2>
          </div>
          <p className="mb-3">We do <strong className="text-foreground">not sell, trade, or rent</strong> your personal information. We may share data with:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Service providers:</strong> Payment processors (Shopify Payments, PayPal), shipping carriers, and analytics tools that help us operate our business.</li>
            <li><strong className="text-foreground">Legal requirements:</strong> When required by law, subpoena, or to protect the rights, property, or safety of DataVault and its customers.</li>
            <li><strong className="text-foreground">Business transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
          </ul>
        </section>

        {/* Security */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Lock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Data Security</h2>
          </div>
          <ul className="list-disc pl-5 space-y-2">
            <li>All data is transmitted over <strong className="text-foreground">256-bit SSL/TLS encryption</strong>.</li>
            <li>Payment processing is handled by <strong className="text-foreground">PCI DSS-compliant</strong> third-party providers.</li>
            <li>We implement access controls, regular security audits, and secure server infrastructure.</li>
            <li>While we take every precaution, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</li>
          </ul>
        </section>

        {/* Cookies */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Cookie className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Cookies & Tracking Technologies</h2>
          </div>
          <p className="mb-3">We use cookies and similar technologies to:</p>
          <ul className="list-disc pl-5 space-y-2 mb-3">
            <li><strong className="text-foreground">Essential cookies:</strong> Enable core site functionality like shopping cart and checkout.</li>
            <li><strong className="text-foreground">Analytics cookies:</strong> Help us understand how visitors use our website (e.g., Google Analytics).</li>
            <li><strong className="text-foreground">Marketing cookies:</strong> Deliver relevant ads and measure campaign effectiveness.</li>
          </ul>
          <p>You can manage cookie preferences through your browser settings. Disabling certain cookies may affect site functionality.</p>
        </section>

        {/* Rights */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <UserCheck className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Your Rights</h2>
          </div>
          <p className="mb-3">Depending on your location, you may have the following rights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong className="text-foreground">Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong className="text-foreground">Correction:</strong> Request correction of inaccurate or incomplete data.</li>
            <li><strong className="text-foreground">Deletion:</strong> Request deletion of your personal data ("right to be forgotten").</li>
            <li><strong className="text-foreground">Opt-out:</strong> Unsubscribe from marketing communications at any time.</li>
            <li><strong className="text-foreground">Data portability:</strong> Receive your data in a structured, machine-readable format.</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, email us at <a href="mailto:nanbonkayu@gmail.com" className="text-primary hover:underline">nanbonkayu@gmail.com</a>. We respond to all requests within 30 days.</p>
        </section>

        {/* Children */}
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Children's Privacy</h2>
          <p>Our website is not intended for individuals under the age of 13. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child under 13, we will take steps to delete it promptly.</p>
        </section>

        {/* Changes */}
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-3">Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last updated" date. We encourage you to review this page periodically.</p>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Mail className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Contact Us</h2>
          </div>
          <p>
            If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary hover:underline">contact us</Link> or email{" "}
            <a href="mailto:nanbonkayu@gmail.com" className="text-primary hover:underline">nanbonkayu@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
