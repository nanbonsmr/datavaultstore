import { useState } from "react";
import { Mail, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({ title: "Subscribed!", description: "You'll receive our best deals and tech news." });
      setEmail("");
    }
  };

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl glass p-8 md:p-14 text-center noise-overlay">
          {/* Glow orbs */}
          <div className="glow-orb glow-orb-primary w-[300px] h-[300px] -top-20 -left-20" />
          <div className="glow-orb glow-orb-accent w-[250px] h-[250px] -bottom-20 -right-20" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Exclusive Offer</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Get <span className="gradient-text">10% Off</span> Your First Order
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto leading-relaxed">
              Subscribe for exclusive deals, new product launches, and tech tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-secondary/50 border-border text-foreground rounded-xl placeholder:text-muted-foreground"
                  required
                />
              </div>
              <Button type="submit" className="btn-gradient shrink-0 gap-2 h-12 px-6 rounded-xl font-bold">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-xs text-muted-foreground">No spam. Unsubscribe anytime. 🔒</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
