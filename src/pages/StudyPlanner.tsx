import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Download, Save } from "lucide-react";
import { toast } from "sonner";

const StudyPlanner = () => {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [hoursPerDay, setHoursPerDay] = useState([2]);
  const [totalDays, setTotalDays] = useState("");
  const [studyStyle, setStudyStyle] = useState("");
  const [plan, setPlan] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
  if (!subject || !topic || !difficulty || !totalDays || !studyStyle) {
    toast.error("Please fill in all fields");
    return;
  }

  setIsGenerating(true);

  try {
    const res = await fetch("http://localhost:5000/api/ai/study-plan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        subject,
        topic,
        difficulty,
        hoursPerDay: hoursPerDay[0],
        totalDays,
        studyStyle,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to generate plan");
      setIsGenerating(false);
      return;
    }

    setPlan(data.plan);
    toast.success("AI Study Plan generated!");

  } catch (error) {
    toast.error("Something went wrong");
    console.error(error);
  }

  setIsGenerating(false);
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
            <span className="gradient-text">AI Study Planner</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Create a personalized study schedule tailored to your needs
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-6">Study Details</h2>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject Name</Label>
              <Input
                id="subject"
                placeholder="e.g., Mathematics, Physics, History"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic/Chapter</Label>
              <Input
                id="topic"
                placeholder="e.g., Calculus, Quantum Mechanics"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Hours per Day: {hoursPerDay[0]} hours</Label>
              <Slider
                value={hoursPerDay}
                onValueChange={setHoursPerDay}
                min={1}
                max={8}
                step={0.5}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="days">Total Days</Label>
              <Input
                id="days"
                type="number"
                placeholder="e.g., 14, 30"
                value={totalDays}
                onChange={(e) => setTotalDays(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="style">Preferred Study Style</Label>
              <Select value={studyStyle} onValueChange={setStudyStyle}>
                <SelectTrigger>
                  <SelectValue placeholder="Select study style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Visual">Visual</SelectItem>
                  <SelectItem value="Theory">Theory</SelectItem>
                  <SelectItem value="Practice">Practice</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full btn-gradient h-12 text-lg"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Plan with AI
                </>
              )}
            </Button>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Generated Plan</h2>
              {plan && (
                <div className="flex gap-2">
                  {/* <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button> */}
                </div>
              )}
            </div>

            {plan ? (
              <div className="prose prose-sm max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {plan}
                </pre>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated study plan will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudyPlanner;
