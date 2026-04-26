interface StreamingTextProps {
  isStreaming: boolean
}

export default function StreamingText({ isStreaming }: StreamingTextProps) {
  if (!isStreaming) return null

  return (
    <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse rounded-sm" />
  )
}