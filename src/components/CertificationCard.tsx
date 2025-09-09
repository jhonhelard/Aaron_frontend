
import { motion } from "framer-motion";
import { Award, School, Calendar } from "lucide-react";

interface CertificationCardProps {
  name: string;
  issuer: string;
  date: string;
  description: string;
  index: number;
}

const CertificationCard = ({ name, issuer, date, description, index }: CertificationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
      whileHover={{ scale: 1.03, boxShadow: "0 10px 30px -5px rgba(155, 135, 245, 0.2)" }}
      className="glass-panel p-6 rounded-lg"
    >
      <div className="flex items-start">
        <div className="bg-teal-500/10 p-3 rounded-lg mr-4 mt-1">
          <Award className="h-6 w-6 text-teal-400" />
        </div>
        <div>
          <motion.h3 
            className="text-lg font-semibold mb-1"
            whileHover={{ color: "#9b87f5" }}
          >{name}</motion.h3>
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <School className="h-4 w-4 mr-1" />
            <span>{issuer}</span>
            <span className="mx-2">•</span>
            <Calendar className="h-4 w-4 mr-1" />
            <span>{date}</span>
          </div>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
