
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '@/firebase/config';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  user_id: string | null;
  created_at: string;
  is_read: boolean;
}

export type ContactMessageInsert = Omit<ContactMessage, 'id' | 'created_at' | 'is_read'>;

const COLLECTION_NAME = 'contact_messages';

export const contactService = {
  async getAllMessages(): Promise<{ data: ContactMessage[] | null; error: Error | null }> {
    try {
      console.log("=== FETCHING ALL MESSAGES ===");
      console.log("Collection name:", COLLECTION_NAME);
      console.log("Database instance:", db);
      
      const q = query(collection(db, COLLECTION_NAME), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      
      console.log("Query snapshot size:", querySnapshot.size);
      
      const messages: ContactMessage[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          user_id: data.user_id || null,
          created_at: data.created_at instanceof Timestamp 
            ? data.created_at.toDate().toISOString() 
            : data.created_at,
          is_read: data.is_read || false
        } as ContactMessage;
      });

      console.log("✅ Successfully fetched messages:", messages.length);
      return { data: messages, error: null };
    } catch (error) {
      console.error('❌ Error fetching messages:', error);
      return { data: null, error: error as Error };
    }
  },

  async insertMessage(message: ContactMessageInsert): Promise<{ data: ContactMessage | null; error: Error | null }> {
    try {
      console.log("=== INSERTING MESSAGE ===");
      console.log("Collection name:", COLLECTION_NAME);
      console.log("Database instance:", db);
      console.log("Message data:", message);
      
      // Test if we can access the collection
      console.log("Testing collection access...");
      const testCollection = collection(db, COLLECTION_NAME);
      console.log("Collection reference created:", testCollection);
      
      console.log("Adding document to Firestore...");
      const docRef = await addDoc(testCollection, {
        ...message,
        created_at: serverTimestamp(),
        is_read: false
      });
      
      console.log("✅ Document added successfully with ID:", docRef.id);

      const newMessage: ContactMessage = {
        ...message,
        id: docRef.id,
        created_at: new Date().toISOString(),
        is_read: false
      };

      console.log("✅ Message insert completed successfully");
      return { data: newMessage, error: null };
    } catch (error) {
      console.error('❌ Error inserting message:');
      console.error('Error object:', error);
      console.error('Error message:', (error as Error).message);
      console.error('Error code:', (error as any).code);
      console.error('Error stack:', (error as Error).stack);
      return { data: null, error: error as Error };
    }
  },

  async markAsRead(id: string): Promise<{ data: ContactMessage | null; error: Error | null }> {
    try {
      console.log("=== MARKING MESSAGE AS READ ===");
      console.log("Message ID:", id);
      
      const messageRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(messageRef, {
        is_read: true
      });

      console.log("✅ Message marked as read successfully");

      // Return a placeholder message since we don't fetch the updated document
      const updatedMessage: ContactMessage = {
        id,
        name: '',
        email: '',
        subject: '',
        message: '',
        user_id: null,
        created_at: new Date().toISOString(),
        is_read: true
      };

      return { data: updatedMessage, error: null };
    } catch (error) {
      console.error('❌ Error marking message as read:', error);
      return { data: null, error: error as Error };
    }
  },

  async deleteMessage(id: string): Promise<{ error: Error | null }> {
    try {
      console.log("=== DELETING MESSAGE ===");
      console.log("Message ID:", id);
      
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      
      console.log("✅ Message deleted successfully");
      return { error: null };
    } catch (error) {
      console.error('❌ Error deleting message:', error);
      return { error: error as Error };
    }
  }
};
