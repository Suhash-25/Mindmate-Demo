
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Calendar, ArrowRight, CheckCircle } from 'lucide-react';
import BrainLogo from '@/components/BrainLogo';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BrainLogo size={32} />
          <span className="text-lg font-display font-semibold text-primary">MindMate</span>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => navigate('/login')}>
            Sign In
          </Button>
          <Button onClick={() => navigate('/register')}>
            Sign Up
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="inline-block mb-6">
            <BrainLogo size={80} />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Your Emotional Wellbeing Companion
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            An AI companion that understands your emotions and helps you navigate your mental wellbeing journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              className="text-lg px-8 py-6 group"
              onClick={() => navigate('/register')}
              size="lg"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-6"
              onClick={() => navigate('/login')}
              size="lg"
            >
              Sign In
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-primary" />
              <span>Private & Secure</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-primary" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-primary" />
              <span>Personalized</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-primary" />
              <span>Science-backed</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Features Designed for Your Wellbeing
          </h2>
          
          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Emotion-Aware Chat</h3>
                <p className="text-muted-foreground">
                  AI-powered conversations that understand and respond to your emotions, providing support when you need it most.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-secondary/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-secondary/10 p-3 rounded-full mb-4">
                  <BrainLogo size={24} />
                </div>
                <h3 className="font-semibold text-xl mb-3">Mood Tracking</h3>
                <p className="text-muted-foreground">
                  Track your emotional patterns to gain insights into your well-being and identify what influences your mood.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-accent/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
                <div className="bg-accent/10 p-3 rounded-full mb-4">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Guided Journaling</h3>
                <p className="text-muted-foreground">
                  Express your thoughts with AI-assisted prompts for self-reflection and personal growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BrainLogo size={24} />
            <span className="text-lg font-display font-semibold text-primary">MindMate</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MindMate. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
