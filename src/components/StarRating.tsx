import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
  size?: number;
}

const StarRating = ({ value, onChange, readonly = false, size = 28 }: StarRatingProps) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readonly && setHover(star)}
          onMouseLeave={() => !readonly && setHover(0)}
          className={`transition-all duration-200 ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110"
          } ${(hover || value) >= star ? "star-glow" : ""}`}
        >
          <Star
            size={size}
            className={`transition-colors duration-200 ${
              (hover || value) >= star
                ? "fill-accent text-accent"
                : "fill-transparent text-muted-foreground/40"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
