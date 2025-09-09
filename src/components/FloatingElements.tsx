
import { motion } from "framer-motion";
import { Code, Database, Globe, Terminal, Cpu, Zap } from "lucide-react";

const FloatingElements = () => {
  const icons = [Code, Database, Globe, Terminal, Cpu, Zap];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((Icon, index) => (
        <motion.div
          key={index}
          className="absolute text-brand-purple/10"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        >
          <Icon size={24 + Math.random() * 32} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
