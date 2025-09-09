
import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, User, Mail, FileText, MessageSquare} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { contactService, ContactMessageInsert } from "@/services/contactService";

const ContactForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const messageData: ContactMessageInsert = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        user_id: null
      };
      
      const result = await contactService.insertMessage(messageData);
      
      if (result.error) {
        throw new Error(result.error.message || "Failed to send message");
      }
      
      setIsSubmitted(true);
      
      toast({
        title: "Message sent successfully!",
        description: "Thank you for reaching out. I'll get back to you soon.",
        variant: "default",
      });
      
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
      
    } catch (error: any) {
      toast({
        title: "Failed to send message",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="glass-panel p-6 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-white">Your Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:opacity-50 text-sm"
                  placeholder="John Doe"
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(155, 135, 245, 0.3)" }}
                />
              </div>
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full pl-10 pr-4 py-2.5 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:opacity-50 text-sm"
                  placeholder="you@example.com"
                  whileFocus={{ boxShadow: "0 0 0 3px rgba(155, 135, 245, 0.3)" }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="subject" className="block text-sm font-medium text-white">Subject</label>
            <div className="relative">
              <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple disabled:opacity-50 text-sm"
                placeholder="Project inquiry / Job opportunity / Collaboration..."
                whileFocus={{ boxShadow: "0 0 0 3px rgba(155, 135, 245, 0.3)" }}
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 text-muted-foreground w-4 h-4 pointer-events-none" />
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                rows={4}
                className="w-full pl-10 pr-4 py-2.5 bg-secondary text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-purple resize-none disabled:opacity-50 text-sm"
                placeholder="Tell me more about your project, your timeline, and what you're looking to achieve..."
                whileFocus={{ boxShadow: "0 0 0 3px rgba(155, 135, 245, 0.3)" }}
              />
            </div>
          </div>
          
          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={isSubmitting || isSubmitted}
              whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
              className={`flex items-center justify-center w-full px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubmitted 
                  ? "bg-green-600 text-white cursor-not-allowed" 
                  : isSubmitting
                  ? "bg-brand-purple/70 text-white cursor-not-allowed"
                  : "bg-brand-purple text-white hover:bg-brand-purple/90"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>Sending...</span>
                </div>
              ) : isSubmitted ? (
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  <span>Message Sent!</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  <span>Send Message</span>
                </div>
              )}
            </motion.button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            I value your privacy. Your information will never be shared with third parties.
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default ContactForm;
