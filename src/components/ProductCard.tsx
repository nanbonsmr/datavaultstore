import { Link } from "react-router-dom";
import { Star, ShoppingCart, HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { type Product, getCategoryColors } from "@/data/products";

const ProductCard = ({ product }: { product: Product }) => {
  const [c1, c2] = getCategoryColors(product.category);

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="card-glow rounded-lg border border-border bg-card overflow-hidden">
        <div
          className="aspect-square relative flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${c1}12, ${c2}12)` }}
        >
          <HardDrive className="h-16 w-16 text-muted-foreground/40 group-hover:text-primary/50 transition-colors" />
          {product.badge && (
            <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] px-2">
              {product.badge}
            </Badge>
          )}
          {product.originalPrice && (
            <Badge variant="secondary" className="absolute top-3 right-3 text-[10px] px-2 text-accent">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>
        <div className="p-4">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">{product.category}</p>
          <h3 className="font-heading font-semibold text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"}`}
              />
            ))}
            <span className="text-[11px] text-muted-foreground ml-1">({product.reviews.toLocaleString()})</span>
          </div>
          {product.capacities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {product.capacities.slice(0, 3).map((cap) => (
                <span key={cap} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
                  {cap}
                </span>
              ))}
              {product.capacities.length > 3 && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">+{product.capacities.length - 3}</span>
              )}
            </div>
          )}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-heading font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-primary hover:bg-primary/10">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
