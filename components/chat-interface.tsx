"use client";

import { useState } from "react";
import { Send, Menu, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: number;
  content: string;
  sender: "user" | "llm";
};

export function ChatInterfaceComponent() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, content: "Hello! How can I assist you today?", sender: "llm" },
  ]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSignOutVisible, setIsSignOutVisible] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, content: input, sender: "user" },
      ]);
      setInput("");

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            content: `I understand you said: "${input}". How can I help you with that?`,
            sender: "llm",
          },
        ]);
      }, 1000);
    }
  };

  const handleNewChat = () => {
    setMessages([
      { id: 1, content: "Hello! How can I assist you today?", sender: "llm" },
    ]);
  };

  const handleSignOut = () => {
    // Implement sign out logic here
    console.log("User signed out");
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-0"
        } transition-all duration-300 ease-in-out overflow-hidden flex flex-col bg-secondary`}
      >
        <div className="p-4 flex-grow">
          <Button onClick={handleNewChat} className="w-full mb-4">
            <Plus className="mr-2 h-4 w-4" /> New Chat
          </Button>
          {/* Add chat history or other sidebar content here */}
        </div>
        <div className="p-4 border-t">
          <Button
            variant="secondary"
            size="lg"
            className="w-full justify-start text-md"
            onClick={() => setIsSignOutVisible(!isSignOutVisible)}
          >
            john.doe@gmail.com
          </Button>
          {isSignOutVisible && (
            <Button
              variant="destructive"
              className="w-full mt-2"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="ml-4 text-xl font-semibold">Chat with AI</h1>
        </div>

        {/* Message Area */}
        <ScrollArea className="flex-grow p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex space-x-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
