
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Info } from "lucide-react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark p-4">
      <div className="glass-panel p-8 md:p-12 rounded-lg text-center max-w-md w-full">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 120 
          }}
        >
          <h1 className="text-8xl md:text-9xl font-bold text-brand-purple mb-4">404</h1>
          <h2 className="text-xl md:text-2xl font-bold mb-6">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#8B5CF6" }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/"
                className="inline-flex items-center bg-brand-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={(location.state as any)?.from || "/"}
                className="inline-flex items-center bg-secondary text-foreground px-6 py-3 rounded-lg font-medium hover:bg-opacity-90 transition-all"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Link>
            </motion.div>
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            <HoverCard>
              <HoverCardTrigger asChild>
                <motion.div 
                  className="inline-flex items-center cursor-help"
                  whileHover={{ color: "#9b87f5" }}
                >
                  <Info className="h-4 w-4 mr-1" />
                  <span>Why am I seeing this page?</span>
                </motion.div>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">404 Not Found Error</h4>
                  <p className="text-sm">
                    This error occurs when you try to visit a URL that doesn't exist on this website. 
                    The page might have been moved, deleted, or you may have mistyped the address.
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
