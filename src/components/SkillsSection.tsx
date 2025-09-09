
import { useState } from "react";
import { motion } from "framer-motion";
import { Code } from "lucide-react";

const SkillsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const skills = [
    { name: "JavaScript", category: "Frontend", color: "#F7DF1E", bgColor: "bg-yellow-500/20" },
    { name: "Python", category: "AI/ML", color: "#3776AB", bgColor: "bg-blue-500/20" },
    { name: "R-Programming", category: "AI/ML", color: "#276DC3", bgColor: "bg-blue-600/20" },
    { name: "NextJS", category: "Frontend", color: "#000000", bgColor: "bg-gray-900/20" },
    { name: "ReactJs", category: "Frontend", color: "#61DAFB", bgColor: "bg-cyan-500/20" },
    { name: "HTML", category: "Frontend", color: "#E34F26", bgColor: "bg-red-500/20" },
    { name: "CSS", category: "Frontend", color: "#1572B6", bgColor: "bg-blue-600/20" },
    { name: "BootStrap", category: "Frontend", color: "#7952B3", bgColor: "bg-purple-600/20" },
    { name: "Tailwind", category: "Frontend", color: "#06B6D4", bgColor: "bg-cyan-500/20" },
    { name: "Node.JS", category: "Backend", color: "#339933", bgColor: "bg-green-600/20" },
    { name: "Express.JS", category: "Backend", color: "#000000", bgColor: "bg-red-900/20" },
    { name: "MongoDB", category: "Database", color: "#47A248", bgColor: "bg-green-500/20" },
    { name: "MySQL", category: "Database", color: "#4479A1", bgColor: "bg-blue-500/20" },
    { name: "GitHub", category: "Tool", color: "#181717", bgColor: "bg-gray-900/20" },
    { name: "VSCode", category: "Tool", color: "#181717", bgColor: "bg-blue-900/20" },
    { name: "Git", category: "Tool", color: "#F05032", bgColor: "bg-red-500/20" },
    { name: "Pandas", category: "AI/ML", color: "#150458", bgColor: "bg-indigo-900/20" },
    { name: "Numpy", category: "AI/ML", color: "#013243", bgColor: "bg-purple -900/20" },
    { name: "Matplotlib", category: "AI/ML", color: "#11557C", bgColor: "bg-blue-700/20" },
    { name: "OpenCV", category: "AI/ML", color: "#5C3EE8", bgColor: "bg-purple-600/20" },
    { name: "Tensorflow", category: "AI/ML", color: "#FF6F00", bgColor: "bg-orange-600/20" },
    { name: "Vue.JS", category: "Frontend", color: "#F24E1E", bgColor: "bg-indigo-900/20" },
    { name: "Firebase", category: "Database", color: "#F24E1E", bgColor: "bg-red-500/20" },
    
  ];

  const categories = ["All","Frontend", "AI/ML", "Backend", "Databases", "Tools"];

  const filteredSkills = activeFilter === "All" 
    ? skills 
    : skills.filter(skill => {
        if (activeFilter === "Frontend") return skill.category === "Frontend" || skill.category === "Language";
        if (activeFilter === "AI/ML") return skill.category === "AI/ML";
        if (activeFilter === "Backend") return skill.category === "Backend";
        if (activeFilter === "Databases") return skill.category === "Database";
        if (activeFilter === "Tools") return skill.category === "Tool" || skill.category === "Framework";
        return skill.category === activeFilter;
      });

  const getSkillIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      "JavaScript": "devicon-javascript-plain",
      "Python": "devicon-python-plain",
      "R-Programming": "devicon-r-original",
      "NextJS": "devicon-nextjs-original",
      "ReactJs": "devicon-react-original",
      "HTML": "devicon-html5-plain",
      "CSS": "devicon-css3-plain",
      "BootStrap": "devicon-bootstrap-plain",
      "Tailwind": "devicon-tailwindcss-plain",
      "Node.JS": "devicon-nodejs-plain",
      "Express.JS": "devicon-express-original",
      "Firebase": "devicon-firebase-plain",
      "MongoDB": "devicon-mongodb-plain",
      "MySQL": "devicon-mysql-plain",
      "GitHub": "devicon-github-original",
      "VSCode": "devicon-vscode-original",
      "Git": "devicon-git-plain",
      "Pandas": "devicon-pandas-original",
      "Numpy": "devicon-numpy-original",
      "Matplotlib": "devicon-matplotlib-plain",
      "OpenCV": "devicon-opencv-plain",
      "Mediapipe": "devicon-python-plain",
      "Tensorflow": "devicon-tensorflow-original",
      "Vue.JS": "devicon-vuejs-plain",
      
    };

    return iconMap[name] || "devicon-code-plain";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="glass-panel p-8 rounded-xl backdrop-blur-md border border-white/10"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold flex items-center text-white">
          <Code className="w-6 h-6 mr-3 text-brand-purple" />
          Technical Skills
        </h3>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveFilter(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
              activeFilter === category
                ? "bg-brand-purple text-white border-brand-purple/50"
                : "bg-gray-800/30 text-gray-300 border-white/10 hover:bg-gray-800/50 hover:border-brand-purple/30"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 25
            }}
            whileHover={{ 
              scale: 1.1,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="flex flex-col items-center group cursor-pointer"
          >
            <motion.div
              className={`relative w-16 h-16 ${skill.bgColor} rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/10 group-hover:border-brand-purple/50 transition-all duration-300`}
              whileHover={{ 
                boxShadow: "0 10px 30px -5px rgba(155, 135, 245, 0.4)",
              }}
            >
              <i className={`${getSkillIcon(skill.name)} text-3xl`} style={{ color: skill.color }}></i>
              
              {/* Shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.3 }}
              />
            </motion.div>
            
            <motion.span
              className="text-xs font-medium mt-3 text-center text-gray-300 group-hover:text-white transition-colors max-w-20"
              whileHover={{ scale: 1.05 }}
            >
              {skill.name}
            </motion.span>
          </motion.div>
        ))}
      </motion.div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No skills found in this category.</p>
        </div>
      )}
    </motion.div>
  );
};

export default SkillsSection;
