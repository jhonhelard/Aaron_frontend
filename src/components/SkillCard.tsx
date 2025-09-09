
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

const SkillCard = ({ icon: Icon, title, description, className = "" }: SkillCardProps) => {
  return (
    <motion.div 
      className={`glass-panel p-6 flex flex-col justify-center ${className}`}
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(155, 135, 245, 0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center mb-2">
        <Icon className="w-5 h-5 mr-2 text-teal-400" />
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
};

export default SkillCard;
