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
      <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 bg-zinc-50">
        <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
        <p className="text-lg font-medium">Select a topic to start practicing</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-zinc-50 py-6 scroll-smooth"
    >
      <div className="max-w-4xl mx-auto">
        {messages.length === 0 ? (
          <div className="flex justify-center mt-10">
            <div className="bg-white px-6 py-4 rounded-xl border border-zinc-200 shadow-sm text-center">
              <p className="text-zinc-600 font-medium">
                Started session for <span className="text-zinc-900 font-bold">{currentSession.topic}</span>
              </p>
              <p className="text-sm text-zinc-400 mt-1">Ask anything about this topic!</p>
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
