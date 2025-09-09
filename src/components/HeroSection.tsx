import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Code, Database, FileCode, Server, Terminal, GitBranch, Globe, Tv } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { Link } from "react-router-dom";
import SkillCard from "./SkillCard";
import ParticleBackground from "./ParticleBackground";
import FloatingElements from "./FloatingElements";

const phrases = [
  "Full Stack Developer",
  "AI & ML Enthusiast",
  "Web Developer",
  "Data Analyst"
];

const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Floating Elements */}
      <FloatingElements />

      {/* Enhanced Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-72 h-72 bg-teal-500/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-1/3 -left-20 w-72 h-72 bg-amber-500/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 w-72 h-72 bg-rose-500/20 rounded-full filter blur-3xl opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <motion.span 
                className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 mb-4"
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(20, 184, 166, 0.7)",
                    "0 0 0 10px rgba(20, 184, 166, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                Welcome to my portfolio
              </motion.span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="block">Hi, I'm </span>
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-amber-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: "200% 200%"
                }}
              >
                Aaron Lim
              </motion.span>
            </motion.h1>
            
            <motion.div 
              className="h-12 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <AnimatedText 
                text={phrases[index]} 
                className="text-2xl md:text-3xl font-medium text-muted-foreground"
              />
            </motion.div>
            
            <motion.p 
              className="text-lg text-muted-foreground mb-8 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate about programming and software development with expertise in Python, JavaScript, and C++.
              Building modern web applications using Node.js, React.js, and Next.js. Freelancer specializing in AI-powered solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "#7E69AB",
                  boxShadow: "0 0 20px rgba(20, 184, 166, 0.5)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/contact" className="inline-flex items-center bg-teal-500 text-white px-6 py-3 rounded-lg font-medium transition-all">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  boxShadow: "0 0 20px rgba(155, 135, 245, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects" className="inline-flex items-center bg-secondary text-foreground px-6 py-3 rounded-lg font-medium transition-all">
                  View Projects
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <motion.div 
              className="relative w-full h-[500px] rounded-lg overflow-hidden glass-panel p-6"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(20, 184, 166, 0.2)",
                  "0 0 40px rgba(245, 158, 11, 0.2)",
                  "0 0 20px rgba(20, 184, 166, 0.2)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent"></div>
              <div className="relative h-full w-full grid grid-cols-6 grid-rows-6 gap-4">
                
                {/* Skills grid */}
                <SkillCard 
                  icon={Code}
                  title="Python"
                  description="Expert level proficiency"
                  className="col-span-3 row-span-2"
                />
                
                <SkillCard 
                  icon={FileCode}
                  title="JavaScript"
                  description="Frontend & backend development"
                  className="col-span-3 row-span-2"
                />
                
                <SkillCard 
                  icon={Globe}
                  title="React.js"
                  description="UI Library"
                  className="col-span-2 row-span-2"
                />
                
                <SkillCard 
                  icon={Database}
                  title="SQL"
                  description="Database"
                  className="col-span-2 row-span-2"
                />
                
                <SkillCard 
                  icon={Terminal}
                  title="C++"
                  description="Systems programming"
                  className="col-span-2 row-span-2"
                />
                
                <SkillCard 
                  icon={Server}
                  title="Node.js"
                  description="Backend development"
                  className="col-span-3 row-span-2"
                />
                
                <SkillCard 
                  icon={Tv}
                  title="UI/UX Design"
                  description="Interface design & prototyping"
                  className="col-span-3 row-span-2"
                />
                
                <SkillCard 
                  icon={GitBranch}
                  title="AI & Machine Learning"
                  description="Model development & deployment"
                  className="col-span-3 row-span-2"
                />
                
                <SkillCard 
                  icon={Code}
                  title="Next.js"
                  description="React framework"
                  className="col-span-3 row-span-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5
        }}
      >
        <motion.div 
          className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
          animate={{
            borderColor: ["#94a3b8", "#14b8a6", "#94a3b8"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div 
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2"
            animate={{ 
              y: [0, 12, 0],
              backgroundColor: ["#94a3b8", "#14b8a6", "#94a3b8"],
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
