
import { useState, useEffect } from 'react';
import { contactService, ContactMessage } from '@/services/contactService';

export const useContactMessages = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const { data, error } = await contactService.getAllMessages();
      
      if (error) throw error;
      
      setMessages(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await contactService.markAsRead(messageId);
      if (error) throw error;
      
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await contactService.deleteMessage(messageId);
      if (error) throw error;
      
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return {
    messages,
    loading,
    error,
    fetchMessages,
    markAsRead,
    deleteMessage
  };
};
