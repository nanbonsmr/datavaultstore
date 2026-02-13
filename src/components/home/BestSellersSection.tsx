import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const BestSellersSection = () => {
  const bestSellers = products.filter((p) => p.badge === "Best Seller" || p.badge === "Hot").slice(0, 4);

  return (
    <section className="section-padding bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Best Sellers</h2>
            <p className="mt-3 text-muted-foreground">Our most popular storage products</p>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1 text-sm text-primary hover:underline"
          >
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <Link
          to="/shop"
          className="md:hidden mt-8 inline-flex items-center gap-1 text-sm text-primary hover:underline"
        >
          View All Products <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};

export default BestSellersSection;
