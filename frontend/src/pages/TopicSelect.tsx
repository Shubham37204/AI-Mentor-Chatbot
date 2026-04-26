import { useChatStore } from '../store/chatStore';
import { createSession } from '../api/chat';
import { Code2, Braces, Layers, TreeDeciduous, Share2, Calculator, SortAsc, Search, RefreshCw } from 'lucide-react';

const TOPICS = [
  { name: 'Arrays', icon: Code2, color: 'bg-blue-500' },
  { name: 'Strings', icon: Braces, color: 'bg-purple-500' },
  { name: 'LinkedList', icon: Layers, color: 'bg-emerald-500' },
  { name: 'Trees', icon: TreeDeciduous, color: 'bg-green-500' },
  { name: 'Graphs', icon: Share2, color: 'bg-orange-500' },
  { name: 'DP', icon: Calculator, color: 'bg-red-500' },
  { name: 'Sorting', icon: SortAsc, color: 'bg-indigo-500' },
  { name: 'Searching', icon: Search, color: 'bg-pink-500' },
  { name: 'Recursion', icon: RefreshCw, color: 'bg-yellow-500' },
];

const TopicSelect = () => {
  const setCurrentSession = useChatStore((state) => state.setCurrentSession);

  const handleSelectTopic = async (topic: string) => {
    try {
      const session = await createSession(topic);
      setCurrentSession(session);
    } catch (error) {
      console.error('Failed to create session:', error);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-50 overflow-y-auto">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-zinc-900 mb-4 tracking-tight">
            What do you want to <span className="text-zinc-600">master</span> today?
          </h1>
          <p className="text-zinc-500 text-lg">Select a topic to start your practice session with DSA Coach AI.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TOPICS.map((topic) => (
            <button
              key={topic.name}
              onClick={() => handleSelectTopic(topic.name.toLowerCase())}
              className="group flex flex-col items-center p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm hover:shadow-md hover:border-zinc-300 transition-all text-center"
            >
              <div className={`p-4 rounded-xl ${topic.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                <topic.icon className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-zinc-800">{topic.name}</h3>
              <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-tighter">Practice session</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopicSelect;
