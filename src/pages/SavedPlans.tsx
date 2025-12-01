import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SavedPlans = () => {
  const [plans, setPlans] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/plans/all`, {
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) setPlans(data.plans);
    };

    fetchPlans();
  }, []);

  const handleDelete = async (id: string) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/plans/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Plan deleted");
      setPlans(plans.filter((p) => p._id !== id));
    } else {
      toast.error(data.message);
    }
  };

  const handleDownload = (plan: any) => {
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
          {plans.map((plan, index) => (
            <motion.div
              key={plan._id}
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
                  <p className="text-sm text-muted-foreground">
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {plan.plan.slice(0, 120)}...
              </p>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => navigate(`/saved-plans/${plan._id}`)}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleDownload(plan)}>
                  <Download className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="sm" onClick={() => handleDelete(plan._id)}>
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