
import { motion } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

interface EducationCardProps {
  institution: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  cgpa: string;
  details: string[];
  index: number;
}

const EducationCard = ({ 
  institution, 
  degree, 
  field, 
  duration, 
  location, 
  cgpa, 
  details,
  index
}: EducationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
    >
      <motion.div
        whileHover={{ scale: 1.03, y: -8, boxShadow: "0 15px 30px -5px rgba(155, 135, 245, 0.2)" }}
        transition={{ type: "spring", stiffness: 300 }}
        className="glass-panel p-8 rounded-lg h-full"
      >
        <div className="flex items-center mb-4">
          <div className="bg-teal-500/10 p-3 rounded-lg mr-4">
            <GraduationCap className="h-6 w-6 text-teal-400" />
          </div>
          <motion.h3 
            className="text-xl font-semibold"
            whileHover={{ color: "#9b87f5" }}
          >{degree}</motion.h3>
        </div>
        
        <div className="mb-4">
          <div className="font-medium text-lg mb-1">{institution}</div>
          <p className="text-muted-foreground">{field}</p>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </div>
            <div className="flex items-center">
              <Award className="h-4 w-4 mr-1" />
              CGPA: {cgpa}
            </div>
          </div>
        </div>
        
        <ul className="space-y-2 pl-6 list-disc text-muted-foreground">
          {details.map((detail, i) => (
            <li key={i}>{detail}</li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default EducationCard;
