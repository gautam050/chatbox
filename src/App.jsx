import React from 'react'
import MessageList from './components/MessageList'
import ChatInput from './components/ChatInput'

export default function App(){
  return (
    <div className="app">
      <header className="app-header">
        <h1>Gemini Chat</h1>
      </header>
      <main className="chat-container">
        <MessageList />
        <ChatInput />
      </main>
    </div>
  )
}
