import { Link } from "react-router-dom";
import { ShoppingCart, Menu, Search, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
  { label: "FAQ", path: "/faq" },
];

const Header = () => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
    <div className="bg-primary/10 text-center py-1.5 text-xs font-medium text-primary">
      <Zap className="inline h-3 w-3 mr-1" />
      Free Shipping on Orders Over $50 — Limited Time Offer
    </div>
    <div className="container mx-auto flex h-16 items-center justify-between px-4">
      <Link to="/" className="text-xl font-bold font-heading text-foreground tracking-tight">
        Data<span className="text-primary">Vault</span>
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <Search className="h-5 w-5" />
        </Button>
        <Link to="/shop">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              0
            </span>
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-background border-border">
            <nav className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  </header>
);

export default Header;
