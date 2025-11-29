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
    
    // Simulate AI generation
    setTimeout(() => {
      const mockPlan = `
**${subject} - ${topic} Study Plan**

**Duration:** ${totalDays} days | **Daily Study Time:** ${hoursPerDay[0]} hours | **Difficulty:** ${difficulty}

**Week 1: Foundation Building**
- Day 1-2: Introduction to core concepts
- Day 3-4: Deep dive into fundamental theories
- Day 5-7: Practice problems and review

**Week 2: Advanced Topics**
- Day 8-10: Complex problem-solving
- Day 11-12: Real-world applications
- Day 13-14: Mock tests and assessments

**Study Tips for ${studyStyle} Learners:**
${studyStyle === "Visual" ? "- Use diagrams, charts, and mind maps\n- Watch educational videos\n- Create visual summaries" : ""}
${studyStyle === "Theory" ? "- Read textbooks thoroughly\n- Take detailed notes\n- Summarize each chapter" : ""}
${studyStyle === "Practice" ? "- Solve numerous problems\n- Work on practical exercises\n- Apply concepts hands-on" : ""}
${studyStyle === "Mixed" ? "- Combine all learning methods\n- Alternate between theory and practice\n- Use various resources" : ""}

**Daily Schedule:**
- ${hoursPerDay[0] > 3 ? "Morning: 2 hours of focused study" : "Morning: 1 hour of focused study"}
- ${hoursPerDay[0] > 3 ? "Afternoon: 1 hour of practice" : "Afternoon: 30 mins practice"}
- ${hoursPerDay[0] > 3 ? "Evening: 1 hour of review" : "Evening: 30 mins review"}
      `;
      
      setPlan(mockPlan);
      setIsGenerating(false);
      toast.success("Study plan generated successfully!");
    }, 2000);
  };

  const handleSave = () => {
    toast.success("Study plan saved!");
  };

  const handleDownload = () => {
    toast.success("Downloading study plan...");
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
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    PDF
                  </Button>
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
