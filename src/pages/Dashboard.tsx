import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, FileText, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [userName, setUserName] = useState(null);
  const [stats, setStats] = useState({
    plans: 0,
    summaries: 0,
    productivity: 0,
  });

  const navigate = useNavigate();

  const dailyTip =
    "Start with the most challenging subject when your mind is fresh. Research shows peak cognitive performance occurs 2-4 hours after waking.";

  // Fetch profile
  useEffect(() => {
    const controller = new AbortController();

    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          credentials: "include",
          signal: controller.signal,
        });

        if (res.status === 401) return navigate("/login");

        const data = await res.json();
        setUserName(data?.user?.name || "User");
      } catch {
        navigate("/login");
      }
    };

    fetchUser();
    return () => controller.abort();
  }, [navigate]);

  // Fetch user stats (plans, summaries, productivity)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/dashboard/stats", {
          credentials: "include",
        });

        const data = await res.json();

        setStats({
          plans: data.plans || 0,
          summaries: data.summaries || 0,
          productivity: data.productivity || 0,
        });
      } catch (err) {
        console.log("Stats API error:", err);
      }
    };

    fetchStats();
  }, []);

  // Quick Actions
  const quickActions = [
    {
      title: "Generate Study Plan",
      description: "Create a personalized study schedule",
      icon: Calendar,
      href: "/study-planner",
      gradient: "from-primary to-accent",
      disabled: false,
    },
    {
      title: "Summarize Notes",
      description: "Get AI-powered summaries instantly",
      icon: FileText,
      href: "/summarizer",
      gradient: "from-accent to-primary",
      disabled: false,
    },
    {
      title: "View Progress",
      description: "Coming Soon!",
      icon: TrendingUp,
      href: "#", // disabled
      gradient: "from-gray-400 to-gray-300",
      disabled: true,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">
          Good to see you again,{" "}
          <span className="gradient-text">
            {userName === null ? "Loading..." : userName}
          </span>
          !
        </h1>
        <p className="text-muted-foreground text-lg">
          Ready to boost your productivity?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;

          const Card = (
            <div
              className={`glass-card p-6 rounded-2xl group relative 
              ${action.disabled ? "opacity-50 cursor-not-allowed" : "hover-lift"}`}
            >
              {/* Coming Soon Badge */}
              {action.disabled && (
                <span className="absolute top-3 right-3 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full shadow">
                  Coming Soon
                </span>
              )}

              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-4`}
              >
                <Icon className="h-7 w-7 text-white" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
              <p className="text-muted-foreground">{action.description}</p>
            </div>
          );

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {action.disabled ? (
                <div>{Card}</div>
              ) : (
                <Link to={action.href}>{Card}</Link>
              )}
            </motion.div>
          );
        })}
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
          <div>
            <h3 className="text-xl font-semibold mb-2">Daily AI Tip</h3>
            <p className="text-muted-foreground">{dailyTip}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Study Plans Created", value: stats.plans },
          { label: "Notes Summarized", value: stats.summaries },
          { label: "Productivity Score", value: `${stats.productivity}%` },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            className="glass-card p-6 rounded-2xl"
          >
            <div className="text-3xl font-bold gradient-text mb-1">
              {item.value}
            </div>
            <div className="text-muted-foreground">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;