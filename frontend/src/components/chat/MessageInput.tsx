import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '../../store/chatStore';
import { cn } from '../../lib/utils';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isStreaming = useChatStore((state) => state.isStreaming);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, [input]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isStreaming) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="p-6 border-t border-slate-200 bg-gradient-to-t from-slate-50 to-white shadow-lg">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto flex items-end gap-3"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            disabled={isStreaming}
            className={cn(
              "w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:opacity-50 transition-all",
              "scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent"
            )}
            style={{ maxHeight: '120px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="absolute right-3 bottom-3 p-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 disabled:from-slate-300 disabled:to-slate-300 transition-all shadow-md"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      <p className="text-center text-xs text-slate-500 mt-3">
        DSA Coach can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default MessageInput;
