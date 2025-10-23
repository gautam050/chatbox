import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'

export default function ChatInput(){
  const [text, setText] = useState('')
  const { sendToGemini, loading, clearChat } = useChat()

  async function handleSubmit(e){
    e.preventDefault()
    const t = text.trim()
    if(!t) return
    setText('')
    await sendToGemini(t)
  }

  return (
    <form className="input-area" onSubmit={handleSubmit}>
      <input
        placeholder="Type a message..."
        value={text}
        onChange={e=>setText(e.target.value)}
        disabled={loading}
        aria-label="Message input"
      />
      <div className="controls">
        <button type="submit" disabled={loading || !text.trim()}>
          {loading ? 'Thinking...' : 'Send'}
        </button>
        <button type="button" onClick={clearChat} title="Clear chat">Clear</button>
      </div>
    </form>
  )
}
