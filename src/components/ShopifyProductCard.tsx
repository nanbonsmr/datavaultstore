import { Link } from "react-router-dom";
import { ShoppingCart, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ShopifyProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  const firstVariant = node.variants.edges[0]?.node;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;
    await addItem({
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || [],
    });
    toast.success(`${node.title} added to cart`);
  };

  return (
    <Link to={`/product/${node.handle}`} className="group block">
      <div className="card-glow rounded-lg border border-border bg-card overflow-hidden">
        <div className="aspect-square relative bg-secondary/10 flex items-center justify-center overflow-hidden">
          {image ? (
            <img src={image.url} alt={image.altText || node.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          ) : (
            <ShoppingCart className="h-16 w-16 text-muted-foreground/30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="font-heading font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {node.title}
          </h3>
          {node.options.length > 0 && node.options[0].name !== "Title" && (
            <div className="flex flex-wrap gap-1 mt-2">
              {node.options[0].values.slice(0, 3).map((val) => (
                <span key={val} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                  {val}
                </span>
              ))}
              {node.options[0].values.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">+{node.options[0].values.length - 3}</span>
              )}
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-heading font-bold text-foreground">
              {price.currencyCode === 'USD' ? '$' : price.currencyCode}{parseFloat(price.amount).toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-primary hover:bg-primary/10"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShoppingCart className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;
