import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SavedSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummaries = async () => {
      const res = await fetch("http://localhost:5000/api/summary/all", {
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) setSummaries(data.summaries);
    };

    fetchSummaries();
  }, []);

  // VIEW SUMMARY
  const handleView = (id: string) => {
    navigate(`/summary/${id}`);
  };

  // DELETE SUMMARY
  const handleDelete = async (id: string) => {
    const res = await fetch(`http://localhost:5000/api/summary/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      setSummaries((prev) => prev.filter((item) => item._id !== id));
      toast.success("Summary deleted");
    } else {
      toast.error(data.message);
    }
  };

  // DOWNLOAD PDF
  const handleDownload = async (summary: any) => {
    const fileContent = `
Summary:
${summary.summary}

Key Points:
${summary.bulletPoints.join("\n")}

Key Terms:
${summary.keyTerms.join(", ")}

Flashcards:
${summary.flashcards
  .map((fc: any) => `Q: ${fc.question}\nA: ${fc.answer}\n`)
  .join("\n")}
    `;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${summary.title || "summary"}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 gradient-text">
          Saved Summaries
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaries.map((summary: any, index: number) => (
            <motion.div
              key={summary._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-lift"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <FileText className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">
                    {summary.title || "Untitled Summary"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(summary.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-sm line-clamp-2 text-muted-foreground mb-4">
                {summary.summary}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="sm"
                  onClick={() => handleView(summary._id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(summary)}
                >
                  <Download className="h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(summary._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SavedSummaries;