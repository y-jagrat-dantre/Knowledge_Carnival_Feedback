import { supabase } from "@/integrations/supabase/client";

export interface FeedbackEntry {
  id: string;
  parentName: string;
  studentName: string;
  className: string;
  section: string;
  feedback: string;
  rating: number;
  date: string;
}

export async function saveReview(entry: FeedbackEntry): Promise<void> {
  const { error } = await supabase.from("reviews").insert({
    parent_name: entry.parentName,
    student_name: entry.studentName || null,
    class: entry.className || null,
    section: entry.section || null,
    feedback: entry.feedback,
    rating: entry.rating,
  });
  if (error) throw error;
}

export async function getTopReviews(limit = 10): Promise<FeedbackEntry[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .gte("rating", 4)
    .order("rating", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function getAverageRating(): Promise<number> {
  const { data, error } = await supabase.from("reviews").select("rating");
  if (error || !data || data.length === 0) return 0;
  const sum = data.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / data.length) * 10) / 10;
}

export async function getTotalReviews(): Promise<number> {
  const { count, error } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true });
  if (error) return 0;
  return count || 0;
}

function mapRow(row: any): FeedbackEntry {
  return {
    id: row.id,
    parentName: row.parent_name,
    studentName: row.student_name || "",
    className: row.class || "",
    section: row.section || "",
    feedback: row.feedback,
    rating: row.rating,
    date: new Date(row.created_at).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };
}
