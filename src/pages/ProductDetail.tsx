import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingCart, Truck, Shield, Clock, ChevronRight, Loader2, Package, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useShopifyProduct } from "@/hooks/useShopifyProducts";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id: handle } = useParams();
  const { data: product, isLoading } = useShopifyProduct(handle || "");
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const addItem = useCartStore(state => state.addItem);
  const cartLoading = useCartStore(state => state.isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-3">
              <Skeleton className="aspect-square rounded-2xl" />
              <div className="flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="w-20 h-20 rounded-lg" />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
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
  const images = product.images.edges.map(e => e.node);
  const selectedImage = images[selectedImageIdx] || images[0];
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
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
          {/* Image Gallery */}
          <div className="space-y-3">
            {/* Main Image */}
            <div className="aspect-square rounded-2xl border border-border overflow-hidden bg-secondary/10 relative group">
              {selectedImage ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.altText || product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-32 w-32 text-muted-foreground/20" />
                </div>
              )}
              {!selectedVariant.availableForSale && (
                <Badge variant="destructive" className="absolute top-4 left-4">Sold Out</Badge>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                      selectedImageIdx === i
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-border hover:border-muted-foreground/50 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.altText || `${product.title} ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground leading-tight">
                {product.title}
              </h1>
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-heading font-bold gradient-text">
                  ${parseFloat(selectedVariant.price.amount).toFixed(2)}
                </span>
                {selectedVariant.availableForSale ? (
                  <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20">
                    <Check className="h-3 w-3 mr-1" /> In Stock
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            <Separator className="bg-border" />

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-sm font-heading font-semibold text-foreground mb-2">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Variant Selector */}
            {hasOptions && (
              <div className="space-y-4">
                {product.options.map((option) => (
                  <div key={option.name}>
                    <p className="text-sm font-heading font-semibold text-foreground mb-3">
                      {option.name}: <span className="text-primary">{selectedVariant.selectedOptions.find(o => o.name === option.name)?.value}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {variants.map((v, i) => {
                        const optVal = v.selectedOptions.find(o => o.name === option.name)?.value;
                        const firstIdx = variants.findIndex(vv => vv.selectedOptions.find(o => o.name === option.name)?.value === optVal);
                        if (firstIdx !== i) return null;
                        return (
                          <button
                            key={v.id}
                            onClick={() => setSelectedVariantIdx(i)}
                            className={`px-4 py-2.5 rounded-lg text-sm border transition-all duration-200 ${
                              selectedVariantIdx === i
                                ? "border-primary bg-primary/10 text-primary font-medium shadow-sm shadow-primary/20"
                                : "border-border bg-secondary text-secondary-foreground hover:border-primary/50 hover:bg-secondary/80"
                            } ${!v.availableForSale ? "opacity-50 line-through" : ""}`}
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
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-lg bg-secondary/50">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="px-5 py-2.5 text-sm font-medium text-foreground min-w-[3rem] text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-4 py-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button
                  className="btn-gradient flex-1 gap-2 h-12 text-base"
                  onClick={handleAddToCart}
                  disabled={cartLoading || !selectedVariant.availableForSale}
                >
                  {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
                  Add to Cart
                </Button>
              </div>

              <Button
                variant="outline"
                className="w-full h-12 text-base border-primary/30 text-primary hover:bg-primary/10"
                onClick={handleBuyNow}
                disabled={cartLoading || !selectedVariant.availableForSale}
              >
                {cartLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now — Checkout Instantly"}
              </Button>
            </div>

            <Separator className="bg-border" />

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Truck, label: "Fast Shipping", sub: "2-5 business days" },
                { icon: Shield, label: "1-Year Warranty", sub: "Full coverage" },
                { icon: Clock, label: "30-Day Returns", sub: "Hassle-free" },
                { icon: Package, label: "Secure Package", sub: "Protected delivery" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 rounded-xl bg-secondary/50 border border-border p-3 text-center">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-[11px] font-medium text-foreground">{label}</span>
                  <span className="text-[10px] text-muted-foreground">{sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
