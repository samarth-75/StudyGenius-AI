import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Brain } from "lucide-react";
import authIllustration from "@/assets/auth-illustration.jpg";
import { motion } from "framer-motion";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      // Store token if backend returns it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="p-2 rounded-xl bg-gradient-primary">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">StudyGenius AI</span>
          </Link>

          <div className="glass-card p-8 rounded-3xl">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground mb-8">
              Sign in to continue your learning journey
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 btn-gradient text-lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>

              
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Illustration */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden lg:flex flex-1 bg-gradient-hero items-center justify-center p-8"
      >
        <div className="relative max-w-lg">
          <div className="absolute inset-0 bg-gradient-primary opacity-30 blur-3xl rounded-full"></div>
          <img
            src={authIllustration}
            alt="Auth Illustration"
            className="relative rounded-3xl shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;