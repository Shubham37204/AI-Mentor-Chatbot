import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import MessageInput from '../components/chat/MessageInput';
import TopicSelect from './TopicSelect';
import { useChatStore } from '../store/chatStore';
import { useStream } from '../hooks/useStream';

export default function Chat() {
  const currentSession = useChatStore((state) => state.currentSession);
  const { streamMessage } = useStream();

  const handleSendMessage = (message: string) => {
    if (currentSession) {
      streamMessage(currentSession.id, message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {!currentSession ? (
          <TopicSelect />
        ) : (
          <>
            {/* Header / Topic Banner */}
            <header className="h-14 border-b border-zinc-200 flex items-center px-6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
              <h2 className="font-bold text-zinc-800 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
                {currentSession.title}
              </h2>
            </header>

            {/* Scrollable Chat Area */}
            <ChatWindow />

            {/* Bottom Input Area */}
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        )}
      </main>
    </div>
  );
}
