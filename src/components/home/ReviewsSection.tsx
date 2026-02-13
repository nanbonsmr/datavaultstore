import { Star, Quote } from "lucide-react";

const reviews = [
  { name: "Sarah M.", role: "Content Creator", rating: 5, text: "The VoltSSD is incredibly fast. Editing 4K footage directly from it is buttery smooth. Best investment for my workflow!", avatar: "SM" },
  { name: "James L.", role: "IT Professional", rating: 5, text: "Ordered the USB hub and card reader combo. Both arrived quickly and work flawlessly. Great build quality for the price.", avatar: "JL" },
  { name: "Priya K.", role: "Student", rating: 4, text: "Perfect flash drive for university. Affordable, fast enough for my needs, and the metal build feels premium. Highly recommend!", avatar: "PK" },
];

const ReviewsSection = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="glow-orb glow-orb-purple w-[300px] h-[300px] top-0 left-1/4" />

    <div className="container mx-auto px-4 relative">
      <div className="text-center mb-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-3">Testimonials</p>
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">What Our Customers Say</h2>
        <p className="mt-3 text-muted-foreground">Real reviews from real people</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {reviews.map((r, i) => (
          <div
            key={r.name}
            className="group relative rounded-2xl glass p-6 hover:border-primary/20 transition-all duration-500 animate-fade-up"
            style={{ animationDelay: `${i * 0.1}s` }}
          >
            <Quote className="absolute top-5 right-5 h-10 w-10 text-primary/5 group-hover:text-primary/10 transition-colors" />
            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  className={`h-4 w-4 ${idx < r.rating ? "fill-accent text-accent" : "text-muted"}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{r.text}</p>
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-bold gradient-text">
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
