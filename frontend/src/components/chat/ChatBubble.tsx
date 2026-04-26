import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Message } from '../../types';
import { cn } from '../../lib/utils';

interface ChatBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

const ChatBubble = ({ message, isStreaming }: ChatBubbleProps) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex w-full mb-4 px-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-2 shadow-sm',
          isUser
            ? 'bg-zinc-800 text-zinc-100 rounded-tr-none'
            : 'bg-white text-zinc-800 border border-zinc-200 rounded-tl-none'
        )}
      >
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }: any) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={vscDarkPlus as any}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={cn("bg-zinc-100 px-1 rounded", className)} {...props}>
                  {children}
                </code>
              );
            },
            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
          }}
        >
          {message.content}
        </ReactMarkdown>
        {isStreaming && !isUser && (
          <span className="inline-block w-2 h-4 ml-1 bg-zinc-400 animate-pulse align-middle" />
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
