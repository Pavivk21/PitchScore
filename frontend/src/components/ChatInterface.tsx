"use client"

import React, { useState, useRef, useEffect } from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Paperclip, Send, Search } from "lucide-react"

// Types
type Message = {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

type Conversation = {
  id: string
  name: string
  lastMessage: string
  timestamp: string
  unreadCount: number
  avatar: string
}

// Mock Data
const mockConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMessage: "That works for me. Let's do it.",
    timestamp: "10:30 AM",
    unreadCount: 2,
    avatar: "/avatars/sarah.jpg",
  },
  {
    id: "2",
    name: "Michael Smith",
    lastMessage: "Got it, thanks!",
    timestamp: "Yesterday",
    unreadCount: 0,
    avatar: "/avatars/michael.jpg",
  },
]

const mockMessages: Message[] = [
  {
    id: "1",
    conversationId: "1",
    senderId: "sarah-chen",
    senderName: "Sarah Chen",
    content: "Hey, are we still on for the meeting later?",
    timestamp: "10:20 AM",
  },
  {
    id: "2",
    conversationId: "1",
    senderId: "me",
    senderName: "You",
    content: "Yes, let's meet at 3 PM.",
    timestamp: "10:22 AM",
  },
  {
    id: "3",
    conversationId: "1",
    senderId: "sarah-chen",
    senderName: "Sarah Chen",
    content: "That works for me. Let's do it.",
    timestamp: "10:30 AM",
  },
  {
    id: "4",
    conversationId: "2",
    senderId: "michael-smith",
    senderName: "Michael Smith",
    content: "Got it, thanks!",
    timestamp: "Yesterday",
  },
]

export function ChatInterface() {
  const [conversations] = useState<Conversation[]>(mockConversations)
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(
    conversations[0]
  )
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, selectedConversation])

  // Send new message
  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      conversationId: selectedConversation.id,
      senderId: "me",
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  // Filter messages by current conversation
  const filteredMessages = messages.filter(
    (m) => m.conversationId === selectedConversation.id
  )

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r bg-white flex flex-col">
        <CardHeader className="border-b p-4">
          <CardTitle className="text-xl">Messages</CardTitle>
          <div className="relative mt-2">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input placeholder="Search..." className="pl-8" />
          </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                selectedConversation.id === conv.id ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedConversation(conv)}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={conv.avatar} alt={conv.name} />
                <AvatarFallback>{conv.name[0]}</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <p className="font-medium">{conv.name}</p>
                  <span className="text-xs text-gray-400">{conv.timestamp}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {conv.unreadCount}
                </span>
              )}
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        <CardHeader className="border-b flex items-center p-4">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={selectedConversation.avatar}
              alt={selectedConversation.name}
            />
            <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-3">
            <CardTitle>{selectedConversation.name}</CardTitle>
            <p className="text-sm text-gray-500">Online</p>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.senderId === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-lg p-3 max-w-xs ${
                      msg.senderId === "me"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
        </CardContent>

        <CardFooter className="p-4 border-t">
          <div className="flex w-full items-center space-x-2">
            <Button size="icon" variant="ghost">
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </CardFooter>
      </div>
    </div>
  )
}
