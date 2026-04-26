import { useEffect } from "react";
import { useChatStore } from "../../store/chatStore";
import { getSessions } from "../../api/chat";
import { Plus, MessageSquare, Tag } from "lucide-react";
import { cn } from "../../lib/utils";

const Sidebar = () => {
  const { sessions, setSessions, currentSession, setCurrentSession } =
    useChatStore();
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      }
    };
    fetchSessions();
  }, [currentSession]);

  return (
    <div className="w-[280px] h-full flex flex-col bg-zinc-900 text-zinc-400 border-r border-zinc-800">
      <div className="p-4">
        <button
          onClick={() => setCurrentSession(null)}
          className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 font-semibold py-3 px-4 rounded-xl transition-all shadow-sm group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span>New Session</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-4 pb-4">
        <div className="px-2 pt-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4">
            Past Sessions
          </h3>

          <div className="space-y-1">
            {sessions.length === 0 ? (
              <div className="p-4 text-center text-sm opacity-40">
                No sessions yet
              </div>
            ) : (
              sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setCurrentSession(session)}
                  className={cn(
                    "w-full flex flex-col gap-1 p-3 rounded-xl transition-all text-left group relative",
                    currentSession?.id === session.id
                      ? "bg-zinc-800 text-white shadow-inner"
                      : "hover:bg-zinc-800/50 hover:text-zinc-200",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 opacity-50 shrink-0" />
                    <span className="truncate text-sm font-medium">
                      {session.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] opacity-60">
                    <Tag className="w-3 h-3 shrink-0" />
                    <span className="uppercase tracking-tight">
                      {session.topic}
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-zinc-800 text-[11px] text-center opacity-40">
        © 2026 DSA Coach AI
      </div>
    </div>
  );
};

export default Sidebar;
