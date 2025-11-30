import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ViewPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [plan, setPlan] = useState<any>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(`http://localhost:5000/api/plans/${id}`, {
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) setPlan(data.plan);
      else toast.error(data.message || "Failed to load plan");
    };

    fetchPlan();
  }, [id]);

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:5000/api/plans/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Plan deleted");
      navigate("/saved-plans");
    } else {
      toast.error(data.message || "Failed to delete plan");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([plan.plan], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${plan.title}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/saved-plans")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>

        {!plan ? (
          <p className="text-muted-foreground text-center">Loading...</p>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{plan.title}</h1>
                <p className="text-muted-foreground text-sm">
                  {new Date(plan.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
                <Button variant="outline" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </div>

            <pre className="whitespace-pre-wrap text-sm leading-relaxed bg-black/10 p-4 rounded-xl">
              {plan.plan}
            </pre>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ViewPlan;