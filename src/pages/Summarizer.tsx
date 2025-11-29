import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Copy, Save, Upload } from "lucide-react";
import { toast } from "sonner";

const Summarizer = () => {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSummarize = async () => {
    if (!inputText.trim()) {
      toast.error("Please enter some text to summarize");
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const mockSummary = {
        summary: "This comprehensive study material covers the fundamental concepts of the subject matter. The key points emphasize understanding core principles before moving to advanced topics. The material provides a structured approach to learning with clear examples and practical applications.",
        bulletPoints: [
          "Core concepts are explained with clear definitions",
          "Practical examples demonstrate real-world applications",
          "Progressive difficulty from basics to advanced topics",
          "Important formulas and theorems are highlighted",
          "Self-assessment questions included for practice"
        ],
        keyTerms: [
          "Foundation concepts",
          "Progressive learning",
          "Practical application",
          "Core principles",
          "Self-assessment"
        ],
        flashcards: [
          { question: "What is the main focus of this material?", answer: "Understanding core principles before advancing" },
          { question: "How should one approach this subject?", answer: "Start with fundamentals and progress gradually" },
          { question: "What makes this effective?", answer: "Structured approach with practical examples" }
        ]
      };

      setSummary(mockSummary);
      setIsGenerating(false);
      toast.success("Summary generated successfully!");
    }, 2000);
  };

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(summary.summary);
      toast.success("Summary copied to clipboard!");
    }
  };

  const handleSave = () => {
    toast.success("Summary saved!");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File "${file.name}" uploaded successfully!`);
      // In a real app, you'd process the file here
    }
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
            <span className="gradient-text">Notes Summarizer</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Get AI-powered summaries, bullet points, and flashcards from your notes
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card p-8 rounded-2xl"
          >
            <h2 className="text-2xl font-semibold mb-6">Input</h2>

            <Tabs defaultValue="text" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="text">Paste Text</TabsTrigger>
                <TabsTrigger value="upload">Upload PDF</TabsTrigger>
              </TabsList>

              <TabsContent value="text" className="space-y-4">
                <Textarea
                  placeholder="Paste your notes here..."
                  className="min-h-[400px] resize-none"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">PDF files only</p>
                  </label>
                </div>
              </TabsContent>
            </Tabs>

            <Button
              onClick={handleSummarize}
              disabled={isGenerating}
              className="w-full btn-gradient h-12 text-lg mt-6"
            >
              {isGenerating ? (
                <>Generating...</>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Summarize Notes
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
              <h2 className="text-2xl font-semibold">Summary</h2>
              {summary && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>

            {summary ? (
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Summary</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {summary.summary}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Points</h3>
                  <ul className="space-y-2">
                    {summary.bulletPoints.map((point: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-muted-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Key Terms</h3>
                  <div className="flex flex-wrap gap-2">
                    {summary.keyTerms.map((term: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      >
                        {term}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Flashcards</h3>
                  <div className="space-y-3">
                    {summary.flashcards.map((card: any, index: number) => (
                      <div key={index} className="p-4 bg-secondary/50 rounded-xl">
                        <p className="text-sm font-medium mb-2">Q: {card.question}</p>
                        <p className="text-sm text-muted-foreground">A: {card.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Your AI-generated summary will appear here</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Summarizer;
