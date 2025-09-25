import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatSidebar } from "../chat/ChatSidebar";
import { ChatInterface } from "../chat/ChatInterface";

interface MainLayoutProps {
  onLogout: () => void;
  userEmail?: string;
}

export const MainLayout = ({ onLogout, userEmail }: MainLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>("1");

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    setCurrentChatId(newChatId);
    // In a real app, this would create a new chat session
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // In a real app, this would load the selected chat
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 vault-glow rounded-full opacity-5" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 vault-glow rounded-full opacity-5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] vault-glow rounded-full opacity-3" />
      </div>

      {/* Sidebar */}
      <div 
        className={`relative z-10 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "w-16" : "w-80"
        }`}
      >
        <div className="h-full p-4">
          <ChatSidebar
            isCollapsed={isSidebarCollapsed}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onLogout={onLogout}
            currentChatId={currentChatId}
            userEmail={userEmail}
          />
        </div>

        {/* Sidebar Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="absolute -right-3 top-6 z-20 bg-card border border-border vault-border-glow hover:bg-secondary transition-smooth"
        >
          {isSidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <div className="h-full p-6">
          <div className="max-w-7xl mx-auto h-full">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold vault-gradient bg-clip-text text-transparent">
                VaultAI Chat
              </h1>
              <p className="text-muted-foreground mt-1">
                Smart, secure conversational agent with translation capabilities
              </p>
            </div>

            {/* Chat Interface */}
            <div className="h-[calc(100vh-8rem)] overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};