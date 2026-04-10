import { FeedbackEntry } from "@/lib/feedback-store";
import StarRating from "./StarRating";

const ReviewCard = ({ entry, index }: { entry: FeedbackEntry; index: number }) => {
  return (
    <div
      className="bg-card rounded-xl card-shadow p-5 hover:card-shadow-hover transition-all duration-300 hover:-translate-y-1 review-card-enter"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full carnival-gradient flex items-center justify-center text-primary-foreground font-bold text-lg">
            {entry.parentName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-foreground">{entry.parentName}</p>
            <p className="text-xs text-muted-foreground">
              {entry.className && `Class ${entry.className}`}{entry.section && ` (${entry.section})`}{(entry.className || entry.section) && ` · `}{entry.date}
            </p>
          </div>
        </div>
        <StarRating value={entry.rating} readonly size={16} />
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{entry.feedback}</p>
    </div>
  );
};

export default ReviewCard;
