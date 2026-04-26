import { useEffect } from 'react'
import { getSessions, getHistory } from '../api/chat'
import { useChatStore } from '../store/chatStore'

export const useSession = () => {
  const { setSessions, setCurrentSession, setMessages, currentSession } = useChatStore()

  const loadSessions = async () => {
    try {
      const data = await getSessions()
      setSessions(data)
    } catch (err) {
      console.error('Failed to load sessions', err)
    }
  }

  const selectSession = async (sessionId: string) => {
    try {
      const data = await getHistory(sessionId)
      setCurrentSession(data.session)
      setMessages(data.messages)
    } catch (err) {
      console.error('Failed to load session history', err)
    }
  }

  useEffect(() => {
    loadSessions()
  }, [])

  return { loadSessions, selectSession }
}
