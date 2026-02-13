import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("datavault-cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("datavault-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("datavault-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6 animate-in slide-in-from-bottom duration-500">
      <div className="max-w-2xl mx-auto rounded-xl border border-border bg-card/95 backdrop-blur-lg p-4 md:p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
            <Cookie className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-heading font-semibold text-foreground mb-1">We use cookies</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept," you consent to our use of cookies.{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline">Learn more</Link>
            </p>
            <div className="flex items-center gap-2 mt-3">
              <Button size="sm" className="btn-gradient h-8 text-xs px-4" onClick={accept}>
                Accept All
              </Button>
              <Button size="sm" variant="outline" className="h-8 text-xs px-4 border-border" onClick={decline}>
                Decline
              </Button>
            </div>
          </div>
          <button onClick={decline} className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
