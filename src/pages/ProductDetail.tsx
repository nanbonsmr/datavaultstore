import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart, Truck, Shield, Clock, ChevronRight, Loader2,
  Package, Check, Zap, CreditCard, ChevronLeft
} from "lucide-react";
import RelatedProducts from "@/components/RelatedProducts";
import ProductReviews from "@/components/ProductReviews";
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
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-8 w-1/3" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
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

  // Parse description into short summary + specs
  const descriptionText = product.description || "";
  const shortDescription = descriptionText.length > 200
    ? descriptionText.slice(0, 200).replace(/\s+\S*$/, "") + "…"
    : descriptionText;

  const navigateImage = (dir: number) => {
    setSelectedImageIdx(prev => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 md:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground truncate max-w-[250px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ─── Image Gallery ─── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/3] md:aspect-square rounded-2xl border border-border overflow-hidden bg-secondary/5 relative group">
              {selectedImage ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.altText || product.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingCart className="h-32 w-32 text-muted-foreground/20" />
                </div>
              )}

              {/* Image Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage(-1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => navigateImage(1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center text-foreground opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-background/70 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-foreground border border-border">
                  {selectedImageIdx + 1} / {images.length}
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {!selectedVariant.availableForSale && (
                  <Badge variant="destructive">Sold Out</Badge>
                )}
              </div>
            </div>

            {/* Thumbnails Row */}
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIdx(i)}
                    className={`w-[72px] h-[72px] flex-shrink-0 rounded-xl border-2 overflow-hidden transition-all duration-200 ${
                      selectedImageIdx === i
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-border hover:border-muted-foreground/50 opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img src={img.url} alt={img.altText || `View ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─── Product Info (Sticky) ─── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Title + Price */}
              <div>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-heading font-bold text-foreground leading-tight">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-4xl font-heading font-bold gradient-text">
                    ${parseFloat(selectedVariant.price.amount).toFixed(2)}
                  </span>
                </div>
                <div className="mt-2">
                  {selectedVariant.availableForSale ? (
                    <span className="inline-flex items-center gap-1.5 text-sm text-accent">
                      <Check className="h-4 w-4" /> In Stock — Ready to Ship
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-sm text-destructive">
                      Currently Unavailable
                    </span>
                  )}
                </div>
              </div>

              {/* Short Description */}
              {shortDescription && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {shortDescription}
                </p>
              )}

              {/* Variant Selector */}
              {hasOptions && (
                <div className="space-y-4">
                  {product.options.map((option) => (
                    <div key={option.name}>
                      <p className="text-sm font-heading font-semibold text-foreground mb-2">
                        {option.name}:{" "}
                        <span className="text-primary">
                          {selectedVariant.selectedOptions.find(o => o.name === option.name)?.value}
                        </span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {variants.map((v, i) => {
                          const optVal = v.selectedOptions.find(o => o.name === option.name)?.value;
                          const firstIdx = variants.findIndex(vv =>
                            vv.selectedOptions.find(o => o.name === option.name)?.value === optVal
                          );
                          if (firstIdx !== i) return null;
                          return (
                            <button
                              key={v.id}
                              onClick={() => setSelectedVariantIdx(i)}
                              className={`px-4 py-2 rounded-lg text-sm border transition-all duration-200 ${
                                selectedVariantIdx === i
                                  ? "border-primary bg-primary/10 text-primary font-medium shadow-sm shadow-primary/20"
                                  : "border-border bg-card text-card-foreground hover:border-primary/50"
                              } ${!v.availableForSale ? "opacity-40 line-through" : ""}`}
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

              <Separator className="bg-border/50" />

              {/* Quantity + Add to Cart */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border rounded-xl bg-card overflow-hidden">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium"
                    >
                      −
                    </button>
                    <span className="px-5 py-3 text-sm font-semibold text-foreground min-w-[3rem] text-center border-x border-border">
                      {qty}
                    </span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    className="btn-gradient flex-1 gap-2 h-[50px] text-base rounded-xl"
                    onClick={handleAddToCart}
                    disabled={cartLoading || !selectedVariant.availableForSale}
                  >
                    {cartLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <ShoppingCart className="h-5 w-5" />
                    )}
                    Add to Cart
                  </Button>
                </div>

                <Button
                  className="w-full h-[50px] text-base rounded-xl gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                  onClick={handleBuyNow}
                  disabled={cartLoading || !selectedVariant.availableForSale}
                >
                  {cartLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="h-5 w-5" />
                      Buy Now — Instant Checkout
                    </>
                  )}
                </Button>
              </div>

              {/* Trust Badges - Compact */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                  { icon: Shield, label: "1-Year Warranty", sub: "Full coverage" },
                  { icon: Clock, label: "30-Day Returns", sub: "No questions asked" },
                  { icon: Zap, label: "Fast Processing", sub: "Ships in 24h" },
                ].map(({ icon: Icon, label, sub }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl bg-card border border-border p-3"
                  >
                    <div className="flex-shrink-0 h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
                      <p className="text-[10px] text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── Full Description Section ─── */}
        {descriptionText.length > 200 && (
          <div className="mt-16 max-w-3xl">
            <h2 className="text-lg md:text-xl font-heading font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              Product Details
            </h2>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {descriptionText}
              </p>
            </div>
          </div>
        )}

        {/* Reviews - hidden for now */}
        {/* <ProductReviews /> */}
        {/* Related Products */}
        <RelatedProducts
          currentHandle={product.handle}
          currentProductType={product.options.find(o => o.name !== "Title")?.name}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
