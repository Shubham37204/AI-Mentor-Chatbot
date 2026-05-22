import { useEffect, useRef } from 'react';
import { useChatStore } from '../../store/chatStore';
import { getHistory } from '../../api/chat';
import ChatBubble from './ChatBubble';
import { MessageSquare } from 'lucide-react';

const ChatWindow = () => {
  const { currentSession, messages, setMessages, isStreaming } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadHistory = async () => {
      if (currentSession) {
        try {
          const history = await getHistory(currentSession.id);
          setMessages(history.messages);
        } catch (error) {
          console.error('Failed to load history:', error);
        }
      }
    };
    loadHistory();
  }, [currentSession]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!currentSession) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-50 to-slate-100">
        <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
        <p className="text-lg font-medium">Select a topic to start practicing</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 via-white to-slate-50 py-8 scroll-smooth"
    >
      <div className="max-w-3xl mx-auto px-4">
        {messages.length === 0 ? (
          <div className="flex justify-center mt-12">
            <div className="bg-gradient-to-br from-white to-slate-50 px-8 py-6 rounded-2xl border border-slate-200 shadow-lg text-center">
              <p className="text-slate-700 font-semibold text-lg">
                Let's practice <span className="text-blue-600 font-bold">{currentSession.topic}</span>
              </p>
              <p className="text-sm text-slate-500 mt-2">Ask me anything about this topic!</p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatBubble
              key={msg.id || index}
              message={msg}
              isStreaming={isStreaming && index === messages.length - 1}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatWindow;
