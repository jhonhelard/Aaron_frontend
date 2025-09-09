
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface InfoCardProps {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  iconColor?: string;
}

const InfoCard = ({ icon: Icon, title, children, iconColor = "text-brand-purple" }: InfoCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(155, 135, 245, 0.2)" }}
      transition={{ type: "spring", stiffness: 300 }}
      className="glass-panel p-8 rounded-lg"
    >
      <div className="flex items-center mb-4">
        <div className="bg-brand-purple/10 p-3 rounded-lg mr-4">
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

export default InfoCard;
