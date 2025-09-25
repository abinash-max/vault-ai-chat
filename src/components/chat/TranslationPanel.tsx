import { useState } from "react";
import { Languages, ArrowRight, Copy, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface TranslationPanelProps {
  inputText: string;
  onInputChange: (text: string) => void;
  translatedInput: string;
  onTranslatedInputChange: (text: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  isTranslating: boolean;
  onTranslateInput: () => void;
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

export const TranslationPanel = ({
  inputText,
  onInputChange,
  translatedInput,
  onTranslatedInputChange,
  selectedLanguage,
  onLanguageChange,
  isTranslating,
  onTranslateInput,
}: TranslationPanelProps) => {
  const { toast } = useToast();

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

  const getSelectedLanguageInfo = () => {
    return INDIAN_LANGUAGES.find(lang => lang.code === selectedLanguage);
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border">
      <div className="flex items-center gap-2 mb-4">
        <Languages className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Translation Panel</h3>
      </div>

      <div className="space-y-6">
        {/* Input Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">Input (English)</label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(inputText, "Input text")}
                disabled={!inputText}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(inputText, "en")}
                disabled={!inputText}
              >
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Type your message in English..."
            value={inputText}
            onChange={(e) => onInputChange(e.target.value)}
            className="min-h-[120px] bg-input border-border transition-smooth focus:vault-border-glow resize-none"
          />
        </div>

        {/* Language Selection & Translate Button */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Target Language</label>
            <Select value={selectedLanguage} onValueChange={onLanguageChange}>
              <SelectTrigger className="bg-input border-border transition-smooth focus:vault-border-glow">
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

          <Button
            onClick={onTranslateInput}
            disabled={!inputText || !selectedLanguage || isTranslating}
            className="vault-gradient text-primary-foreground transition-smooth hover:opacity-90 disabled:opacity-50 w-full"
          >
            {isTranslating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span>Translating...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Translate</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>

        {/* Translated Text */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Translated ({getSelectedLanguageInfo()?.name || "Select language"})
            </label>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(translatedInput, "Translated text")}
                disabled={!translatedInput}
              >
                <Copy className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speakText(translatedInput, selectedLanguage)}
                disabled={!translatedInput}
              >
                <Volume2 className="w-3 h-3" />
              </Button>
            </div>
          </div>
          <Textarea
            placeholder="Translated text will appear here..."
            value={translatedInput}
            onChange={(e) => onTranslatedInputChange(e.target.value)}
            className="min-h-[120px] bg-input border-border transition-smooth focus:vault-border-glow resize-none"
            readOnly
          />
        </div>
      </div>
    </Card>
  );
};