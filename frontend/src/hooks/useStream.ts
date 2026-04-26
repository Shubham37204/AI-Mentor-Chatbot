import { useChatStore } from '../store/chatStore';
import { useAuthStore } from '../store/authStore';

export const useStream = () => {
  const { appendToLastMessage, setIsStreaming, addMessage } = useChatStore();
  const token = useAuthStore.getState().token;

  const streamMessage = async (sessionId: string, message: string) => {
    setIsStreaming(true);

    // Add user message to UI immediately
    addMessage({
      id: crypto.randomUUID(),
      session_id: sessionId,
      role: 'user',
      content: message,
      created_at: new Date().toISOString(),
    });

    // Add placeholder assistant message
    const assistantMessageId = crypto.randomUUID();
    addMessage({
      id: assistantMessageId,
      session_id: sessionId,
      role: 'assistant',
      content: '',
      created_at: new Date().toISOString(),
    });

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ session_id: sessionId, message: message }),
      });

      if (!response.ok) throw new Error('Stream failed');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') break;
            appendToLastMessage(data);
          }
        }
      }
    } catch (error) {
      console.error('Streaming error:', error);
      appendToLastMessage('\n\n*Error: Failed to get response from assistant.*');
    } finally {
      setIsStreaming(false);
    }
  };

  return { streamMessage };
};
