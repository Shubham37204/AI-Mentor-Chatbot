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
        'flex w-full mb-6 px-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-[75%] rounded-3xl px-6 py-4 shadow-md transition-all',
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-tr-none font-medium'
            : 'bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 border border-slate-200 rounded-tl-none shadow-lg'
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
            p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-base">{children}</p>,
            ul: ({ children }) => <ul className="list-disc ml-6 mb-3 space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal ml-6 mb-3 space-y-1">{children}</ol>,
            li: ({ children }) => <li className="mb-2 leading-relaxed">{children}</li>,
            h1: ({ children }) => <h1 className="text-xl font-bold mb-3 mt-2">{children}</h1>,
            h2: ({ children }) => <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>,
            h3: ({ children }) => <h3 className="text-base font-bold mb-2 mt-2">{children}</h3>,
            blockquote: ({ children }) => <blockquote className="border-l-4 border-slate-300 pl-4 italic my-3 opacity-80">{children}</blockquote>,
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
