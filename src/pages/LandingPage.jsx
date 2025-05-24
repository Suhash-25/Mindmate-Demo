
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BrainLogo from '@/components/BrainLogo';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/5 p-4">
      <div className="text-center max-w-2xl animate-fade-in">
        <BrainLogo size={80} />
        <h1 className="text-5xl font-bold font-display mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Welcome to MindMate
        </h1>
        <p className="text-xl text-foreground/80 mb-8">
          Your AI companion for mental well-being. Track your mood, journal your thoughts, and chat with our supportive AI.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={() => navigate("/login")}
            size="lg"
            className="px-8"
          >
            Get Started
          </Button>
          <Button 
            onClick={() => navigate("/register")}
            variant="outline"
            size="lg"
            className="px-8"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
