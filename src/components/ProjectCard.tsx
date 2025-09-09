
import { motion } from "framer-motion";
import { LucideIcon, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  code: string;
  category: string;
  icon: LucideIcon;
}

const ProjectCard = ({ title, description, image, tags, code, category, icon: Icon }: ProjectCardProps) => {
  const getCategoryName = (category: string) => {
    return category === "iot" ? "IoT" : category === "ai" ? "AI & ML" : category;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(155, 135, 245, 0.3)" }}
      transition={{ duration: 0.4 }}
      className="glass-panel rounded-lg overflow-hidden flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-3 left-3 bg-secondary/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center text-xs font-medium z-10">
          <Icon className="w-5 h-5" />
          <span className="ml-1.5 capitalize">{getCategoryName(category)}</span>
        </div>
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      
      <div className="p-6 flex-grow">
        <motion.h3 
          className="text-xl font-semibold mb-2"
          whileHover={{ color: "#9b87f5" }}
        >
          {title}
        </motion.h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map(tag => (
            <motion.span 
              key={tag} 
              className="text-xs py-1 px-3 bg-secondary rounded-full"
              whileHover={{ backgroundColor: "rgba(155, 135, 245, 0.2)", color: "#9b87f5" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <div className="flex justify-center">
          <motion.a
            href={code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-muted-foreground hover:text-brand-purple transition-colors"
            whileHover={{ scale: 1.05, color: "#9b87f5" }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="mr-1.5 h-4 w-4" />
            Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
