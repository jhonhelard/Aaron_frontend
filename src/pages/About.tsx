import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { Code, GraduationCap, BookOpen, Coffee, User, Heart } from "lucide-react";
import InfoCard from "@/components/InfoCard";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const skills = [
    { name: "Python", level: "Advanced" },
    { name: "JavaScript", level: "Advanced" },
    { name: "React.js", level: "Intermediate" },
    { name: "Node.js", level: "Intermediate" },
    { name: "Next.js", level: "Intermediate" },
    { name: "C++", level: "Intermediate" },
    { name: "Machine Learning", level: "Intermediate" },
    { name: "CSS", level: "Intermediate" },
    { name: "Blockchain", level: "Beginner" },
    { name: "AI", level: "Intermediate" },
  ];

  return (
    <Layout>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple mb-4">
              About Me
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text="Know Who I Am" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                I'm a Computer Science student passionate about creating innovative solutions through programming and technology.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ boxShadow: "0 20px 25px -5px rgba(155, 135, 245, 0.15)" }}
            >
              <div className="glass-panel h-full p-8 rounded-lg">
                <div className="relative w-full h-80 rounded-lg mb-8 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-blue-500/20"></div>
                  <img 
                    src="/uploads/me.png" 
                    alt="Profile" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl font-bold mb-6">
                <AnimatedText text="Who am I?" once />
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  I'm <motion.span 
                    className="text-brand-purple font-semibold"
                    whileHover={{ color: "#8B5CF6" }}
                  >Aaron Lim</motion.span>, a Computer Science student specializing in AI & Machine Learning at james cook University, Singapore.
                </p>
                <p>
                  My journey in programming began with an interest in solving complex problems. This led me to explore various programming languages and technologies, with a focus on web development and artificial intelligence.
                </p>
                <p>
                  I'm passionate about building web applications and software that is not only functional but also intuitive and user-friendly. I believe in continuous learning and staying updated with the latest technologies.
                </p>
                <p>
                  When I'm not coding, I enjoy exploring new technologies, solving algorithmic problems, contributing to open-source projects and playing video games.
                </p>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Professional Skills</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                These are the technologies and programming languages I've worked with and continue to develop expertise in.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 25px -5px rgba(155, 135, 245, 0.2)",
                    y: -5
                  }}
                  className="glass-panel p-6 rounded-lg text-center"
                >
                  <motion.h3 
                    className="font-semibold mb-2"
                    whileHover={{ color: "#9b87f5" }}
                  >{skill.name}</motion.h3>
                  <span className={`text-xs py-1 px-3 rounded-full ${
                    skill.level === 'Advanced' ? 'bg-brand-purple/20 text-brand-purple' :
                    skill.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {skill.level}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">More About Me</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <InfoCard icon={User} title="Personal Interests">
                <ul className="space-y-2 text-muted-foreground">
                  {["Exploring new technologies", "Solving algorithmic challenges", 
                    "Open-source contributions", "Web development projects"].map((interest, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center"
                      whileHover={{ x: 5, color: "#9b87f5" }}
                    >
                      <Heart className="h-4 w-4 text-brand-purple mr-2" />
                      {interest}
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard icon={Code} title="Coding Philosophy">
                <ul className="space-y-2 text-muted-foreground">
                  {["Clean and maintainable code", "Focus on user experience", 
                    "Continuous learning and improvement", "Building with scalability in mind"].map((philosophy, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center"
                      whileHover={{ x: 5, color: "#9b87f5" }}
                    >
                      <Coffee className="h-4 w-4 text-brand-purple mr-2" />
                      {philosophy}
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard icon={GraduationCap} title="Education Journey">
                <ul className="space-y-2 text-muted-foreground">
                  {["Computer Science fundamentals", "Data structures and algorithms", 
                    "Machine learning and AI", "Self-taught web development"].map((journey, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center"
                      whileHover={{ x: 5, color: "#9b87f5" }}
                    >
                      <BookOpen className="h-4 w-4 text-brand-purple mr-2" />
                      {journey}
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>

              <InfoCard icon={BookOpen} title="Future Goals">
                <ul className="space-y-2 text-muted-foreground">
                  {["Mastering advanced AI techniques", "Building impactful web applications", 
                    "Contributing to open-source projects", "Exploring blockchain development"].map((goal, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-center"
                      whileHover={{ x: 5, color: "#9b87f5" }}
                    >
                      <GraduationCap className="h-4 w-4 text-brand-purple mr-2" />
                      {goal}
                    </motion.li>
                  ))}
                </ul>
              </InfoCard>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
