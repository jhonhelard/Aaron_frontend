import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot, User, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      text: "Hi! I'm Aaron's AI assistant. How can I help you today?"
    }
  ]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (message.trim() && !isLoading) {
      const newUserMessage = {
        id: Date.now(),
        type: "user",
        text: message.trim()
      };
      
      setMessages(prev => [...prev, newUserMessage]);
      const currentMessage = message.trim();
      setMessage("");
      setIsLoading(true);
      
      try {
        // Prepare conversation history for the API
        const conversationHistory = messages.map(msg => ({
          type: msg.type,
          text: msg.text
        }));
        
        const response = await fetch('http://localhost:3000/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: currentMessage,
            conversationHistory: conversationHistory
          }),
        });
        
        const data = await response.json();
        
        if (data.success) {
          const botResponse = {
            id: Date.now() + 1,
            type: "bot",
            text: data.response
          };
          setMessages(prev => [...prev, botResponse]);
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
      } catch (error) {
        console.error('Chat error:', error);
        const errorMessage = {
          id: Date.now() + 1,
          type: "bot",
          text: "Sorry, I'm having trouble connecting to the AI service. Please make sure the backend server is running and try again."
        };
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "Connection Error",
          description: "Unable to connect to the AI service. Please check if the backend server is running.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
        // Restore focus to the input so the user can continue typing without clicking
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // When opening the chatbot, focus the input automatically
  useEffect(() => {
    if (isOpen) {
      // Wait for modal to render
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen]);

  return (
    <>
      {/* Chatbot Icon Button */}
      <motion.button
        onClick={toggleChatbot}
        className="fixed bottom-20 right-6 z-50 bg-brand-purple hover:bg-brand-purple/90 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Open AI Chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.button>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-40 right-3 sm:right-6 z-50 flex flex-col w-[90vw] sm:w-[26rem] md:w-[30rem] lg:w-[34rem] h-[62vh] sm:h-[66vh] md:h-[68vh] max-h-[85vh] bg-card border border-border rounded-xl shadow-2xl backdrop-blur-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-brand-purple/10">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5 text-brand-purple" />
                <h3 className="font-semibold text-foreground">AI Assistant</h3>
              </div>
              <button
                onClick={toggleChatbot}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chatbot"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 min-h-0 p-4 space-y-4 overflow-y-auto overscroll-contain">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start space-x-2 ${
                    msg.type === "user" ? "justify-end" : ""
                  }`}
                >
                  {msg.type === "bot" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-purple/20 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-brand-purple" />
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      msg.type === "user"
                        ? "bg-brand-purple text-white"
                        : "bg-secondary/50 text-foreground"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  {msg.type === "user" && (
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-purple/20 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-brand-purple" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={isLoading ? "AI is thinking..." : "Type your message..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="flex-1 px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-purple/50 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="px-3 py-2 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-muted disabled:text-muted-foreground text-white rounded-lg transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Press Enter to send • Powered by OpenAI
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
