
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Calendar } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  prompt?: string;
}

// Guided prompts to help with journaling
const JOURNAL_PROMPTS = [
  "What made you smile today?",
  "Write about three things you're grateful for today.",
  "What was challenging today, and how did you handle it?",
  "What's something you're looking forward to?",
  "Describe a moment that made you feel proud recently.",
  "What's something you want to improve about yourself?",
  "Write about a person who has positively influenced your life.",
  "What self-care activity would benefit you most right now?",
  "What are you feeling anxious about, and why?",
  "Write a letter to your future self.",
];

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newEntry, setNewEntry] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedEntryId, setSelectedEntryId] = useState<string | null>(null);
  
  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (error) {
        console.error('Error parsing journal entries from localStorage', error);
      }
    }
    
    // Set a random prompt
    getRandomPrompt();
  }, []);
  
  // Save entries to localStorage when they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('journalEntries', JSON.stringify(entries));
    }
  }, [entries]);
  
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
    setCurrentPrompt(JOURNAL_PROMPTS[randomIndex]);
  };
  
  const handleSaveEntry = () => {
    if (!newEntry.trim()) return;
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newJournalEntry: JournalEntry = {
      id: Date.now().toString(),
      date: `${formattedDate} ${formattedTime}`,
      content: newEntry,
      prompt: currentPrompt,
    };
    
    setEntries([newJournalEntry, ...entries]);
    setNewEntry('');
    getRandomPrompt();
  };
  
  const handleViewEntry = (id: string) => {
    setSelectedEntryId(id);
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
    if (selectedEntryId === id) {
      setSelectedEntryId(null);
    }
  };
  
  const selectedEntry = selectedEntryId 
    ? entries.find(entry => entry.id === selectedEntryId) 
    : null;
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Tabs defaultValue="write" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="write">Write</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="write" className="animate-fade-in">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Journal Entry</CardTitle>
              <CardDescription>
                Express your thoughts freely or use our guided prompts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-accent/20 rounded-lg">
                  <p className="text-accent-foreground">
                    <span className="font-semibold">Today's Prompt:</span> {currentPrompt}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-2"
                    onClick={getRandomPrompt}
                  >
                    Get Another Prompt
                  </Button>
                </div>
                
                <textarea
                  className="mindmate-input w-full resize-none h-60"
                  placeholder="Begin writing your thoughts here..."
                  value={newEntry}
                  onChange={(e) => setNewEntry(e.target.value)}
                />
                
                <Button 
                  className="mindmate-btn mindmate-btn-primary w-full mt-4"
                  onClick={handleSaveEntry}
                  disabled={!newEntry.trim()}
                >
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="animate-fade-in">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">Your Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[450px] pr-4">
                  {entries.length > 0 ? (
                    <div className="space-y-2">
                      {entries.map((entry) => (
                        <div 
                          key={entry.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                            selectedEntryId === entry.id 
                              ? 'bg-primary/10 border-primary' 
                              : 'hover:bg-muted'
                          }`}
                          onClick={() => handleViewEntry(entry.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">{entry.date}</span>
                            </div>
                          </div>
                          <p className="mt-2 line-clamp-2 text-sm">
                            {entry.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No journal entries yet.</p>
                      <p className="mt-2">Start writing to see your entries here.</p>
                    </div>
                  )}
                </ScrollArea>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="text-xl">
                  {selectedEntry ? 'Entry Details' : 'Select an Entry'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedEntry ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{selectedEntry.date}</span>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteEntry(selectedEntry.id)}
                      >
                        Delete
                      </Button>
                    </div>
                    
                    {selectedEntry.prompt && (
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <p className="text-sm text-accent-foreground">
                          <span className="font-semibold">Prompt:</span> {selectedEntry.prompt}
                        </p>
                      </div>
                    )}
                    
                    <ScrollArea className="h-[300px] pr-4">
                      <p className="whitespace-pre-wrap">{selectedEntry.content}</p>
                    </ScrollArea>
                  </div>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    <p>Select an entry from the list to view its details.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Journal;
