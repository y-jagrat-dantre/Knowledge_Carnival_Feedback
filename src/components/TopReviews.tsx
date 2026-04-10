import { FeedbackEntry, getTopReviews, getAverageRating, getTotalReviews } from "@/lib/feedback-store";
import ReviewCard from "./ReviewCard";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

interface TopReviewsProps {
  refreshKey: number;
}

const TopReviews = ({ refreshKey }: TopReviewsProps) => {
  const [reviews, setReviews] = useState<FeedbackEntry[]>([]);
  const [avg, setAvg] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [r, a, t] = await Promise.all([
        getTopReviews(10),
        getAverageRating(),
        getTotalReviews(),
      ]);
      setReviews(r);
      setAvg(a);
      setTotal(t);
    };
    load();
  }, [refreshKey]);

  if (total === 0) return null;

  return (
    <section className="animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground">⭐ Top Reviews</h2>
        <div className="flex items-center justify-center gap-2 mt-3">
          <Star className="h-6 w-6 fill-accent text-accent star-glow" />
          <span className="text-3xl font-bold text-foreground">{avg}</span>
          <span className="text-muted-foreground text-lg">/ 5</span>
          <span className="text-muted-foreground text-sm ml-2">({total} reviews)</span>
        </div>
      </div>

      {reviews.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((entry, i) => (
            <ReviewCard key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No top reviews yet. Be the first to leave a 4★ or 5★ review!</p>
      )}
    </section>
  );
};

export default TopReviews;
