import { useState, useRef, useEffect } from "react"
import { useAppContext } from "@/context/AppContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Paperclip, Send, MoreVertical, Image as ImageIcon, Briefcase, MessageSquare } from "lucide-react"

export default function MessagingPage() {
  const { conversations, setConversations, currentUser } = useAppContext()
  const safeConversations = conversations || []
  const [activeChatId, setActiveChatId] = useState<string | null>(safeConversations.length > 0 ? safeConversations[0].id : null)
  const [messageText, setMessageText] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const activeChat = safeConversations.find(c => c.id === activeChatId)

  // Auto-scroll to bottom when activeChat changes or new message is sent
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeChat?.messages?.length, activeChatId])

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!messageText.trim() || !activeChatId) return

    const newMessage = {
      id: `m${Date.now()}`,
      sender: currentUser?.name || "Me",
      text: messageText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    }

    const updatedConversations = safeConversations.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [...(chat.messages || []), newMessage], unread: 0, lastUpdated: new Date().toISOString() }
      }
      return chat
    })

    setConversations(updatedConversations)
    setMessageText("")
  }

  const markAsRead = (chatId: string) => {
    setActiveChatId(chatId)
    setConversations(safeConversations.map(chat => 
      chat.id === chatId ? { ...chat, unread: 0 } : chat
    ))
  }

  const filteredConversations = safeConversations.filter(c => {
    const nameMatch = c.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    const projectMatch = c.project?.toLowerCase().includes(searchQuery.toLowerCase()) || false;
    return nameMatch || projectMatch;
  })

  return (
    <div className="h-[calc(100vh-12rem)] min-h-[600px] border rounded-xl overflow-hidden bg-background flex flex-col md:flex-row shadow-sm">
      {/* Conversation List Sidebar */}
      <div className="w-full md:w-80 border-r flex flex-col bg-muted/10 h-1/2 md:h-full">
        <div className="p-4 border-b bg-background">
          <h2 className="font-bold text-xl mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 bg-muted/50" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground text-sm">No conversations found.</div>
          ) : (
            filteredConversations.map((chat) => {
              const lastMessage = chat.messages[chat.messages.length - 1]
              return (
                <div 
                  key={chat.id} 
                  onClick={() => markAsRead(chat.id)}
                  className={`p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${chat.id === activeChatId ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-10 w-10 border">
                          <AvatarImage src={`https://i.pravatar.cc/150?u=${chat.id}`} />
                          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {chat.online && <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background"></div>}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm leading-none">{chat.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center">
                          <Briefcase className="h-3 w-3 mr-1" /> {chat.project}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] text-muted-foreground">
                        {lastMessage ? lastMessage.time : ""}
                      </span>
                      {chat.unread > 0 && (
                        <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                  <p className={`text-sm mt-2 line-clamp-1 ${chat.unread > 0 ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>
                    {lastMessage ? lastMessage.text : "No messages yet"}
                  </p>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col h-1/2 md:h-full bg-background">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-6 border-b flex items-center justify-between bg-background z-10 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${activeChat.id}`} />
                  <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-bold text-sm leading-none">{activeChat.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    {activeChat.online ? (
                      <><div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1.5"></div> Online</>
                    ) : "Offline"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-md border text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground font-medium">Project:</span>
                  <span className="font-semibold">{activeChat.project}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-muted/10">
              <div className="flex justify-center">
                <Badge variant="outline" className="bg-background text-muted-foreground font-normal">Start of conversation</Badge>
              </div>

              {activeChat.messages.map((msg: any) => (
                <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? 'flex-row-reverse' : 'flex-row'}`}>
                    {!msg.isMe && (
                      <Avatar className="h-8 w-8 flex-shrink-0 mt-auto">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${activeChat.id}`} />
                        <AvatarFallback>{activeChat.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                        msg.isMe 
                          ? 'bg-primary text-primary-foreground rounded-br-sm' 
                          : 'bg-background border rounded-bl-sm'
                      }`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {msg.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-background border-t">
              <div className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hidden sm:flex">
                  <ImageIcon className="h-5 w-5" />
                </Button>
                <Input 
                  className="flex-1 bg-muted/50 border-transparent focus-visible:ring-1 focus-visible:bg-background h-12"
                  placeholder="Type your message..." 
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
                <Button type="submit" size="icon" className="h-12 w-12 rounded-full shadow-md ml-2 shrink-0" disabled={!messageText.trim()}>
                  <Send className="h-5 w-5 -ml-0.5" />
                </Button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/10">
            <div className="text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-medium text-muted-foreground">Select a conversation</h3>
              <p className="text-sm text-muted-foreground/60">Choose a contact from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}