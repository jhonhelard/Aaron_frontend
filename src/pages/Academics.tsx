
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { BookOpen } from "lucide-react";
import EducationCard from "@/components/EducationCard";
import CertificationCard from "@/components/CertificationCard";

const Academics = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const education = [
    {
      id: 1,
      institution: "James Cook University, Singapore",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science & Engineering (Specialization in AI & ML)",
      duration: "2021 - Present",
      location: "Singapore, Singapore",
      cgpa: "In Progress",
      details: [
        "Specializing in Artificial Intelligence and Machine Learning",
        "Key courses include Data Structures, Algorithms, Machine Learning",
        "Actively participating in research projects related to AI/ML"
      ]
    },
    {
      id: 2,
      institution: "Youth Support and Enrichment Programs",
      degree: "Pre-University College",
      field: "Science Stream",
      duration: "2019 - 2021",
      location: "Singapore, Singapore",
      cgpa: "8.5",
      details: [
        "Major subjects included Physics, Mathematics, Chemistry, Computer Science",
        "Highlights: Advanced Mathematics & Computer Science",
        "Developed strong foundation in scientific principles and programming"
      ]
    },
    {
      id: 3,
      institution: "Singapore, Singapore",
      degree: "Secondary High School",
      field: "NCERT-based Curriculum",
      duration: "2012 - 2019",
      location: "Singapore, Singapore",
      cgpa: "9.09",
      details: [
        "Strong foundation in Science",
        "Studied foundations of Mathematics"
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "Python Programming",
      issuer: "Coursera",
      date: "2022",
      description: "Comprehensive course covering advanced Python concepts and applications."
    },
    {
      id: 2,
      name: "Web Development with JavaScript",
      issuer: "Udemy",
      date: "2022",
      description: "In-depth training on building modern web applications using JavaScript."
    },
    {
      id: 3,
      name: "Machine Learning Fundamentals",
      issuer: "edX",
      date: "2023",
      description: "Introduction to machine learning algorithms and their implementation."
    },
    {
      id: 4,
      name: "React.js Development",
      issuer: "freeCodeCamp",
      date: "2023",
      description: "Building interactive user interfaces with React.js framework."
    }
  ];

  const courseHighlights = [
    "Data Structures and Algorithms",
    "Machine Learning",
    "Artificial Intelligence",
    "Database Management Systems",
    "Computer Networks",
    "Operating Systems",
    "Web Technologies",
    "Software Engineering",
    "Cloud Computing",
    "Blockchain Technology"
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
            <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-teal-500/10 text-teal-400 mb-4">
              Academics
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text="Educational Background" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                My academic journey, courses, and educational achievements that have shaped my technical expertise.
              </p>
            </div>
          </motion.div>

          {/* Education Cards */}
          <div className="mb-24">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold mb-12 text-center"
            >
              Education
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {education.map((edu, index) => (
                <EducationCard
                  key={edu.id}
                  institution={edu.institution}
                  degree={edu.degree}
                  field={edu.field}
                  duration={edu.duration}
                  location={edu.location}
                  cgpa={edu.cgpa}
                  details={edu.details}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Key Courses */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            whileHover={{ boxShadow: "0 20px 25px -5px rgba(155, 135, 245, 0.1)" }}
            className="mb-24"
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Key Courses</h2>
            
            <div className="glass-panel p-10 rounded-lg">
              <div className="flex items-center justify-center mb-8">
                <div className="bg-teal-500/10 p-4 rounded-full">
                  <BookOpen className="h-8 w-8 text-teal-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courseHighlights.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: "rgba(155, 135, 245, 0.2)", 
                      color: "#9b87f5"
                    }}
                    className="flex items-center p-4 bg-secondary/50 rounded-lg"
                  >
                    <div className="h-2 w-2 rounded-full bg-teal-400 mr-3" />
                    <span>{course}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <h2 className="text-3xl font-bold mb-12 text-center">Certifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <CertificationCard 
                  key={cert.id}
                  name={cert.name}
                  issuer={cert.issuer}
                  date={cert.date}
                  description={cert.description}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Academics;
