import { useState } from "react";
import { Eye, EyeOff, Bot, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import vaultaiLogo from "@/assets/vaultai-logo.png";

interface LoginPageProps {
  onLogin: (credentials: { email: string; password: string }) => void;
}

export const LoginPage = ({ onLogin }: LoginPageProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && credentials.password !== credentials.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (credentials.email && credentials.password) {
      onLogin({ email: credentials.email, password: credentials.password });
      toast({
        title: isSignUp ? "Account created" : "Welcome back",
        description: isSignUp ? "Your VaultAI account has been created" : "Successfully logged in",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 vault-glow rounded-full opacity-20" />
        <div className="absolute -bottom-8 -right-8 w-96 h-96 vault-glow rounded-full opacity-10" />
      </div>

      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-xl vault-border-glow relative z-10">
        <div className="text-center mb-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <img 
              src={vaultaiLogo} 
              alt="VaultAI Logo" 
              className="h-20 w-auto"
            />
          </div>
          
          {/* Brand name */}
          <h1 className="text-3xl font-bold vault-gradient bg-clip-text text-transparent mb-2">
            VaultAI
          </h1>
          
          {/* Tagline */}
          <p className="text-muted-foreground text-sm mb-6">
            Smart, secure conversational agent
          </p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Bot className="w-4 h-4" />
              <span>AI Powered</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>Secure</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email address"
              value={credentials.email}
              onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
              className="bg-input border-border transition-smooth focus:vault-border-glow"
              required
            />
          </div>

          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="bg-input border-border transition-smooth focus:vault-border-glow pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {isSignUp && (
            <div>
              <Input
                type="password"
                placeholder="Confirm password"
                value={credentials.confirmPassword}
                onChange={(e) => setCredentials(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-input border-border transition-smooth focus:vault-border-glow"
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full vault-gradient text-primary-foreground font-medium transition-smooth hover:opacity-90 vault-shadow"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-muted-foreground hover:text-primary transition-smooth"
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"
            }
          </button>
        </div>
      </Card>
    </div>
  );
};