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
    <div className="p-4 border-t border-zinc-200 bg-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto flex items-end gap-2"
      >
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            disabled={isStreaming}
            className={cn(
              "w-full resize-none rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-3 pr-12 text-zinc-800 focus:border-zinc-500 focus:outline-none focus:ring-0 disabled:opacity-50",
              "scrollbar-thin scrollbar-thumb-zinc-300 scrollbar-track-transparent"
            )}
            style={{ maxHeight: '120px' }}
          />
          <button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="absolute right-2 bottom-2 p-2 rounded-lg bg-zinc-800 text-white hover:bg-zinc-700 disabled:bg-zinc-300 transition-colors"
          >
            {isStreaming ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>
      <p className="text-center text-[10px] text-zinc-400 mt-2">
        DSA Coach can make mistakes. Verify important information.
      </p>
    </div>
  );
};

export default MessageInput;
