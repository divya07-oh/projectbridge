import { ApiError } from '../../utils/apiError';

// Mock in-memory messages DB
let conversations: any[] = [
  {
    id: "c1",
    participants: ["mock_student_id", "mock_business_id"],
    name: "TechNova Inc.",
    project: "Design a logo for a tech startup",
    unread: 2,
    online: true,
    lastUpdated: new Date().toISOString(),
    messages: [
      { id: "m1", text: "Hi there! I saw your portfolio and loved your design style.", time: "10:00 AM", isMe: false, senderId: "mock_business_id" },
      { id: "m2", text: "Are you available for a quick chat about a new project?", time: "10:05 AM", isMe: false, senderId: "mock_business_id" }
    ]
  }
];

export const messagesService = {
  getConversations: async (userId: string) => {
    return conversations.filter(c => c.participants.includes(userId));
  },

  getConversationMessages: async (conversationId: string, userId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) {
      throw new ApiError(404, 'Conversation not found');
    }
    if (!conversation.participants.includes(userId)) {
      throw new ApiError(403, 'Not authorized to view this conversation');
    }
    return conversation.messages;
  },

  sendMessage: async (conversationId: string, senderId: string, text: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) {
      throw new ApiError(404, 'Conversation not found');
    }
    if (!conversation.participants.includes(senderId)) {
      throw new ApiError(403, 'Not authorized to send messages in this conversation');
    }

    const newMessage = {
      id: `m_${Date.now()}`,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true, // This will be adjusted on the frontend depending on who is requesting
      senderId
    };

    conversation.messages.push(newMessage);
    conversation.lastUpdated = new Date().toISOString();
    // TODO: Socket.IO emit 'new_message' event here
    return newMessage;
  },

  markAsRead: async (conversationId: string, userId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) {
      throw new ApiError(404, 'Conversation not found');
    }
    // Only clear unread if the user isn't the one who sent the last message
    // Simplified for mock
    conversation.unread = 0;
    return conversation;
  }
};
