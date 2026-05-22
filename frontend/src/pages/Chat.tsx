import Sidebar from '../components/layout/Sidebar';
import ChatWindow from '../components/chat/ChatWindow';
import MessageInput from '../components/chat/MessageInput';
import TopicSelect from './TopicSelect';
import { useChatStore } from '../store/chatStore';
import { useStream } from '../hooks/useStream';
import { Menu } from 'lucide-react';

export default function Chat() {
  const currentSession = useChatStore((state) => state.currentSession);
  const sidebarOpen = useChatStore((state) => state.sidebarOpen);
  const toggleSidebar = useChatStore((state) => state.toggleSidebar);
  const { streamMessage } = useStream();

  const handleSendMessage = (message: string) => {
    if (currentSession) {
      streamMessage(currentSession.id, message);
    }
  };

  return (
    <div className="flex h-screen w-full bg-white overflow-hidden">
      {/* Left Sidebar */}
      {sidebarOpen && <Sidebar />}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {!currentSession ? (
          <TopicSelect />
        ) : (
          <>
            {/* Header / Topic Banner */}
            <header className="h-16 border-b border-slate-200 flex items-center px-6 bg-gradient-to-r from-slate-50 to-white/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
              <div className="flex items-center gap-4 w-full">
                {!sidebarOpen && (
                  <button
                    onClick={toggleSidebar}
                    className="p-2 hover:bg-slate-200 rounded-lg transition-colors text-slate-700"
                    title="Open sidebar"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                )}
                <h2 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                  {currentSession.title}
                </h2>
              </div>
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
