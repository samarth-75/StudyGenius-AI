import { Navbar } from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, Brain, Sparkles, TrendingUp, FileText, Calendar, CheckCircle2, Github, Twitter, Linkedin } from "lucide-react";
import heroIllustration from "@/assets/hero-illustration.jpg";
import { motion } from "framer-motion";

const Landing = () => {
  const features = [
    {
      icon: Calendar,
      title: "AI Study Planner",
      description: "Create personalized study schedules based on your subjects, difficulty, and time availability."
    },
    {
      icon: FileText,
      title: "Notes Summarizer",
      description: "Upload or paste your notes and get concise summaries with key points and flashcards."
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Get AI-powered suggestions for optimal study methods and resource allocation."
    },
    {
      icon: TrendingUp,
      title: "Productivity Dashboard",
      description: "Track your progress, view analytics, and stay motivated with daily insights."
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Enter subjects or upload notes",
      description: "Provide your study materials or course information"
    },
    {
      number: "02",
      title: "AI processes your input",
      description: "Our advanced AI analyzes and optimizes your content"
    },
    {
      number: "03",
      title: "Get your plan or summary instantly",
      description: "Receive actionable study plans and clear summaries"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Your Personal{" "}
                <span className="gradient-text">AI Study Companion</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Create smart study plans, summarize notes, and boost productivity with AI-powered learning tools.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="btn-gradient text-lg px-8">
                    <Brain className="mr-2 h-5 w-5" />
                    Start Planning
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    Try Summarizer
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroIllustration}
                alt="AI Study Illustration"
                className="relative rounded-3xl shadow-2xl animate-float"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-gradient-hero">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              Powerful Features for <span className="gradient-text">Smarter Learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to optimize your study routine and achieve academic excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 rounded-2xl hover-lift"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="text-6xl font-bold gradient-text mb-4">{step.number}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/register">
              <Button size="lg" className="btn-gradient text-lg px-10">
                Get Started Free
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 rounded-xl bg-gradient-primary">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold gradient-text">StudyGenius AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal AI study companion for smarter learning.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-primary transition-colors">How It Works</a></li>
                <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-lg glass-card flex items-center justify-center hover-lift">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StudyGenius AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
