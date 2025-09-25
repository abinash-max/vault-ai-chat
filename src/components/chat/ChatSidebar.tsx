import { useState } from "react";
import { PlusCircle, MessageSquare, Trash2, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
  preview: string;
}

interface ChatSidebarProps {
  isCollapsed: boolean;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onLogout: () => void;
  currentChatId?: string;
  userEmail?: string;
}

export const ChatSidebar = ({ 
  isCollapsed, 
  onNewChat, 
  onSelectChat, 
  onLogout,
  currentChatId,
  userEmail = "user@example.com"
}: ChatSidebarProps) => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Translation & Chat Session",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      preview: "How to translate text from English to Hindi..."
    },
    {
      id: "2", 
      title: "AI Conversation",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      preview: "Discussing machine learning concepts..."
    },
    {
      id: "3",
      title: "Language Learning Help",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
      preview: "Learning Tamil phrases for travel..."
    }
  ]);

  const handleDeleteChat = (chatId: string) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== chatId));
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return timestamp.toLocaleDateString();
  };

  return (
    <Card className="h-full bg-card/80 backdrop-blur-xl border-border vault-border-glow flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Button
          onClick={onNewChat}
          className={`w-full vault-gradient text-primary-foreground transition-smooth hover:opacity-90 ${
            isCollapsed ? "px-2" : "px-4"
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">New Chat</span>}
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-2">
        {!isCollapsed && (
          <h3 className="text-sm font-medium text-muted-foreground px-2 mb-3">
            Recent Chats
          </h3>
        )}
        
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className={`group relative p-3 rounded-lg cursor-pointer transition-smooth hover:bg-secondary/50 ${
                currentChatId === chat.id ? "bg-secondary" : "bg-transparent"
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="flex items-start gap-2">
                <MessageSquare className="w-4 h-4 mt-0.5 text-primary shrink-0" />
                
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">
                      {chat.title}
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-1">
                      {chat.preview}
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">
                      {formatTimestamp(chat.timestamp)}
                    </div>
                  </div>
                )}
              </div>

              {!isCollapsed && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-smooth hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Chat</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this chat? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id);
                        }}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        {!isCollapsed && (
          <>
            <div className="flex items-center gap-2 px-2 py-1">
              <User className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground truncate">
                {userEmail}
              </span>
            </div>
            <Separator />
          </>
        )}
        
        <Button
          variant="ghost"
          onClick={onLogout}
          className={`w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth ${
            isCollapsed ? "px-2" : ""
          }`}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span className="ml-2">Sign Out</span>}
        </Button>
      </div>
    </Card>
  );
};