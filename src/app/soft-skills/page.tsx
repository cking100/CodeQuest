
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader, Sparkles } from 'lucide-react';
import { provideSoftSkillsFeedback, type SoftSkillsFeedbackInput } from '@/ai/flows/soft-skills-feedback-flow';

type Scenario = {
  id: string;
  category: 'communication' | 'collaboration' | 'thinking';
  title: string;
  description: string;
  code: string | null;
  promptType: 'technical-writing' | 'explain-code' | 'problem-solving' | 'team-collaboration';
};

const allScenarios: Scenario[] = [
  // Communication
  {
    id: 'comm-1',
    category: 'communication',
    title: 'Technical Writing Practice',
    description: 'Good documentation is key. Summarize the functionality of the code snippet below as if you were writing it for a teammate.',
    code: `const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};`,
    promptType: 'technical-writing'
  },
  {
    id: 'comm-2',
    category: 'communication',
    title: 'Explain a Code Snippet',
    description: 'A product manager asks what this code does. Explain it in simple, non-technical terms.',
    code: `const memoize = (fn) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
};`,
     promptType: 'explain-code'
  },
  {
    id: 'comm-3',
    category: 'communication',
    title: 'Code Review Communication',
    description: 'You are reviewing a junior developer\'s code and notice they have written a function that is inefficient and hard to read. How would you phrase your feedback to be constructive and encouraging, rather than critical?',
    code: null,
    promptType: 'explain-code'
  },
   {
    id: 'comm-4',
    category: 'communication',
    title: 'Explaining a Delay',
    description: 'A non-technical stakeholder wants to know why a feature is taking longer than estimated. The reason is complex (e.g., refactoring legacy code). How do you explain this without getting too technical or sounding like you\'re making excuses?',
    code: null,
    promptType: 'problem-solving'
  },
  // Collaboration
  {
    id: 'collab-1',
    category: 'collaboration',
    title: 'Agile/Scrum Simulation',
    description: "You are the Scrum Master. A key stakeholder is asking for a major feature change just one day before the sprint review. How do you handle this to protect the team while acknowledging the stakeholder's request?",
    code: null,
    promptType: 'team-collaboration'
  },
  {
    id: 'collab-2',
    category: 'collaboration',
    title: 'Disagreeing with a Senior',
    description: "During a code review, a senior developer leaves feedback on your code that you strongly disagree with. Their suggestion would introduce what you believe is a new bug. How do you respond in the code review thread?",
    code: null,
    promptType: 'team-collaboration'
  },
   {
    id: 'collab-3',
    category: 'collaboration',
    title: 'Correcting an Estimate',
    description: "Your team is in a sprint planning meeting. Another engineer estimates a task will take them two days, but you know from your own experience with that part of the codebase that it's more likely a five-day task. What do you say or do?",
    code: null,
    promptType: 'team-collaboration'
  },
  // Thinking
  {
    id: 'think-1',
    category: 'thinking',
    title: 'Problem-Solving Scenario',
    description: 'You realize you are not going to be able to meet a project deadline. How do you communicate this to your manager? What steps do you propose?',
    code: null,
    promptType: 'problem-solving'
  },
  {
    id: 'think-2',
    category: 'thinking',
    title: 'Production Bug',
    description: 'A critical bug is reported in production that is affecting 10% of users. The cause is not immediately obvious. Describe the first 3 steps you would take to address the situation.',
    code: null,
    promptType: 'problem-solving'
  },
  {
    id: 'think-3',
    category: 'thinking',
    title: 'Prioritizing Technical Debt',
    description: 'You want to convince your product manager to allocate one full sprint to pay down technical debt. How do you make your case, focusing on business value rather than just technical purity?',
    code: null,
    promptType: 'problem-solving'
  },
];


const ScenarioCard = ({ scenario }: { scenario: Scenario }) => {
  const [response, setResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getFeedback = async () => {
    if (!response.trim()) return;
    setIsLoading(true);
    setFeedback('');
    try {
      const input: SoftSkillsFeedbackInput = {
        scenario: scenario.title,
        prompt: scenario.description,
        codeContext: scenario.code,
        userResponse: response,
        type: scenario.promptType,
      };
      const result = await provideSoftSkillsFeedback(input);
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Error getting feedback:', error);
      setFeedback('Sorry, I encountered an error while generating feedback. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{scenario.title}</CardTitle>
        <CardDescription>{scenario.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {scenario.code && (
          <pre className="bg-muted p-4 rounded-lg font-code text-sm">
            <code>{scenario.code}</code>
          </pre>
        )}
        <Textarea
          placeholder="Write your response here..."
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={6}
          disabled={isLoading}
        />
        <Button onClick={getFeedback} disabled={isLoading || !response.trim()}>
          {isLoading ? <Loader className="mr-2 animate-spin" /> : <Sparkles className="mr-2" />}
          Get Feedback
        </Button>
        {feedback && (
          <Alert>
            <Sparkles className="h-4 w-4" />
            <AlertTitle>AI Feedback</AlertTitle>
            <AlertDescription>
                <div className="prose prose-sm dark:prose-invert max-w-full" dangerouslySetInnerHTML={{ __html: feedback.replace(/\\n/g, '<br />') }} />
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};


export default function SoftSkillsPage() {
  const [randomScenarios, setRandomScenarios] = useState<{
    communication: Scenario | null;
    collaboration: Scenario | null;
    thinking: Scenario | null;
  }>({ communication: null, collaboration: null, thinking: null });

  useEffect(() => {
    const communicationScenarios = allScenarios.filter(s => s.category === 'communication');
    const collaborationScenarios = allScenarios.filter(s => s.category === 'collaboration');
    const thinkingScenarios = allScenarios.filter(s => s.category === 'thinking');

    setRandomScenarios({
      communication: communicationScenarios[Math.floor(Math.random() * communicationScenarios.length)],
      collaboration: collaborationScenarios[Math.floor(Math.random() * collaborationScenarios.length)],
      thinking: thinkingScenarios[Math.floor(Math.random() * thinkingScenarios.length)],
    });
  }, []);

  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle>Soft Skills Arena</CardTitle>
            <CardDescription>Technical skills get you the interview, but soft skills get you the job and help you thrive. Practice them here!</CardDescription>
        </CardHeader>
       </Card>
        <Tabs defaultValue="communication" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="communication">Communication</TabsTrigger>
                <TabsTrigger value="collaboration">Team Collaboration</TabsTrigger>
                <TabsTrigger value="thinking">Problem Solving</TabsTrigger>
            </TabsList>
            <TabsContent value="communication">
                {randomScenarios.communication && <ScenarioCard scenario={randomScenarios.communication} />}
            </TabsContent>
            <TabsContent value="collaboration">
                {randomScenarios.collaboration && <ScenarioCard scenario={randomScenarios.collaboration} />}
            </TabsContent>
            <TabsContent value="thinking">
                {randomScenarios.thinking && <ScenarioCard scenario={randomScenarios.thinking} />}
            </TabsContent>
        </Tabs>
    </div>
  );
}
