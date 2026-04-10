import { useState } from "react";
import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";
import TopReviews from "@/components/TopReviews";

const Index = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container max-w-3xl py-10 space-y-12 px-4">
        <FeedbackForm onSubmit={() => setRefreshKey((k) => k + 1)} />
        <TopReviews refreshKey={refreshKey} />
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        © 2026 Sanmati Higher Secondary School — Knowledge Carnival
      </footer>
    </div>
  );
};

export default Index;
