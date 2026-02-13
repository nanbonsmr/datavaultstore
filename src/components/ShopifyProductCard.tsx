import { Link } from "react-router-dom";
import { ShoppingCart, Loader2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const ShopifyProductCard = ({ product }: { product: ShopifyProduct }) => {
  const addItem = useCartStore(state => state.addItem);
  const isLoading = useCartStore(state => state.isLoading);
  const { node } = product;
  const price = node.priceRange.minVariantPrice;
  const image = node.images.edges[0]?.node;
  const secondImage = node.images.edges[1]?.node;
  const firstVariant = node.variants.edges[0]?.node;
  const variantCount = node.variants.edges.length;
  const isAvailable = firstVariant?.availableForSale !== false;

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
      <div className="card-glow rounded-xl border border-border bg-card overflow-hidden relative">
        {/* Image with hover swap */}
        <div className="aspect-[4/5] relative bg-secondary/10 overflow-hidden">
          {image ? (
            <>
              <img
                src={image.url}
                alt={image.altText || node.title}
                className={`w-full h-full object-cover transition-all duration-500 ${secondImage ? 'group-hover:opacity-0' : 'group-hover:scale-105'}`}
              />
              {secondImage && (
                <img
                  src={secondImage.url}
                  alt={secondImage.altText || node.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              )}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground/20" />
            </div>
          )}

          {/* Overlay actions */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <Button
              size="sm"
              className="btn-gradient flex-1 gap-1.5 h-9 text-xs"
              onClick={handleAddToCart}
              disabled={isLoading || !firstVariant || !isAvailable}
            >
              {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ShoppingCart className="h-3.5 w-3.5" />}
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-9 w-9 p-0"
            >
              <Eye className="h-3.5 w-3.5" />
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {!isAvailable && (
              <Badge variant="destructive" className="text-[10px] px-2 py-0.5">
                Sold Out
              </Badge>
            )}
            {variantCount > 1 && (
              <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-secondary/90 backdrop-blur-sm">
                {variantCount} variants
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 space-y-2">
          <h3 className="font-heading font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
            {node.title}
          </h3>

          {node.options.length > 0 && node.options[0].name !== "Title" && (
            <div className="flex flex-wrap gap-1">
              {node.options[0].values.slice(0, 3).map((val) => (
                <span key={val} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  {val}
                </span>
              ))}
              {node.options[0].values.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                  +{node.options[0].values.length - 3}
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <span className="text-lg font-heading font-bold text-foreground">
              {price.currencyCode === 'USD' ? '$' : price.currencyCode}{parseFloat(price.amount).toFixed(2)}
            </span>
            {node.images.edges.length > 1 && (
              <div className="flex gap-0.5">
                {node.images.edges.slice(0, 4).map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ShopifyProductCard;
