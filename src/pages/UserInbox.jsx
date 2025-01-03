import Header from "@/components/header/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import api from "@/utils/server";
import { format } from "date-fns";
import { ArrowLeft, ChevronDown, Circle, ImageIcon, Send } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import  socketIO  from "socket.io-client";

const ENDPOINT = "https://multi-vendor-ys5e.onrender.com/";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

const MessageBubble = ({ message, isSender, userData, time }) => {
  return (
    <div className={`flex items-end space-x-2 ${isSender ? 'flex-row' : 'flex-row-reverse'}`}>
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
            className="max-w-[300px] rounded-lg mb-1"
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

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus
}) => {
  const [active, setActive] = useState(0);
  const [shopData, setShopData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getShopInfo = async () => {
      const shopId = data.members.find(id => id !== me);
      if (!shopId) return;

      try {
        const response = await api.get(`/shop/get-shop-info/${shopId}`);
        setShopData(response.data.shop);
      } catch (error) {
        console.error("Error fetching shop info:", error);
      }
    };

    getShopInfo();
  }, [data.members, me]);

  const handleClick = () => {
    setActive(index);
    setOpen(true);
    setCurrentChat(data);
    setUserData(shopData);
    setActiveStatus(online);
    navigate(`/inbox?chat=${data._id}`);
  };

  return (
    <div
      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
        active === index ? "bg-gray-50" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Avatar className="w-12 h-12">
            <AvatarImage src={shopData?.avatar?.url} alt={shopData?.name} className="object-cover"/>
            <AvatarFallback>{shopData?.name?.[0]}</AvatarFallback>
          </Avatar>
          {online && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {shopData?.name}
          </p>
          <p className="text-sm text-gray-500 truncate">
            {data.lastMessageId === me ? "You: " : `${shopData?.name?.split(" ")[0]}: `}
            {data.lastMessage}
          </p>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
};

const ChatWindow = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  userId,
  userData,
  activeStatus,
  scrollRef,
  handleImageUpload,
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b shadow-sm">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={userData?.avatar?.url} alt={userData?.name} className="object-cover"/>
              <AvatarFallback>{userData?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-semibold">{userData?.name}</h2>
              {activeStatus && (
                <div className="flex items-center text-sm text-green-500">
                  <Circle className="w-3 h-3 mr-1 fill-green-500" />
                  <span>Active Now</span>
                </div>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((item, index) => (
            <MessageBubble
              key={index}
              message={item}
              isSender={item.sender === userId}
              userData={userData}
              time={item.createdAt}
            />
          ))}
          <div ref={scrollRef} />
        </div>
        <ScrollBar />
      </ScrollArea>

      <div className="p-4 bg-white border-t">
        <form
          onSubmit={sendMessageHandler}
          className="flex items-center max-w-4xl mx-auto space-x-2"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-gray-500 shrink-0 hover:text-gray-600"
            onClick={() => document.getElementById('image-upload').click()}
          >
            <ImageIcon className="w-5 h-5" />
            <input
              id="image-upload"
              type="file"
              className="hidden"
              onChange={handleImageUpload}
              accept="image/*"
            />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="text-white bg-green-500 shrink-0 hover:bg-green-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [searchParams] = useSearchParams();
  const [conversations, setConversations] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userData, setUserData] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeStatus, setActiveStatus] = useState(false);
  const [open, setOpen] = useState(false);
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
          `/conversation/get-all-conversation-user/${user?._id}`
        );
        setConversations(response.data.conversations);
        
        // If chat ID is in URL, open that chat
        const chatId = searchParams.get("chat");
        if (chatId) {
          const chat = response.data.conversations.find(c => c._id === chatId);
          if (chat) {
            setCurrentChat(chat);
            setOpen(true);
          }
        }
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    if (user?._id) {
      getConversations();
    }
  }, [user?._id, searchParams]);

  useEffect(() => {
    if (user?._id) {
      socketId.emit("addUser", user._id);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }

    return () => socketId.off("getUsers");
  }, [user?._id]);

  useEffect(() => {
    const getMessages = async () => {
      if (currentChat?._id) {
        try {
          const response = await api.get(
            `/message/get-all-messages/${currentChat._id}`
          );
          setMessages(response.data.messages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    };

    getMessages();
  }, [currentChat?._id]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socketId.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const response = await api.post(`/message/create-new-message`, message);
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
        lastMessageId: user._id,
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
        const imageData = reader.result;
        const message = {
          sender: user._id,
          images: imageData,
          conversationId: currentChat._id,
        };

        const response = await api.post("/message/create-new-message", message);
        setMessages([...messages, response.data.message]);
        await updateLastMessage("Photo");

        const receiverId = currentChat.members.find(
          (member) => member !== user._id
        );

        socketId.emit("sendMessage", {
          senderId: user._id,
          receiverId,
          images: imageData,
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
    <div className="w-full min-h-screen bg-gray-50">
      <Header />
      {!open ? (
        <div className="max-w-4xl p-4 mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-gray-900">Messages</CardTitle>
          </CardHeader>
          <Card className="border-gray-200 shadow-md">
            <CardContent className="p-0">
              <ScrollArea className="h-[700px] w-full">
                {conversations.map((item, index) => (
                  <React.Fragment key={index}>
                    <MessageList
                      data={item}
                      index={index}
                      setOpen={setOpen}
                      setCurrentChat={setCurrentChat}
                      me={user?._id}
                      setUserData={setUserData}
                      online={onlineUsers.some(u => 
                        item.members.includes(u.userId)
                      )}
                      setActiveStatus={setActiveStatus}
                    />
                    {index < conversations.length - 1 && (
                      <Separator className="bg-gray-100" />
                    )}
                  </React.Fragment>
                ))}
                <ScrollBar />
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      ) : (
        <ChatWindow
          setOpen={setOpen}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessageHandler={sendMessageHandler}
          messages={messages}
          userId={user?._id}
          userData={userData}
          activeStatus={activeStatus}
          scrollRef={scrollRef}
          handleImageUpload={handleImageUpload}
        />
      )}
    </div>
  );
};

export default UserInbox;