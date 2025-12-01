import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  Brain,
  LayoutDashboard,
  Calendar,
  FileText,
  BookmarkCheck,
  FileCheck,
  User,
  LogOut,
  Bell,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // NEW: user/profile state
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string>("S");
  const [loadingProfile, setLoadingProfile] = useState<boolean>(true);

  // NEW: Notification popup state
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);

  const triggerNotification = () => {
    setShowNotificationPopup(true);
    setTimeout(() => setShowNotificationPopup(false), 2500);
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Study Planner", href: "/study-planner", icon: Calendar },
    { name: "Notes Summarizer", href: "/summarizer", icon: FileText },
    { name: "Saved Plans", href: "/saved-plans", icon: BookmarkCheck },
    { name: "Saved Summaries", href: "/saved-summaries", icon: FileCheck },
    { name: "Profile", href: "/profile", icon: User },
  ];

  useEffect(() => {
    let mounted = true;

    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
          method: "GET",
          credentials: "include",
        });

        if (res.status === 401) {
          setLoadingProfile(false);
          return;
        }

        const data = await res.json();
        if (!mounted) return;

        const user = data?.user;

        if (user) {
          setProfilePhoto(user.profilePhoto || null);
          setDisplayName(
            (user.name && user.name.charAt(0).toUpperCase()) || "S"
          );
        }
      } catch (err) {
        console.error("Error fetching profile in layout:", err);
      } finally {
        if (mounted) setLoadingProfile(false);
      }
    };

    fetchProfile();

    return () => {
      mounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Logged out successfully");
        navigate("/");
      } else {
        toast.error(data.message || "Logout failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X /> : <Menu />}
              </Button>

              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-primary">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text hidden sm:inline">
                  StudyGenius AI
                </span>
              </Link>
            </div>

            <div className="flex items-center gap-3">
              {/* Updated Bell Icon */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={triggerNotification}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
              </Button>

              {/* Avatar (click → navigate to /profile) */}
              {loadingProfile ? (
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
              ) : (
                <div
                  onClick={() => navigate("/profile")}
                  className="cursor-pointer"
                >
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt="avatar"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                      {displayName}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 glass-card border-r z-40 overflow-y-auto"
          >
            <div className="p-4 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={`w-full justify-start ${
                        isActive ? "bg-gradient-primary text-white" : ""
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Button>
                  </Link>
                );
              })}

              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={handleLogout}
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* 🔔 Notification Popup */}
      <AnimatePresence>
        {showNotificationPopup && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-16 right-6 z-50 bg-gradient-primary text-white px-4 py-3 rounded-xl shadow-lg"
          >
            View Progress section coming soon!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64 min-h-screen">
        <div className="p-6">{children}</div>
      </main>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};