import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("category") || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = selectedCategory === "All" ? [...products] : products.filter((p) => p.category === selectedCategory);
    switch (sortBy) {
      case "price-low": result.sort((a, b) => a.price - b.price); break;
      case "price-high": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      default: result.sort((a, b) => b.reviews - a.reviews);
    }
    return result;
  }, [selectedCategory, sortBy]);

  const handleCategory = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === "All") { searchParams.delete("category"); } else { searchParams.set("category", cat); }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Shop All Products</h1>
          <p className="mt-2 text-muted-foreground">{filtered.length} products found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <h3 className="font-heading font-semibold text-foreground mb-4">Categories</h3>
            <div className="space-y-1">
              {["All", ...categories].map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </Button>
            {selectedCategory !== "All" && (
              <Button variant="secondary" size="sm" onClick={() => handleCategory("All")} className="gap-1 text-xs">
                {selectedCategory} <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="lg:hidden flex flex-wrap gap-2">
              {["All", ...categories].map((cat) => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => { handleCategory(cat); setShowFilters(false); }}
                  className="text-xs"
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}

          <div className="flex-1">
            <div className="flex justify-end mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-card border-border text-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-muted-foreground">
                <p className="text-lg font-heading">No products found</p>
                <p className="text-sm mt-2">Try a different category or filter</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
