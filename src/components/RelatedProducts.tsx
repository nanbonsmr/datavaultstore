import { useMemo } from "react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ShopifyProduct } from "@/lib/shopify";

interface RelatedProductsProps {
  currentHandle: string;
  currentProductType?: string;
}

const RelatedProducts = ({ currentHandle, currentProductType }: RelatedProductsProps) => {
  const { data: products, isLoading } = useShopifyProducts(20);

  const related = useMemo(() => {
    if (!products) return [];
    // Exclude current product, then prefer same product type
    const others = products.filter((p) => p.node.handle !== currentHandle);
    if (currentProductType) {
      const sameType = others.filter((p) =>
        p.node.options.some((opt) => opt.name === currentProductType)
      );
      if (sameType.length >= 4) return sameType.slice(0, 4);
    }
    return others.slice(0, 4);
  }, [products, currentHandle, currentProductType]);

  if (isLoading) {
    return (
      <section className="mt-16">
        <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border bg-card overflow-hidden">
              <Skeleton className="aspect-[4/5]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-xl md:text-2xl font-heading font-bold text-foreground mb-6">
        You May Also Like
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {related.map((p) => (
          <ShopifyProductCard key={p.node.id} product={p} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
