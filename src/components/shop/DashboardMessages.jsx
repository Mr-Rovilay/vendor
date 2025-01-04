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
            className="max-w-[300px] rounded-lg mb-1 object-cover"
          />
        )}
        {message.text && (
          <div
            className={`px-4 py-2 rounded-2xl max-w-md ${
              isSender 
                ? 'bg-green-500 text-white rounded-br-none' 
                : 'bg-gray-100 text-gray-900 rounded-bl-none'
            }`}
          >
            <p>{message.text}</p>
          </div>
        )}
        <span className="mt-1 text-xs text-gray-500">{format(time)}</span>
      </div>
    </div>
  );
};

const ChatHeader = ({ userData, activeStatus, onBack }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <Avatar className="w-10 h-10">
          <AvatarImage src={userData?.avatar?.url} className="object-cover"/>
          <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{userData?.name}</h3>
          <div className="flex items-center text-sm text-gray-500">
            {activeStatus && (
              <>
                <Circle className="w-3 h-3 mr-1 text-green-500 fill-green-500" />
                <span className="text-xs">Active now</span>
              </>
            )}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="w-5 h-5" />
      </Button>
    </div>
  );
};

const MessageInput = ({ newMessage, setNewMessage, onSend, onImageUpload }) => {
  return (
    <form onSubmit={onSend} className="p-4 border-t">
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
          className="text-gray-500"
          onClick={() => document.getElementById('image').click()}
        >
          <ImageIcon className="w-5 h-5" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" className="bg-green-500 hover:bg-green-600">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
};

const ConversationItem = ({ conversation, userData, isActive, online, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-3 hover:bg-gray-50 transition-colors ${
        isActive ? 'bg-gray-50' : ''
      }`}
    >
      <div className="relative">
        <Avatar className="w-12 h-12">
          <AvatarImage src={userData?.avatar?.url} className="object-cover"/>
          <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
        </Avatar>
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            online ? 'bg-green-500' : 'bg-gray-300'
          }`}
        />
      </div>
      <div className="flex-1 text-left">
        <h4 className="font-medium">{userData?.name}</h4>
        <p className="text-sm text-gray-500 truncate">
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
    if (seller?._id) {
      socketId.emit("addUser", seller._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
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
    <Card className="w-full h-[85vh] mx-auto">
      <CardContent className="flex h-full p-0">
        <div className="w-1/3 h-full border-r">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Messages</h2>
          </div>
          <ScrollArea className="h-[calc(85vh-65px)]">
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
            <div className="flex items-center justify-center flex-1 text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardMessages;