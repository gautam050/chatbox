import React, { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'

export default function MessageList(){
  const { messages } = useChat()
  const endRef = useRef(null)
  useEffect(()=> endRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages])
  return (
    <div className="messages">
      {messages.map((m, i) => (
        <div key={m.id || i} className={m.role === 'user' ? 'message user' : 'message assistant'}>
          <div className="role">{m.role}</div>
          <div className="text">{m.text}</div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  )
}
