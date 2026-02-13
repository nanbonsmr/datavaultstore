import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ShoppingCart, X, Search } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ShopifyProductCard from "@/components/ShopifyProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("popular");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const searchQuery = searchParams.get("query") || undefined;
  const { data: products, isLoading } = useShopifyProducts(50, searchQuery);

  // Extract unique product types and tags from loaded products
  const { productTypes, allTags } = useMemo(() => {
    if (!products) return { productTypes: [] as string[], allTags: [] as string[] };
    const types = new Set<string>();
    const tags = new Set<string>();
    products.forEach((p) => {
      // Product type from options or variant grouping
      if (p.node.options) {
        p.node.options.forEach((opt) => {
          if (opt.name !== "Title") types.add(opt.name);
        });
      }
      // Use option values as pseudo-tags for filtering
      p.node.options.forEach((opt) => {
        if (opt.name !== "Title") {
          opt.values.forEach((v) => tags.add(v));
        }
      });
    });
    return { productTypes: Array.from(types), allTags: Array.from(tags) };
  }, [products]);

  const filtered = useMemo(() => {
    if (!products) return [];
    let list = [...products];

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.node.title.toLowerCase().includes(term) ||
          p.node.description.toLowerCase().includes(term)
      );
    }

    // Type filter (option name)
    if (selectedType) {
      list = list.filter((p) =>
        p.node.options.some((opt) => opt.name === selectedType)
      );
    }

    // Tag filter (option values)
    if (selectedTags.length > 0) {
      list = list.filter((p) =>
        selectedTags.every((tag) =>
          p.node.options.some((opt) => opt.values.includes(tag))
        )
      );
    }

    // Sort
    switch (sortBy) {
      case "price-low":
        list.sort(
          (a, b) =>
            parseFloat(a.node.priceRange.minVariantPrice.amount) -
            parseFloat(b.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "price-high":
        list.sort(
          (a, b) =>
            parseFloat(b.node.priceRange.minVariantPrice.amount) -
            parseFloat(a.node.priceRange.minVariantPrice.amount)
        );
        break;
      case "name-az":
        list.sort((a, b) => a.node.title.localeCompare(b.node.title));
        break;
      case "name-za":
        list.sort((a, b) => b.node.title.localeCompare(a.node.title));
        break;
      default:
        break;
    }
    return list;
  }, [products, sortBy, searchTerm, selectedType, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters = selectedType || selectedTags.length > 0 || searchTerm;

  const clearAllFilters = () => {
    setSelectedType(null);
    setSelectedTags([]);
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Shop All Products
          </h1>
          <p className="mt-2 text-muted-foreground">
            {isLoading
              ? "Loading products..."
              : `${filtered.length} product${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-card border-border"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 bg-card border-border text-sm">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Default</SelectItem>
              <SelectItem value="price-low">Price: Low → High</SelectItem>
              <SelectItem value="price-high">Price: High → Low</SelectItem>
              <SelectItem value="name-az">Name: A → Z</SelectItem>
              <SelectItem value="name-za">Name: Z → A</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filters */}
        {(productTypes.length > 0 || allTags.length > 0) && (
          <div className="mb-6 space-y-3">
            {/* Type filter */}
            {productTypes.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                  Category:
                </span>
                <button
                  onClick={() => setSelectedType(null)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    !selectedType
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                  }`}
                >
                  All
                </button>
                {productTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setSelectedType(selectedType === type ? null : type)
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedType === type
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-secondary text-secondary-foreground hover:border-primary/50"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}

            {/* Tag filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                  Filter:
                </span>
                {allTags.slice(0, 12).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                      selectedTags.includes(tag)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-secondary text-secondary-foreground hover:border-accent/50"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Active filters summary */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs text-muted-foreground">Active:</span>
                {searchTerm && (
                  <Badge
                    variant="secondary"
                    className="text-xs gap-1 cursor-pointer hover:bg-destructive/20"
                    onClick={() => setSearchTerm("")}
                  >
                    "{searchTerm}" <X className="h-3 w-3" />
                  </Badge>
                )}
                {selectedType && (
                  <Badge
                    variant="secondary"
                    className="text-xs gap-1 cursor-pointer hover:bg-destructive/20"
                    onClick={() => setSelectedType(null)}
                  >
                    {selectedType} <X className="h-3 w-3" />
                  </Badge>
                )}
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs gap-1 cursor-pointer hover:bg-destructive/20"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag} <X className="h-3 w-3" />
                  </Badge>
                ))}
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-primary hover:underline ml-1"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-border bg-card overflow-hidden"
              >
                <Skeleton className="aspect-[4/5]" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ShopifyProductCard key={p.node.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-heading">No products found</p>
            {hasActiveFilters ? (
              <Button
                variant="link"
                className="mt-2 text-primary"
                onClick={clearAllFilters}
              >
                Clear all filters
              </Button>
            ) : (
              <p className="text-sm mt-2">
                Products will appear here once added to the store. Tell me what
                products you'd like to create!
              </p>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
