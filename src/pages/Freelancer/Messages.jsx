import { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, Star } from 'lucide-react';

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: '👩‍💼',
      lastMessage: "Thanks! I'll review the designs today.",
      time: '10:30 AM',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      avatar: '👨‍💻',
      lastMessage: 'When can you start on the project?',
      time: 'Yesterday',
      unread: 0,
      online: false
    },
    {
      id: 3,
      name: 'Emma Davis',
      avatar: '👩‍🎨',
      lastMessage: 'The wireframes look great!',
      time: '2 days ago',
      unread: 1,
      online: true
    },
    {
      id: 4,
      name: 'Alex Rodriguez',
      avatar: '👨‍💼',
      lastMessage: 'I have a new project for you',
      time: '3 days ago',
      unread: 0,
      online: false
    }
  ];

  const messages = [
    {
      id: 1,
      sender: 'them',
      content: "Hi! I saw your profile and I'm interested in hiring you for my project.",
      time: '9:45 AM'
    },
    {
      id: 2,
      sender: 'me',
      content: "Hello! Thank you for reaching out. I'd be happy to discuss your project. What are you looking to build?",
      time: '9:50 AM'
    },
    {
      id: 3,
      sender: 'them',
      content: 'I need a modern e-commerce website with payment integration and inventory management.',
      time: '9:52 AM'
    },
    {
      id: 4,
      sender: 'me',
      content: "That sounds great! I have extensive experience with e-commerce platforms. What's your timeline and budget?",
      time: '9:55 AM'
    },
    {
      id: 5,
      sender: 'them',
      content: "I'm looking to launch in 2-3 months. Budget is around ₹5000. Can you help?",
      time: '10:00 AM'
    },
    {
      id: 6,
      sender: 'me',
      content: 'Yes, absolutely! That timeline and budget work well. I can send you a detailed proposal with milestones.',
      time: '10:05 AM'
    },
    {
      id: 7,
      sender: 'them',
      content: "Perfect! I'll also share some design references I like.",
      time: '10:15 AM'
    },
    {
      id: 8,
      sender: 'them',
      content: "Thanks! I'll review the designs today.",
      time: '10:30 AM'
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedChat);

  const handleSend = () => {
    if (message.trim()) {
      // Handle message send
      console.log('Sending:', message);
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pastel-purple to-pastel-pink bg-clip-text text-transparent">
          Messages
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden" style={{ height: '70vh' }}>
          <div className="flex h-full">
            {/* Conversations List */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent text-sm"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-4 cursor-pointer border-b border-gray-100 hover:bg-pastel-blue/5 transition ${
                      selectedChat === conv.id ? 'bg-pastel-blue/10' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="text-3xl">{conv.avatar}</div>
                        {conv.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-800 truncate">{conv.name}</h3>
                          <span className="text-xs text-gray-500">{conv.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          {conv.unread > 0 && (
                            <span className="ml-2 px-2 py-1 bg-pastel-coral text-white rounded-full text-xs">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{selectedConversation?.avatar}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedConversation?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {selectedConversation?.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-pastel-blue/10 rounded-lg transition">
                    <Star className="h-5 w-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-pastel-blue/10 rounded-lg transition">
                    <MoreVertical className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'me'
                          ? 'bg-gradient-to-r from-pastel-purple to-pastel-pink text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === 'me' ? 'text-white/80' : 'text-gray-500'
                      }`}>
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-pastel-blue/10 rounded-lg transition">
                    <Paperclip className="h-5 w-5 text-gray-600" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 bg-gradient-to-r from-pastel-purple to-pastel-pink text-white rounded-lg hover:shadow-lg transition"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
