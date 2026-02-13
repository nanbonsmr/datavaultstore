import { Star, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const ProductReviews = () => {
  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-heading font-bold text-foreground flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Customer Reviews
        </h2>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
        {/* Summary Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          <div className="text-center">
            <p className="text-5xl font-heading font-bold text-foreground">0.0</p>
            <div className="flex gap-0.5 mt-2 justify-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-muted-foreground/30" />
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">0 reviews</p>
          </div>

          <Separator orientation="vertical" className="hidden sm:block h-20 bg-border" />
          <Separator className="sm:hidden bg-border" />

          {/* Rating Breakdown */}
          <div className="flex-1 w-full space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8 text-right">{stars} ★</span>
                <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary/30" style={{ width: "0%" }} />
                </div>
                <span className="text-xs text-muted-foreground w-6">0</span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Empty State */}
        <div className="text-center py-8">
          <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-7 w-7 text-muted-foreground/40" />
          </div>
          <p className="text-foreground font-heading font-semibold">No reviews yet</p>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            Be the first to share your experience with this product. Reviews help other customers make better decisions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
