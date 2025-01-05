import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

import {
  ArrowLeft,
  ImageIcon,
  Send,
  Circle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import api from "@/utils/server";
import { Card, CardContent } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

const ENDPOINT = "https://multi-vendor-ys5e.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const MessageBubble = ({ message, isSender, userData, time }) => {
  return (
    <div className={`flex items-end space-x-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isSender && (
        <Avatar className="w-8 h-8">
          <AvatarImage src={userData?.avatar?.url} className="object-cover"/>
          <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
        </Avatar>
      )}
      <div className={`flex flex-col ${isSender ? 'items-end' : 'items-start'}`}>
        {message.images && (
          <img
            src={message.images?.url}
            alt="Shared image"
            className="object-cover max-w-xs mb-1 rounded-lg md:max-w-sm lg:max-w-md"
          />
        )}
        {message.text && (
          <div
            className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-sm lg:max-w-md break-words ${
              isSender 
                ? 'bg-emerald-500 text-white rounded-br-none' 
                : 'bg-emerald-100 text-emerald-900 rounded-bl-none'
            }`}
          >
            <p>{message.text}</p>
          </div>
        )}
        <span className="mt-1 text-xs text-emerald-600">{format(time)}</span>
      </div>
    </div>
  );
};

const ChatHeader = ({ userData, activeStatus, onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-emerald-200 bg-emerald-50">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={userData?.avatar?.url} className="object-cover"/>
          <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-emerald-700">{userData?.name}</h3>
          <div className="flex items-center text-sm text-emerald-500">
            {activeStatus && (
              <>
                <Circle className="w-3 h-3 mr-1 text-emerald-500 fill-emerald-500" />
                <span className="text-xs">Active now</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5 text-emerald-700" />
      </Button>
    </div>
  );
};

const MessageInput = ({ newMessage, setNewMessage, onSend, onImageUpload }) => {
  return (
    <form onSubmit={onSend} className="p-4 border-t border-emerald-200 bg-emerald-50">
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          id="image"
          className="hidden"
          onChange={onImageUpload}
          accept="image/*"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-emerald-500 hover:text-emerald-600"
          onClick={() => document.getElementById('image').click()}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-emerald-100 text-emerald-900 placeholder-emerald-400 focus:bg-white focus:ring-emerald-500"
        />
        <Button type="submit" size="icon" className="bg-emerald-500 hover:bg-emerald-600">
          <Send className="w-4 h-4 text-white" />
        </Button>
      </div>
    </form>
  );
};

const ConversationItem = ({ conversation, userData, isActive, online, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-3 hover:bg-emerald-50 transition-colors ${
        isActive ? 'bg-emerald-50' : ''
      }`}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={userData?.avatar?.url} className="object-cover"/>
          <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            online ? 'bg-emerald-500' : 'bg-gray-300'
          }`}
        />
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-medium text-emerald-700">{userData?.name}</h4>
        <p className="text-sm truncate text-emerald-500">
          {conversation.lastMessage || 'No messages yet'}
        </p>
      </div>
    </button>
  );
};

const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        images: data.images,
        createdAt: Date.now(),
      });
    });

    return () => socketId.off("getMessage");
  }, []);

  useEffect(() => {
    if (arrivalMessage && currentChat?.members.includes(arrivalMessage.sender)) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await api.get(
          `/conversation/get-all-conversation-seller/${seller?._id}`
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (seller?._id) {
      getConversations();
    }
  }, [seller?._id]);

  useEffect(() => {
    const getUserData = async () => {
      if (currentChat) {
        const userId = currentChat.members.find((id) => id !== seller?._id);
        try {
          const response = await api.get(`/auth/user-info/${userId}`);
          setUserData(response.data.user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    getUserData();
  }, [currentChat, seller?._id]);

  useEffect(() => {
    const getOnlineUsers = () => {
      socketId.emit("addUser", seller._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    };

    if (seller?._id) {
      getOnlineUsers();
    }

    return () => socketId.off("getUsers");
  }, [seller?._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const response = await api.get(`/message/get-all-messages/${currentChat._id}`);
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    getMessages();
  }, [currentChat?._id]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() && !images) return;

    const message = {
      sender: seller._id,
      text: newMessage.trim(),
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== seller._id
    );

    socketId.emit("sendMessage", {
      senderId: seller._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await api.post("/message/create-new-message", message);
      setMessages([...messages, response.data.message]);
      await updateLastMessage(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const updateLastMessage = async (message) => {
    try {
      await api.put(`/conversation/update-last-message/${currentChat._id}`, {
        lastMessage: message,
        lastMessageId: seller._id,
      });
    } catch (error) {
      console.error("Error updating last message:", error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const message = {
          sender: seller._id,
          images: reader.result,
          conversationId: currentChat._id,
        };

        const response = await api.post("/message/create-new-message", message);
        setMessages([...messages, response.data.message]);
        await updateLastMessage("Photo");

        const receiverId = currentChat.members.find(
          (member) => member !== seller._id
        );

        socketId.emit("sendMessage", {
          senderId: seller._id,
          receiverId,
          images: reader.result,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Card className="w-full h-auto md:h-[85vh] mx-auto shadow-lg rounded-lg overflow-hidden">
      <CardContent className="flex flex-col h-full p-0 md:flex-row">
        {/* Conversations Sidebar */}
        <div className="w-full h-auto border-r md:w-1/3 md:h-full border-emerald-200">
          <div className="p-4 border-b border-emerald-200 bg-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-700">Messages</h2>
          </div>
          <ScrollArea className="h-64 md:h-[calc(85vh-65px)]">
            {conversations.map((conversation) => (
              <ConversationItem
                key={conversation._id}
                conversation={conversation}
                userData={userData}
                isActive={currentChat?._id === conversation._id}
                online={onlineUsers.some(user => 
                  conversation.members.includes(user.userId)
                )}
                onClick={() => setCurrentChat(conversation)}
              />
            ))}
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex flex-col flex-1 h-full">
          {currentChat ? (
            <>
              <ChatHeader
                userData={userData}
                activeStatus={onlineUsers.some(user => 
                  currentChat.members.includes(user.userId)
                )}
                onBack={() => setCurrentChat(null)}
              />
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <MessageBubble
                      key={index}
                      message={message}
                      isSender={message.sender === seller._id}
                      userData={userData}
                      time={message.createdAt}
                    />
                  ))}
                  <div ref={scrollRef} />
                </div>
              </ScrollArea>
              <MessageInput
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                onSend={handleSendMessage}
                onImageUpload={handleImageUpload}
              />
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-emerald-500">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMessages;
