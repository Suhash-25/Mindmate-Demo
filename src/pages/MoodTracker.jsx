
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const EMOJIS = ['😢', '😔', '😐', '🙂', '😄'];

const MoodTracker = () => {
  const [moodData, setMoodData] = useState([]);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNote, setMoodNote] = useState('');
  const [averageMood, setAverageMood] = useState(0);
  
  useEffect(() => {
    const savedMoods = localStorage.getItem('moodData');
    if (savedMoods) {
      try {
        const parsedMoods = JSON.parse(savedMoods);
        setMoodData(parsedMoods);
        
        if (parsedMoods.length > 0) {
          const sum = parsedMoods.reduce((acc, curr) => acc + curr.mood, 0);
          setAverageMood(sum / parsedMoods.length);
        }
      } catch (error) {
        console.error('Error parsing mood data from localStorage', error);
      }
    }
  }, []);
  
  useEffect(() => {
    if (moodData.length > 0) {
      localStorage.setItem('moodData', JSON.stringify(moodData));
      
      const sum = moodData.reduce((acc, curr) => acc + curr.mood, 0);
      setAverageMood(sum / moodData.length);
    }
  }, [moodData]);
  
  const handleMoodSelect = (index) => {
    setSelectedMood(index);
  };
  
  const handleSaveMood = () => {
    if (selectedMood === null) return;
    
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    
    const newMood = {
      date: formattedDate,
      mood: selectedMood,
      note: moodNote.trim() || undefined,
    };
    
    const existingIndex = moodData.findIndex(item => item.date === formattedDate);
    
    if (existingIndex !== -1) {
      const updatedData = [...moodData];
      updatedData[existingIndex] = newMood;
      setMoodData(updatedData);
    } else {
      setMoodData([...moodData, newMood]);
    }
    
    setSelectedMood(null);
    setMoodNote('');
  };
  
  const chartData = moodData
    .slice()
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(item => ({
      date: item.date,
      mood: item.mood,
    }));
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="text-2xl">Mood Tracker</CardTitle>
          <CardDescription>
            Track your daily moods to gain insights into your emotional patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-medium">How are you feeling today?</h3>
            <div className="flex justify-between items-center">
              {EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  className={`mood-emoji ${
                    selectedMood === index ? 'scale-125 opacity-100' : 'opacity-50'
                  }`}
                  onClick={() => handleMoodSelect(index)}
                >
                  {emoji}
                </button>
              ))}
            </div>
            
            <textarea
              className="mindmate-input resize-none h-24 mt-4"
              placeholder="Add a note about your mood (optional)"
              value={moodNote}
              onChange={(e) => setMoodNote(e.target.value)}
            />
            
            <Button 
              className="mindmate-btn mindmate-btn-primary self-end"
              onClick={handleSaveMood}
              disabled={selectedMood === null}
            >
              Save Today's Mood
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {moodData.length > 0 && (
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl">Your Mood History</CardTitle>
            <CardDescription>
              View how your mood has changed over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Overall Mood</span>
                <span>{EMOJIS[Math.round(averageMood)]}</span>
              </div>
              <Progress value={averageMood * 25} className="h-2" />
            </div>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 4]} ticks={[0, 1, 2, 3, 4]} />
                  <Tooltip
                    formatter={(value) => [EMOJIS[value], "Mood"]}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#4A90E2"
                    strokeWidth={2}
                    dot={{ stroke: '#4A90E2', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MoodTracker;
