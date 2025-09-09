
import { motion } from "framer-motion";
import { Mail, MapPin, Linkedin, Github, Twitter } from "lucide-react";

const ContactInfo = () => {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5 text-brand-purple" />,
      title: "Email",
      details: "stardev00012@gmail.com",
      link: "mailto:stardev00012@gmail.com",
    },
    {
      icon: <Mail className="h-5 w-5 text-brand-purple" />,
      title: "Discord",
      details: "ming_951112",
      link: "mailto:ming_951112",
    },
    {
      icon: <MapPin className="h-5 w-5 text-brand-purple" />,
      title: "Location",
      details: "Singapore",
      link: "https://maps.google.com/?q=Singapore",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      name: "GitHub",
      // url: "https://github.com/oxBinaryBrain/",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      name: "LinkedIn",
      // url: "https://www.linkedin.com/in/uday-g-601ba9266/",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      name: "Twitter",
      // url: "https://x.com/UdayG6389896490",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="glass-panel p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-brand-purple">Contact Information</h2>
        
        <div className="space-y-4 mb-6">
          {contactInfo.map((info, index) => (
            <motion.a
              key={info.title}
              href={info.link}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-3 bg-secondary/40 rounded-lg hover:bg-secondary/60 transition-colors"
            >
              <div className="flex-shrink-0 bg-brand-purple/10 p-2 rounded-lg mr-3">
                {info.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm">{info.title}</h3>
                <p className="text-muted-foreground text-sm">{info.details}</p>
              </div>
            </motion.a>
          ))}
        </div>
        
        <div>
          <h3 className="font-medium mb-3 text-brand-purple">Social Media</h3>
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.3, 
                  delay: 0.6 + (index * 0.1),
                  type: "spring", 
                  stiffness: 300
                }}
                whileHover={{ scale: 1.1, backgroundColor: "#9b87f5" }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-10 h-10 bg-secondary rounded-lg hover:bg-brand-purple hover:text-white transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-lg">
        <h3 className="font-medium mb-2 text-brand-purple">Response Time</h3>
        <p className="text-sm text-muted-foreground">
          I typically reply within 24 hours during business days.
        </p>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
