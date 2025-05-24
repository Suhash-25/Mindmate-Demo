
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm MindMate, your AI companion for mental well-being. How are you feeling today?",
      sentiment: 'neutral',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  
  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const analyzeSentiment = (text) => {
    const positiveWords = ['happy', 'good', 'great', 'excellent', 'wonderful', 'joy', 'love', 'positive'];
    const negativeWords = ['sad', 'bad', 'awful', 'terrible', 'depressed', 'anxious', 'worried', 'stressed', 'angry', 'upset', 'suicidal', 'kill', 'die'];
    
    const lowerText = text.toLowerCase();
    let positiveScore = 0;
    let negativeScore = 0;
    
    positiveWords.forEach(word => {
      if (lowerText.includes(word)) positiveScore++;
    });
    
    negativeWords.forEach(word => {
      if (lowerText.includes(word)) negativeScore++;
    });
    
    if (negativeWords.some(word => ['suicidal', 'kill', 'die'].includes(word) && lowerText.includes(word))) {
      setTimeout(() => {
        toast({
          title: "Emergency Resources",
          description: "If you're in crisis, please call the National Suicide Prevention Lifeline at 988 or text HOME to 741741 to reach the Crisis Text Line.",
          variant: "destructive",
          duration: 10000,
        });
      }, 1000);
    }
    
    if (positiveScore > negativeScore) return 'positive';
    if (negativeScore > positiveScore) return 'negative';
    return 'neutral';
  };

  const generateResponse = (userMessage, userSentiment) => {
    if (userSentiment === 'positive') {
      return "I'm glad to hear you're feeling good! What's been going well for you lately?";
    } else if (userSentiment === 'negative') {
      return "I'm sorry to hear you're not feeling great. Would you like to talk about what's bothering you? Remember that sharing your feelings can often help.";
    } else {
      return "Thank you for sharing. How else have you been spending your time lately?";
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userSentiment = analyzeSentiment(input);
    const userMessage = {
      role: 'user',
      content: input,
      sentiment: userSentiment,
    };
    
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const botResponse = generateResponse(input, userSentiment);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: botResponse,
        sentiment: 'neutral',
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] max-w-3xl mx-auto">
      <Card className="flex-1 flex flex-col p-4 overflow-hidden mb-4">
        <div className="flex-1 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "chat-bubble",
                message.role === 'user' ? "chat-bubble-user" : "chat-bubble-assistant"
              )}
            >
              {message.role === 'assistant' && (
                <div className="absolute -left-2 -top-2 bg-mindmate-accent p-1 rounded-full">
                  <Heart className="h-4 w-4 text-mindmate-primary" />
                </div>
              )}
              {message.content}
            </div>
          ))}
          {isTyping && (
            <div className="chat-bubble chat-bubble-assistant animate-pulse-gentle">
              <span>Typing</span>
              <span className="animate-pulse">...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </Card>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1 mindmate-input"
        />
        <Button type="submit" className="mindmate-btn mindmate-btn-primary">
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
