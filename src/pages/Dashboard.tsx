import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, FileText, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const userName = "Samarth";
  const dailyTip = "Start with the most challenging subject when your mind is fresh. Research shows peak cognitive performance occurs 2-4 hours after waking.";

  const quickActions = [
    {
      title: "Generate Study Plan",
      description: "Create a personalized study schedule",
      icon: Calendar,
      href: "/study-planner",
      gradient: "from-primary to-accent",
    },
    {
      title: "Summarize Notes",
      description: "Get AI-powered summaries instantly",
      icon: FileText,
      href: "/summarizer",
      gradient: "from-accent to-primary",
    },
    {
      title: "View Progress",
      description: "Track your learning journey",
      icon: TrendingUp,
      href: "/profile",
      gradient: "from-primary to-primary-glow",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Good to see you again, <span className="gradient-text">{userName}</span>!
          </h1>
          <p className="text-muted-foreground text-lg">Ready to boost your productivity?</p>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link to={action.href}>
                <div className="glass-card p-6 rounded-2xl hover-lift group">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass-card p-6 rounded-2xl bg-gradient-hero"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">Daily AI Tip</h3>
              <p className="text-muted-foreground">{dailyTip}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-3xl font-bold gradient-text mb-1">12</div>
            <div className="text-muted-foreground">Study Plans Created</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-3xl font-bold gradient-text mb-1">24</div>
            <div className="text-muted-foreground">Notes Summarized</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-3xl font-bold gradient-text mb-1">86%</div>
            <div className="text-muted-foreground">Productivity Score</div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
