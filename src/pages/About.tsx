import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Zap, Users, Globe, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Happy Customers", value: "50,000+" },
  { icon: Globe, label: "Countries Served", value: "180+" },
  { icon: Award, label: "Products Sold", value: "200,000+" },
  { icon: Zap, label: "Years Experience", value: "5+" },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">About DataVault</h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          We believe everyone deserves access to fast, reliable digital storage without breaking the bank.
          DataVault was founded to bridge the gap between premium quality and affordability in the electronics market.
        </p>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          Our team carefully selects and tests every product to ensure it meets our strict quality standards.
          From students backing up their thesis to professionals editing 8K video, we have the right storage solution for you.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="text-center rounded-lg border border-border bg-card p-6">
            <s.icon className="h-8 w-8 text-primary mx-auto mb-3" />
            <p className="text-2xl font-heading font-bold text-foreground">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">
          To provide the world's best digital storage products at fair prices, backed by exceptional customer service and fast worldwide shipping. We're committed to making technology accessible to everyone.
        </p>
        <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Quality Promise</h2>
        <p className="text-muted-foreground leading-relaxed">
          Every product in our catalog goes through a multi-step verification process. We test for speed, reliability, and durability before listing anything in our store. If it doesn't meet our standards, we don't sell it.
        </p>
      </div>
    </main>
    <Footer />
  </div>
);

export default About;
