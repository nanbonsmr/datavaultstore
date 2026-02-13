import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sarah M.", role: "Content Creator", rating: 5, text: "The VoltSSD is incredibly fast. Editing 4K footage directly from it is buttery smooth. Best investment for my workflow!", avatar: "SM" },
  { name: "James L.", role: "IT Professional", rating: 5, text: "Ordered the USB hub and card reader combo. Both arrived quickly and work flawlessly. Great build quality for the price.", avatar: "JL" },
  { name: "Priya K.", role: "Student", rating: 4, text: "Perfect flash drive for university. Affordable, fast enough for my needs, and the metal build feels premium. Highly recommend!", avatar: "PK" },
];

const ReviewsSection = () => (
  <section className="section-padding bg-card/50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Customers Say</h2>
        <p className="mt-3 text-muted-foreground">Real reviews from real people</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="rounded-lg border border-border bg-card p-6 relative">
            <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
            <div className="flex items-center gap-0.5 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < r.rating ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{r.text}</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {r.avatar}
              </div>
              <div>
                <p className="font-heading font-semibold text-sm text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ReviewsSection;
