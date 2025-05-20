
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, MessageCircle, Calendar } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-blue-50 p-4">
      <div className="text-center max-w-3xl animate-fade-in">
        <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
          <Heart className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-mindmate-dark">
          MindMate
        </h1>
        <p className="text-xl md:text-2xl text-mindmate-dark/80 mb-8">
          Your emotionally intelligent AI companion for mental well-being
        </p>
        
        <Button 
          className="mindmate-btn mindmate-btn-primary text-lg px-8 py-6"
          onClick={() => navigate('/chat')}
        >
          Start Your Journey
        </Button>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mt-16">
          <Card className="mindmate-card">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <MessageCircle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Emotion-Aware Chat</h3>
              <p className="text-muted-foreground">
                AI-powered conversations that understand and respond to your emotions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mindmate-card">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-secondary/10 p-3 rounded-full mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Mood Tracking</h3>
              <p className="text-muted-foreground">
                Track your emotional patterns to gain insights into your well-being.
              </p>
            </CardContent>
          </Card>
          
          <Card className="mindmate-card">
            <CardContent className="pt-6 flex flex-col items-center text-center">
              <div className="bg-accent/10 p-3 rounded-full mb-4">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Guided Journaling</h3>
              <p className="text-muted-foreground">
                Express your thoughts with AI-assisted prompts for self-reflection.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
