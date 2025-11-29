import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SavedSummaries = () => {
  const savedSummaries = [
    {
      id: 1,
      title: "Chapter 5: Thermodynamics",
      date: "2024-11-22",
      preview: "Summary of key concepts including entropy, enthalpy...",
    },
    {
      id: 2,
      title: "Lecture Notes: World War II",
      date: "2024-11-21",
      preview: "Comprehensive summary of WWII causes and effects...",
    },
    {
      id: 3,
      title: "Biology: Cell Structure",
      date: "2024-11-19",
      preview: "Detailed breakdown of cellular components and functions...",
    },
  ];

  const handleView = (id: number) => {
    toast.success("Opening summary...");
  };

  const handleDownload = (id: number) => {
    toast.success("Downloading summary...");
  };

  const handleDelete = (id: number) => {
    toast.success("Summary deleted");
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            <span className="gradient-text">Saved Summaries</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Access your previously generated summaries
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedSummaries.map((summary, index) => (
            <motion.div
              key={summary.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-lift"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <FileText className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{summary.title}</h3>
                  <p className="text-sm text-muted-foreground">{summary.date}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {summary.preview}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(summary.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(summary.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(summary.id)}
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
