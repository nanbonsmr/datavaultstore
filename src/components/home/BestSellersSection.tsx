import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Skeleton } from "@/components/ui/skeleton";

const BestSellersSection = () => {
  const { data: products, isLoading } = useShopifyProducts(4);

  return (
    <section className="section-padding bg-secondary/20 relative overflow-hidden">
      <div className="glow-orb glow-orb-accent w-[400px] h-[400px] -top-40 right-0" />

      <div className="container mx-auto px-4 relative">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-3">Trending</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Best Sellers</h2>
            <p className="mt-3 text-muted-foreground">Our most popular USB storage & equipment</p>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group"
          >
            View All <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
                <Skeleton className="aspect-square" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
              <ShopifyProductCard key={p.node.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-heading">No products yet</p>
            <p className="text-sm mt-2">Products will appear here once added to the store.</p>
          </div>
        )}

        <Link
          to="/shop"
          className="md:hidden mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
        >
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default BestSellersSection;
