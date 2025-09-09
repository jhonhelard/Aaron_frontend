import { ReactNode, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import ScrollToTop from "./ScrollToTop";
import ParticleBackground from "./ParticleBackground";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-brand-dark relative">
      {/* Global Particle Background - Always present */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      <Navbar />
      <main className="flex-grow relative z-10">
        {loading ? (
          <div className="flex items-center justify-center h-screen relative z-20">
            <div className="relative w-24 h-24">
              <motion.div
                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-brand-purple border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute top-2 left-2 w-20 h-20 rounded-full border-4 border-l-teal-500 border-r-transparent border-t-transparent border-b-transparent"
                animate={{ rotate: -360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="min-h-screen relative z-10"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
      
      <footer className="w-full py-8 border-t border-muted relative z-10 backdrop-blur-md bg-black/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="text-2xl font-bold text-brand-purple mb-2">Aaron Lim.</div>
              <p className="text-muted-foreground text-sm max-w-md">
                Building innovative digital solutions with a focus on clean, efficient code and exceptional user experiences.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-foreground font-medium mb-3">Connect with me</p>
              <div className="flex space-x-4">
                <motion.a
                  // href="https://github.com/oxBinaryBrain/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-purple transition-colors bg-secondary p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </motion.a>
                <motion.a
                  // href="https://www.linkedin.com/in/uday-g-601ba9266/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-purple transition-colors bg-secondary p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </motion.a>
                <motion.a
                  // href="https://x.com/UdayG6389896490"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-brand-purple transition-colors bg-secondary p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </motion.a>
                <motion.a
                  // href="mailto:ud4yg@yandex.com"
                  className="text-muted-foreground hover:text-brand-purple transition-colors bg-secondary p-3 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                >
                  <Mail className="h-5 w-5" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="text-muted-foreground text-sm text-center mt-8">
            © {new Date().getFullYear()} Aaron L. All rights reserved.
          </div>
        </div>
      </footer>
      <ScrollToTop />
    </div>
  );
};

export default Layout;
