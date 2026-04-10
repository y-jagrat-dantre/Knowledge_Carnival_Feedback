import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import StarRating from "./StarRating";
import { FeedbackEntry, saveReview } from "@/lib/feedback-store";
import { generatePDF } from "@/lib/pdf-generator";

interface FeedbackFormProps {
  onSubmit: () => void;
}

const CLASS_GROUPS = [
  { label: "Primary", classes: ["1st", "2nd", "3rd", "4th", "5th"] },
  { label: "Middle", classes: ["6th", "7th", "8th"] },
  { label: "Senior", classes: ["9th", "10th", "11th", "12th"] },
];

const generateId = () => {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9);
};

const FeedbackForm = ({ onSubmit }: FeedbackFormProps) => {
  const { toast } = useToast();
  const [parentName, setParentName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!parentName.trim()) {
      toast({ title: "Parent Name is required", variant: "destructive" });
      return;
    }
    if (!feedback.trim()) {
      toast({ title: "Feedback is required", variant: "destructive" });
      return;
    }
    if (!section) {
      toast({ title: "Please select a section", variant: "destructive" });
      return;
    }
    if (rating === 0) {
      toast({ title: "Please select a rating", variant: "destructive" });
      return;
    }

    setLoading(true);
    const entry: FeedbackEntry = {
      id: generateId(),
      parentName: parentName.trim(),
      studentName: studentName.trim(),
      className,
      section,
      feedback: feedback.trim(),
      rating,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
    };

    try {
      await saveReview(entry);
      generatePDF(entry);
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
        setParentName("");
        setStudentName("");
        setClassName("");
        setSection("");
        setFeedback("");
        setRating(0);
        onSubmit();
      }, 2500);
    } catch (err) {
      toast({ title: "Failed to save review. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-card rounded-xl card-shadow p-10 text-center animate-scale-in">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-secondary">Thank You for Your Feedback!</h3>
        <p className="text-muted-foreground mt-2">Your PDF certificate is downloading...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-xl card-shadow p-6 md:p-8 space-y-5 animate-fade-in">
      <h2 className="text-xl font-semibold text-foreground text-center">📝 Share Your Feedback</h2>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Parent Name <span className="text-destructive">*</span></label>
        <Input value={parentName} onChange={(e) => setParentName(e.target.value)} placeholder="Enter parent name" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Student Name</label>
        <Input value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="Enter student name (optional)" />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Class</label>
        <Select value={className} onValueChange={setClassName}>
          <SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
          <SelectContent>
            {CLASS_GROUPS.map((group) => (
              <SelectGroup key={group.label}>
                <SelectLabel>{group.label}</SelectLabel>
                {group.classes.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Section <span className="text-destructive">*</span></label>
        <Select value={section} onValueChange={setSection}>
          <SelectTrigger><SelectValue placeholder="Select section" /></SelectTrigger>
          <SelectContent>
            {["A", "B", "C", "D", "E"].map((s) => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Feedback <span className="text-destructive">*</span></label>
        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Write your feedback here..." rows={4} />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Rating <span className="text-destructive">*</span></label>
        <StarRating value={rating} onChange={setRating} size={32} />
      </div>

      <Button type="submit" disabled={loading} className="w-full carnival-gradient text-primary-foreground font-semibold text-base py-6 hover:opacity-90 transition-opacity">
        <Send className="mr-2 h-5 w-5" /> {loading ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
};

export default FeedbackForm;
