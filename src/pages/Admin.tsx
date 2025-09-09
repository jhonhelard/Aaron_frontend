
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/AnimatedText";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CheckCircle, Eye, EyeOff, Clock } from "lucide-react";
import { ContactMessage } from "@/services/contactService";
import { useContactMessages } from "@/hooks/useFirebase";

const Admin = () => {
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();
  const { messages, loading, error, markAsRead, deleteMessage } = useContactMessages();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) {
      localStorage.setItem('isAdmin', 'true');
    }
  }, []);

  const handleMarkAsRead = async (message: ContactMessage) => {
    try {
      await markAsRead(message.id);
      
      if (selectedMessage?.id === message.id) {
        setSelectedMessage({ ...selectedMessage, is_read: true });
      }
      
      toast({
        title: message.is_read ? "Marked as unread" : "Marked as read",
        variant: "default",
      });
    } catch (err: any) {
      toast({
        title: "Error updating message",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const viewMessageDetails = (message: ContactMessage) => {
    setSelectedMessage(message);
    
    if (!message.is_read) {
      handleMarkAsRead(message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

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
              Admin Panel
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <AnimatedText text="Contact Messages" once />
            </h1>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-muted-foreground">
                Manage and respond to messages from your contact form.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass-panel p-6 rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold mb-4">All Messages</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="animate-spin h-8 w-8 border-2 border-brand-purple border-t-transparent rounded-full"></div>
                  </div>
                ) : error ? (
                  <div className="text-center py-10 text-red-500">
                    {error}
                  </div>
                ) : messages.length === 0 ? (
                  <div className="text-center py-10 text-muted-foreground">
                    No messages yet.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Status</TableHead>
                          <TableHead>From</TableHead>
                          <TableHead>Subject</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {messages.map((message) => (
                          <TableRow 
                            key={message.id}
                            className={message.is_read ? "" : "bg-secondary/50 font-medium"}
                          >
                            <TableCell>
                              {message.is_read ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                              ) : (
                                <Clock className="h-4 w-4 text-amber-500" />
                              )}
                            </TableCell>
                            <TableCell>{message.name}</TableCell>
                            <TableCell>{message.subject}</TableCell>
                            <TableCell>{formatDate(message.created_at)}</TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => viewMessageDetails(message)}
                              >
                                View
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(message)}
                              >
                                {message.is_read ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="glass-panel p-6 rounded-lg sticky top-24">
                <h2 className="text-xl font-bold mb-4">Message Details</h2>
                
                {selectedMessage ? (
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">From</p>
                      <p className="font-medium">{selectedMessage.name} ({selectedMessage.email})</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Subject</p>
                      <p className="font-medium">{selectedMessage.subject}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p>{formatDate(selectedMessage.created_at)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Message</p>
                      <div className="p-4 bg-secondary/50 rounded-md mt-1">
                        <p>{selectedMessage.message}</p>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        className="w-full"
                        onClick={() => window.location.href = `mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`}
                      >
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-10 text-muted-foreground">
                    Select a message to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
