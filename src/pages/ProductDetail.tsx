import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Truck, Shield, Clock, ChevronRight, Loader2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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

  const variants = product.variants.edges.map(e => e.node);
  const selectedVariant = variants[selectedVariantIdx] || variants[0];
  const image = product.images.edges[0]?.node;
  const hasOptions = product.options.length > 0 && product.options[0].name !== "Title";

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleBuyNow = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: qty,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    const checkoutUrl = useCartStore.getState().getCheckoutUrl();
    if (checkoutUrl) window.open(checkoutUrl, '_blank');
  };

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
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-2xl border border-border overflow-hidden bg-secondary/10 flex items-center justify-center">
            {image ? (
              <img src={image.url} alt={image.altText || product.title} className="w-full h-full object-cover" />
            ) : (
              <ShoppingCart className="h-32 w-32 text-muted-foreground/20" />
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{product.title}</h1>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl font-heading font-bold text-foreground">
                ${parseFloat(selectedVariant.price.amount).toFixed(2)}
              </span>
              {!selectedVariant.availableForSale && (
                <Badge variant="secondary">Out of Stock</Badge>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Variant Selector */}
            {hasOptions && (
              <div className="mt-6 space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <p className="text-sm font-heading font-semibold text-foreground mb-3">{option.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v, i) => {
                        const optVal = v.selectedOptions.find(o => o.name === option.name)?.value;
                        // Deduplicate — only show first variant per option value
                        const firstIdx = variants.findIndex(vv => vv.selectedOptions.find(o => o.name === option.name)?.value === optVal);
                        if (firstIdx !== i) return null;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariantIdx(i)}
                            className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                              selectedVariantIdx === i
                                ? "border-primary bg-primary/10 text-primary font-medium"
                                : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                            }`}
                          >
                            {optVal}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
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
                onClick={handleAddToCart}
                disabled={cartLoading || !selectedVariant.availableForSale}
              >
                {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                Add to Cart
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full mt-3 h-11"
              onClick={handleBuyNow}
              disabled={cartLoading || !selectedVariant.availableForSale}
            >
              {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now"}
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div className="flex flex-col items-center gap-1 rounded-lg bg-card border border-border p-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-[11px] text-muted-foreground text-center">Fast Shipping</span>
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
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
