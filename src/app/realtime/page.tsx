'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { useToast } from '@/components/ui/Toast';
import { subscribeToDB, writeToDB, deleteFromDB } from '@/lib/db/rtdb';

interface RealtimeMessage {
  id: string;
  text: string;
  timestamp: number;
  author: string;
}

export default function RealtimePage() {
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');
  const { showToast, ToastComponent } = useToast();
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    const unsubscribe = subscribeToDB(
      'messages',
      (data) => {
        if (data) {
          const messagesArray = Object.entries(data)
            .map(([key, value]) => ({
              id: key,
              ...(value as Omit<RealtimeMessage, 'id'>),
            }))
            .sort((a, b) => b.timestamp - a.timestamp);
          setMessages(messagesArray);
        } else {
          setMessages([]);
        }
        setLoading(false);
      },
      { orderBy: 'timestamp', limit: 50 }
    );

    unsubscribeRef.current = unsubscribe;

    // Cleanup on unmount
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim()) {
      showToast('Please enter a message', 'error');
      return;
    }

    try {
      const messageData = {
        text: newMessage,
        timestamp: Date.now(),
        author: `User_${Math.floor(Math.random() * 1000)}`,
      };

      await writeToDB(`messages/${Date.now()}`, messageData);
      setNewMessage('');
      showToast('Message sent', 'success');
    } catch (error) {
      console.error('Error sending message:', error);
      showToast('Failed to send message', 'error');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await deleteFromDB(`messages/${id}`);
      showToast('Message deleted', 'success');
    } catch (error) {
      console.error('Error deleting message:', error);
      showToast('Failed to delete message', 'error');
    }
  };

  return (
    <div className="min-h-screen">
      <Header title="Realtime Chat" />

      {ToastComponent}

      <div className="container-mobile py-4 space-y-4">
        {/* Messages List */}
        <div className="space-y-3">
          {loading ? (
            <LoadingSkeleton lines={3} />
          ) : messages.length === 0 ? (
            <div className="card text-center py-8">
              <p className="text-4xl mb-3">⚡</p>
              <p className="text-gray-600 dark:text-gray-400">No messages yet</p>
              <p className="text-sm text-gray-500 mt-1">Be the first to send a message!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="relative">
                <Card
                  title={msg.author}
                  description={msg.text}
                  metadata={[
                    {
                      label: 'Time',
                      value: new Date(msg.timestamp).toLocaleTimeString(),
                    },
                  ]}
                />
                <button
                  onClick={() => handleDeleteMessage(msg.id)}
                  className="absolute top-2 right-2 text-red-500 p-1 touch-feedback text-sm"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="fixed bottom-16 left-0 right-0 safe-bottom">
          <div className="container-mobile">
            <form onSubmit={handleSendMessage} className="card !mb-0">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="input-mobile flex-1"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
