
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";

const ContactHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple mb-3">
        Get In Touch
      </span>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        <AnimatedText text="Let's Connect" once />
      </h1>
      <div className="max-w-2xl mx-auto">
        <p className="text-base text-muted-foreground">
          Got a project in mind? Drop me a message and let's create something amazing together!
        </p>
      </div>
    </motion.div>
  );
};

export default ContactHeader;
