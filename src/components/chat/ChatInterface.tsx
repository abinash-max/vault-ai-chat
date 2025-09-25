import { useState } from "react";
import { Send, Bot, User, Copy, Volume2, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isTranslated?: boolean;
  originalLanguage?: string;
}

const INDIAN_LANGUAGES = [
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు" },
  { code: "mr", name: "Marathi", nativeName: "मराठी" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
  { code: "ur", name: "Urdu", nativeName: "اردو" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm VaultAI, your smart and secure conversational agent. I can help you with various tasks including translation between English and Indian languages. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [translatedInput, setTranslatedInput] = useState("");
  const [outputText, setOutputText] = useState("");
  const [translatedOutput, setTranslatedOutput] = useState("");
  const [selectedInputLanguage, setSelectedInputLanguage] = useState("hi");
  const [selectedOutputLanguage, setSelectedOutputLanguage] = useState("hi");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isTranslatingInput, setIsTranslatingInput] = useState(false);
  const [isTranslatingOutput, setIsTranslatingOutput] = useState(false);

  const { toast } = useToast();

  const simulateTranslation = async (text: string, targetLanguage: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock translation - in real app, this would call a translation API
    const mockTranslations: Record<string, string> = {
      "hi": "नमस्ते, मैं आपकी सहायता कैसे कर सकता हूँ?",
      "bn": "হ্যালো, আমি কীভাবে আপনাকে সাহায্য করতে পারি?",
      "te": "హలో, నేను మీకు ఎలా సహాయం చేయగలను?",
      "ta": "வணக்கம், நான் உங்களுக்கு எப்படி உதவ முடியும்?",
    };

    return mockTranslations[targetLanguage] || `[Translated to ${targetLanguage}]: ${text}`;
  };

  const handleTranslateInput = async () => {
    if (!inputText || !selectedInputLanguage) return;
    
    setIsTranslatingInput(true);
    try {
      const translated = await simulateTranslation(inputText, selectedInputLanguage);
      setTranslatedInput(translated);
      toast({
        title: "Translation complete",
        description: "Input text has been translated",
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "Failed to translate input text",
        variant: "destructive",
      });
    } finally {
      setIsTranslatingInput(false);
    }
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text before generating a response",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      // Simulate AI response generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const botResponse = `Thank you for your message: "${inputText}". As VaultAI, I understand your query and here's my response. I can help you with translations, conversations, and various other tasks. Is there anything specific you'd like to know or discuss further?`;
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      setOutputText(botResponse);
      setInputText("");
      setTranslatedInput("");

      toast({
        title: "Response generated",
        description: "AI has responded to your message",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "Failed to generate AI response",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleTranslateOutput = async () => {
    if (!outputText || !selectedOutputLanguage) return;
    
    setIsTranslatingOutput(true);
    try {
      const translated = await simulateTranslation(outputText, selectedOutputLanguage);
      setTranslatedOutput(translated);
      toast({
        title: "Translation complete",
        description: "Output text has been translated",
      });
    } catch (error) {
      toast({
        title: "Translation failed",
        description: "Failed to translate output text",
        variant: "destructive",
      });
    } finally {
      setIsTranslatingOutput(false);
    }
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: `${type} copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy text",
        variant: "destructive",
      });
    }
  };

  const speakText = (text: string, languageCode?: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (languageCode) {
        utterance.lang = languageCode;
      }
      window.speechSynthesis.speak(utterance);
    } else {
      toast({
        title: "Not supported",
        description: "Text-to-speech is not supported in this browser",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="h-full flex flex-col gap-6">
      {/* Input Section */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Your Message</h3>
        </div>
        
        <div className="space-y-4">
          {/* Language Selection */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Translate to:</label>
            <Select value={selectedInputLanguage} onValueChange={setSelectedInputLanguage}>
              <SelectTrigger className="w-48 bg-input border-border transition-smooth focus:vault-border-glow">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border max-h-60">
                {INDIAN_LANGUAGES.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex flex-col">
                      <span>{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Input with inline buttons */}
          <div className="relative">
            <Textarea
              placeholder="Type your message here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[120px] bg-input border-border transition-smooth focus:vault-border-glow resize-none pr-24"
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleTranslateInput}
                disabled={!inputText || !selectedInputLanguage || isTranslatingInput}
                className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
              >
                {isTranslatingInput ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Languages className="w-4 h-4" />
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleGenerate}
                disabled={!inputText.trim() || isGenerating}
                className="h-8 w-8 p-0 rounded-full vault-gradient text-primary-foreground hover:opacity-90"
              >
                {isGenerating ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Translated Input Display */}
          {translatedInput && (
            <div className="p-3 bg-secondary/30 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Translated ({INDIAN_LANGUAGES.find(l => l.code === selectedInputLanguage)?.name})
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(translatedInput, "Translated input")}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(translatedInput, selectedInputLanguage)}
                    className="h-6 w-6 p-0"
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm">{translatedInput}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Output Section */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">AI Response</h3>
        </div>

        <div className="space-y-4">
          {/* Language Selection */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Translate to:</label>
            <Select value={selectedOutputLanguage} onValueChange={setSelectedOutputLanguage}>
              <SelectTrigger className="w-48 bg-input border-border transition-smooth focus:vault-border-glow">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border max-h-60">
                {INDIAN_LANGUAGES.map((language) => (
                  <SelectItem key={language.code} value={language.code}>
                    <div className="flex flex-col">
                      <span>{language.name}</span>
                      <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Output with inline translate button */}
          <div className="relative">
            <Textarea
              placeholder="AI response will appear here..."
              value={outputText}
              className="min-h-[120px] bg-input border-border transition-smooth focus:vault-border-glow resize-none pr-16"
              readOnly
            />
            <div className="absolute bottom-3 right-3">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleTranslateOutput}
                disabled={!outputText || !selectedOutputLanguage || isTranslatingOutput}
                className="h-8 w-8 p-0 rounded-full hover:bg-primary/10"
              >
                {isTranslatingOutput ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Languages className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Translated Output Display */}
          {translatedOutput && (
            <div className="p-3 bg-secondary/30 rounded-lg border border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">
                  Translated ({INDIAN_LANGUAGES.find(l => l.code === selectedOutputLanguage)?.name})
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(translatedOutput, "Translated response")}
                    className="h-6 w-6 p-0"
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => speakText(translatedOutput, selectedOutputLanguage)}
                    className="h-6 w-6 p-0"
                  >
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm">{translatedOutput}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Chat History */}
      <Card className="flex-1 p-6 bg-card/50 backdrop-blur-sm border-border">
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Conversation History</h3>
        </div>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg transition-smooth ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-12"
                    : "bg-secondary text-secondary-foreground mr-12"
                }`}
              >
                <div className="flex items-start gap-2">
                  {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 shrink-0" />}
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(message.text, "Message")}
                          className="h-6 w-6 p-0 hover:bg-white/10"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => speakText(message.text)}
                          className="h-6 w-6 p-0 hover:bg-white/10"
                        >
                          <Volume2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  {message.sender === "user" && <User className="w-4 h-4 mt-0.5 shrink-0" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};