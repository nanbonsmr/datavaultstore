import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ShoppingCart, Truck, Shield, Clock, ChevronRight, HardDrive, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ProductCard";
import { products, getCategoryColors } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [selectedCapacity, setSelectedCapacity] = useState(0);
  const [qty, setQty] = useState(1);
  const { toast } = useToast();

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-heading font-bold text-foreground">Product Not Found</h1>
          <Link to="/shop" className="text-primary hover:underline mt-4 inline-block">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const [c1, c2] = getCategoryColors(product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground">{product.category}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div
            className="aspect-square rounded-2xl border border-border flex items-center justify-center relative"
            style={{ background: `linear-gradient(135deg, ${c1}10, ${c2}10)` }}
          >
            <HardDrive className="h-32 w-32 text-muted-foreground/30" />
            {product.badge && (
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">{product.badge}</Badge>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">{product.category}</p>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{product.name}</h1>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">{product.rating} ({product.reviews.toLocaleString()} reviews)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-heading font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <Badge variant="secondary" className="text-accent">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Capacity Selector */}
            {product.capacities.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-heading font-semibold text-foreground mb-3">Storage Capacity</p>
                <div className="flex flex-wrap gap-2">
                  {product.capacities.map((cap, i) => (
                    <button
                      key={cap}
                      onClick={() => setSelectedCapacity(i)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                        selectedCapacity === i
                          ? "border-primary bg-primary/10 text-primary font-medium"
                          : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + CTA */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 text-muted-foreground hover:text-foreground">-</button>
                <span className="px-4 py-2 text-sm font-medium text-foreground">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground">+</button>
              </div>
              <Button
                className="btn-gradient flex-1 gap-2 h-11"
                onClick={() => toast({ title: "Added to cart!", description: `${product.name} × ${qty}` })}
              >
                <ShoppingCart className="h-4 w-4" /> Add to Cart
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full mt-3 h-11"
              onClick={() => toast({ title: "Buy Now", description: "Checkout coming with Shopify integration." })}
            >
              Buy Now
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border p-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-[11px] text-muted-foreground text-center">{product.shippingDays} days shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border p-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-[11px] text-muted-foreground text-center">1-Year Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border p-3">
                <Clock className="h-5 w-5 text-primary" />
                <span className="text-[11px] text-muted-foreground text-center">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="mt-16">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="usecases">Use Cases</TabsTrigger>
          </TabsList>
          <TabsContent value="specs" className="mt-6">
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              {Object.entries(product.specs).map(([key, val], i) => (
                <div key={key} className={`flex justify-between px-6 py-3 text-sm ${i % 2 === 0 ? "bg-card" : "bg-secondary/30"}`}>
                  <span className="text-muted-foreground">{key}</span>
                  <span className="text-foreground font-medium">{val}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="usecases" className="mt-6">
            <div className="flex flex-wrap gap-3">
              {product.useCases.map((uc) => (
                <div key={uc} className="rounded-lg border border-border bg-card px-6 py-4">
                  <span className="text-sm text-foreground font-medium">{uc}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
