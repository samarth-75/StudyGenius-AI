import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SingleSummary = () => {
  const { id } = useParams();
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/summary/${id}`, {
          credentials: "include",
        });

        const data = await res.json();
        if (res.ok) setSummary(data.summary);
        else toast.error(data.message);
      } catch (err) {
        toast.error("Error loading summary");
      }
    };

    fetchSummary();
  }, [id]);

  if (!summary) return <DashboardLayout>Loading...</DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-6"
        >
          {summary.title || "Summary"}
        </motion.h1>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-muted-foreground">{summary.summary}</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Key Points</h2>
            <ul className="space-y-2">
              {summary.bulletPoints.map((p: string, i: number) => (
                <li key={i}>• {p}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Key Terms</h2>
            <div className="flex flex-wrap gap-2">
              {summary.keyTerms.map((t: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">Flashcards</h2>
            {summary.flashcards.map((card: any, i: number) => (
              <div key={i} className="p-4 rounded-xl bg-secondary/50 mb-3">
                <p><strong>Q:</strong> {card.question}</p>
                <p><strong>A:</strong> {card.answer}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SingleSummary;