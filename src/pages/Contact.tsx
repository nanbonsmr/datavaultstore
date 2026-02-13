import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-heading font-bold text-foreground text-center">Contact Us</h1>
          <p className="mt-3 text-muted-foreground text-center">We'd love to hear from you. Our team responds within 24 hours.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Mail, label: "Email", value: "support@datavault.store" },
              { icon: Phone, label: "Phone", value: "+1 (800) 555-0199" },
              { icon: MapPin, label: "Shipping", value: "Worldwide Delivery" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-6 text-center">
                <item.icon className="h-6 w-6 text-primary" />
                <p className="font-heading font-semibold text-sm text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-12 max-w-lg mx-auto space-y-4">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="bg-card border-border text-foreground"
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="bg-card border-border text-foreground"
              required
            />
            <Textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="bg-card border-border text-foreground min-h-[120px]"
              required
            />
            <Button type="submit" className="btn-gradient w-full">Send Message</Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
