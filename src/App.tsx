import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./components/auth/LoginPage";
import { MainLayout } from "./components/layout/MainLayout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userCredentials, setUserCredentials] = useState<{ email: string; password: string } | null>(null);

  const handleLogin = (credentials: { email: string; password: string }) => {
    // In a real app, this would validate credentials against a backend
    setUserCredentials(credentials);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserCredentials(null);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? (
                  <Navigate to="/chat" replace />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              } 
            />
            <Route 
              path="/chat" 
              element={
                isAuthenticated ? (
                  <MainLayout onLogout={handleLogout} userEmail={userCredentials?.email} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/chat" : "/login"} replace />
              } 
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
