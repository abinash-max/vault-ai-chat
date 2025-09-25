import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bot, Shield, Languages, MessageSquare } from "lucide-react";
import vaultaiLogo from "@/assets/vaultai-logo.png";

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 vault-glow rounded-full opacity-20" />
        <div className="absolute -bottom-8 -right-8 w-96 h-96 vault-glow rounded-full opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] vault-glow rounded-full opacity-5" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src={vaultaiLogo} 
            alt="VaultAI Logo" 
            className="h-32 w-auto vault-glow"
          />
        </div>

        {/* Brand name */}
        <h1 className="text-6xl md:text-7xl font-bold vault-gradient bg-clip-text text-transparent mb-4">
          VaultAI
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Smart, secure conversational agent with advanced translation capabilities
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <Bot className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">AI Powered</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <Shield className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Secure</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <Languages className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Multi-lingual</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border">
            <MessageSquare className="w-8 h-8 text-primary" />
            <span className="text-sm font-medium">Conversational</span>
          </div>
        </div>

        {/* Call to Action */}
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Experience the future of AI conversations with seamless translation between English and Indian languages
          </p>
          
          <Button asChild size="lg" className="vault-gradient text-primary-foreground font-medium px-8 py-6 text-lg vault-shadow">
            <Link to="/login">
              Get Started
            </Link>
          </Button>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Supporting 12+ Indian languages including Hindi, Bengali, Telugu, Tamil, and more
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
