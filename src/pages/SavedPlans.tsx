import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SavedPlans = () => {
  const savedPlans = [
    {
      id: 1,
      title: "Mathematics - Calculus",
      date: "2024-11-20",
      preview: "14-day comprehensive study plan for Calculus...",
    },
    {
      id: 2,
      title: "Physics - Quantum Mechanics",
      date: "2024-11-18",
      preview: "30-day advanced study plan for Quantum Mechanics...",
    },
    {
      id: 3,
      title: "Chemistry - Organic Chemistry",
      date: "2024-11-15",
      preview: "21-day intensive study plan for Organic Chemistry...",
    },
  ];

  const handleView = (id: number) => {
    toast.success("Opening study plan...");
  };

  const handleDownload = (id: number) => {
    toast.success("Downloading study plan...");
  };

  const handleDelete = (id: number) => {
    toast.success("Study plan deleted");
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
            <span className="gradient-text">Saved Plans</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Access your previously generated study plans
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover-lift"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gradient-primary">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{plan.title}</h3>
                  <p className="text-sm text-muted-foreground">{plan.date}</p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {plan.preview}
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleView(plan.id)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownload(plan.id)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(plan.id)}
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

export default SavedPlans;
