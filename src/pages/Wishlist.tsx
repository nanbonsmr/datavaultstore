import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, Loader2, ChevronRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useCartStore } from "@/stores/cartStore";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const Wishlist = () => {
  const handles = useWishlistStore((s) => s.handles);
  const toggle = useWishlistStore((s) => s.toggle);
  const clear = useWishlistStore((s) => s.clear);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  // Fetch all products, then filter by wishlisted handles
  const { data: allProducts, isLoading } = useShopifyProducts(50);
  const wishlistProducts = allProducts?.filter((p) => handles.includes(p.node.handle)) || [];

  const handleAddToCart = async (product: (typeof wishlistProducts)[0]) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
    toast.success(`${product.node.title} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead title="Wishlist" description="Your saved products at DataVault." />
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Wishlist</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">My Wishlist</h1>
            <p className="mt-2 text-muted-foreground">
              {handles.length === 0
                ? "You haven't saved any products yet."
                : `${handles.length} saved product${handles.length !== 1 ? "s" : ""}`}
            </p>
          </div>
          {handles.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              className="border-border text-muted-foreground hover:text-destructive hover:border-destructive/50"
              onClick={() => {
                clear();
                toast.success("Wishlist cleared");
              }}
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Clear All
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : handles.length === 0 ? (
          <div className="text-center py-20">
            <div className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-foreground mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Browse our store and tap the heart icon on products you love to save them here.
            </p>
            <Link to="/shop">
              <Button className="btn-gradient gap-2">
                <ShoppingCart className="h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => {
              const { node } = product;
              const image = node.images.edges[0]?.node;
              const price = node.priceRange.minVariantPrice;
              const variant = node.variants.edges[0]?.node;
              const isAvailable = variant?.availableForSale !== false;

              return (
                <div key={node.handle} className="rounded-xl border border-border bg-card overflow-hidden group">
                  <Link to={`/product/${node.handle}`} className="block">
                    <div className="aspect-square relative bg-secondary/10 overflow-hidden">
                      {image ? (
                        <img
                          src={image.url}
                          alt={image.altText || node.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingCart className="h-16 w-16 text-muted-foreground/20" />
                        </div>
                      )}
                      {!isAvailable && (
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-medium bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full">
                            Sold Out
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-4 space-y-3">
                    <Link to={`/product/${node.handle}`}>
                      <h3 className="font-heading font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {node.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-heading font-bold text-foreground">
                        {price.currencyCode === "USD" ? "$" : price.currencyCode}
                        {parseFloat(price.amount).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="btn-gradient flex-1 gap-1.5 h-9 text-xs"
                        onClick={() => handleAddToCart(product)}
                        disabled={cartLoading || !isAvailable}
                      >
                        {cartLoading ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <ShoppingCart className="h-3.5 w-3.5" />
                        )}
                        Add to Cart
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 w-9 p-0 border-border text-red-500 hover:bg-red-500/10 hover:border-red-500/30"
                        onClick={() => {
                          toggle(node.handle);
                          toast.success("Removed from wishlist");
                        }}
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Show placeholders for handles not yet loaded */}
            {handles
              .filter((h) => !wishlistProducts.some((p) => p.node.handle === h))
              .map((h) => (
                <div key={h} className="rounded-xl border border-border bg-card overflow-hidden p-4 text-center">
                  <div className="aspect-square flex items-center justify-center bg-secondary/10 rounded-lg mb-3">
                    <Heart className="h-8 w-8 text-muted-foreground/20" />
                  </div>
                  <p className="text-xs text-muted-foreground">Product unavailable</p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 text-xs text-muted-foreground"
                    onClick={() => toggle(h)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
