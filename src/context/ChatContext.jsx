import React, { createContext, useContext, useEffect, useState } from 'react'

const ChatContext = createContext()

export function useChat(){ return useContext(ChatContext) }

export function ChatProvider({ children }){
  const [messages, setMessages] = useState(() => {
    try {
      const raw = localStorage.getItem('gemini_chat_history')
      return raw ? JSON.parse(raw) : [{ role: 'assistant', text: 'Hi! I am Gemini. How can I help?' }]
    } catch (e){
      return [{ role: 'assistant', text: 'Hi! I am Gemini. How can I help?' }]
    }
  })
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    localStorage.setItem('gemini_chat_history', JSON.stringify(messages))
  }, [messages])

  function addMessage(role, text){
    setMessages(m => [...m, { role, text, id: Date.now()+Math.random() }])
  }

  function clearChat(){
    setMessages([{ role: 'assistant', text: 'Hi! I am Gemini. How can I help?' }])
  }

  async function sendToGemini(userText){
   
    addMessage('user', userText)
    setLoading(true)
    try {
      const url = '/api/generate/openai?model=gemini-1.5-flash'
      const payload = {
        contents: [{ role: 'user', parts: [{ text: userText }] }]
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        let errText = `HTTP ${res.status} ${res.statusText}`
        try {
          const errBody = await res.json()
          errText += ' - ' + (errBody?.error?.message || JSON.stringify(errBody))
        } catch (e) {
        }
        throw new Error(errText)
      }

      const data = await res.json()
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text
        || data?.output?.[0]?.content?.text
        || data?.text
        || 'No response from API.'
      addMessage('assistant', String(aiText))
    } catch (err){
      addMessage('assistant', 'Error: ' + (err.message || 'Network or API error'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearChat, sendToGemini, loading }}>
      {children}
    </ChatContext.Provider>
  )
}
