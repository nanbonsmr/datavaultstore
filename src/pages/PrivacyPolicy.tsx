import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-heading font-bold text-foreground mb-8">Privacy Policy</h1>
      <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Information We Collect</h2>
          <p>We collect information you provide directly, such as name, email, shipping address, and payment details when making a purchase. We also collect browsing data through cookies to improve your experience.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">How We Use Your Information</h2>
          <p>Your data is used to process orders, communicate about your purchases, improve our products, and send marketing communications (with your consent). We never sell your personal data to third parties.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Data Security</h2>
          <p>We use 256-bit SSL encryption and industry-standard security measures to protect your personal information. Payment processing is handled through PCI-compliant payment providers.</p>
        </section>
        <section>
          <h2 className="text-lg font-heading font-semibold text-foreground mb-2">Your Rights</h2>
          <p>You can request access, correction, or deletion of your personal data at any time by contacting us at support@datavault.store. We respond to all data requests within 30 days.</p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
