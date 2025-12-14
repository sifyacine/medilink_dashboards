import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, Video, UserPlus, MessageCircle, ArrowLeft } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export const Chat: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showChatMobile, setShowChatMobile] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      role: 'Cardiologist',
      avatar: 'SJ',
      lastMessage: 'Thank you for the patient update',
      lastMessageTime: '2 min ago',
      unreadCount: 2,
      isOnline: true,
    },
    {
      id: '2',
      name: 'Maria Rodriguez',
      role: 'Nurse',
      avatar: 'MR',
      lastMessage: 'Medicine inventory is updated',
      lastMessageTime: '1 hour ago',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Central Medical Center',
      role: 'Clinic',
      avatar: 'CM',
      lastMessage: 'New appointment scheduled',
      lastMessageTime: '3 hours ago',
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: '4',
      name: 'Dr. Michael Chen',
      role: 'Neurologist',
      avatar: 'MC',
      lastMessage: 'Case discussion tomorrow?',
      lastMessageTime: '1 day ago',
      unreadCount: 0,
      isOnline: false,
    },
  ];

  const initialMessages: Message[] = [
    {
      id: '1',
      sender: 'Dr. Sarah Johnson',
      content: 'Good morning! I wanted to discuss the patient case we reviewed yesterday.',
      timestamp: '9:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      content: 'Good morning Dr. Johnson! Yes, I have the updated reports ready.',
      timestamp: '9:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'Dr. Sarah Johnson',
      content: 'Perfect! Could you send me the latest blood work results?',
      timestamp: '9:35 AM',
      isOwn: false,
    },
    {
      id: '4',
      sender: 'You',
      content: 'I\'ll send them over right now. The patient shows significant improvement.',
      timestamp: '9:36 AM',
      isOwn: true,
    },
    {
      id: '5',
      sender: 'Dr. Sarah Johnson',
      content: 'Thank you for the patient update. This is exactly what I needed.',
      timestamp: '9:38 AM',
      isOwn: false,
    },
  ];

  // Initialize messages when a contact is selected
  React.useEffect(() => {
    if (selectedContact) {
      setMessages(initialMessages);
    }
  }, [selectedContact]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      const newMessage: Message = {
        id: Date.now().toString(),
        sender: 'You',
        content: message.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');

      // Simulate a response after 2 seconds
      setTimeout(() => {
        if (selectedContact) {
          const responseMessage: Message = {
            id: (Date.now() + 1).toString(),
            sender: selectedContact.name,
            content: 'Thanks for your message! I\'ll get back to you shortly.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isOwn: false,
          };
          setMessages(prev => [...prev, responseMessage]);
        }
      }, 2000);
    }
  };

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    // Load initial messages for the selected contact
    if (contact.id === '1') {
      setMessages(initialMessages);
    } else {
      setMessages([]);
    }
    setShowChatMobile(true);
  };

  return (
    <div className="h-[calc(100vh-8rem)] bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex overflow-hidden">
      {/* Contacts Sidebar */}
      <div className={`${showChatMobile ? 'hidden' : 'flex'} w-full lg:w-1/3 border-r border-gray-200 dark:border-gray-700 flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Messages</h2>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <UserPlus size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => handleContactSelect(contact)}
              className={`p-4 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedContact?.id === contact.id ? 'bg-cyan-50 dark:bg-cyan-900 border-r-2 border-r-cyan-500' : ''
                }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{contact.avatar}</span>
                  </div>
                  {contact.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{contact.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{contact.lastMessageTime}</p>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{contact.role}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{contact.lastMessage}</p>
                </div>
                {contact.unreadCount > 0 && (
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-medium">{contact.unreadCount}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showChatMobile ? 'hidden' : 'flex'} lg:flex flex-1 flex-col`}>
        {selectedContact ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowChatMobile(false)}
                    className="lg:hidden p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <ArrowLeft size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{selectedContact.avatar}</span>
                    </div>
                    {selectedContact.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{selectedContact.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{selectedContact.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Phone size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Video size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <MoreVertical size={20} className="text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${msg.isOwn
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-cyan-200' : 'text-gray-500'
                      }`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Start a conversation with {selectedContact.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="p-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center p-6">
              <MessageCircle size={48} className="text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Select a contact to start chatting</p>
              <button
                onClick={() => setShowChatMobile(false)}
                className="mt-4 lg:hidden px-4 py-2 bg-cyan-600 text-white rounded-lg"
              >
                Back to Contacts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};