import { Link } from "react-router-dom";
import { useRecentlyViewedStore } from "@/stores/recentlyViewedStore";
import { Clock } from "lucide-react";

const RecentlyViewed = ({ currentHandle }: { currentHandle?: string }) => {
  const items = useRecentlyViewedStore((s) => s.items);
  const filtered = items.filter((i) => i.handle !== currentHandle);

  if (filtered.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-lg md:text-xl font-heading font-bold text-foreground mb-6 flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        Recently Viewed
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {filtered.slice(0, 6).map((item) => (
          <Link
            key={item.handle}
            to={`/product/${item.handle}`}
            className="flex-shrink-0 w-36 group"
          >
            <div className="aspect-square rounded-lg border border-border bg-card overflow-hidden mb-2">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="text-xs font-heading font-medium text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {item.title}
            </p>
            <p className="text-xs font-bold text-foreground">
              {item.currencyCode === "USD" ? "$" : item.currencyCode}
              {parseFloat(item.price).toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
