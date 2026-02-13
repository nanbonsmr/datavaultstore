import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
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
    <section className="section-padding bg-card/50">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-8 md:p-12 text-center">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="relative">
            <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Get 10% Off Your First Order
            </h2>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Subscribe for exclusive deals, new product launches, and tech tips delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                required
              />
              <Button type="submit" className="btn-gradient shrink-0 gap-2">
                Subscribe <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
