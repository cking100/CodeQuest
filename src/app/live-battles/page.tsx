
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { challenges, type Challenge } from '@/lib/challenges-data';
import { Bot, User, BrainCircuit, Play, Loader, ShieldCheck, Link as LinkIcon, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { generateBattleSolution } from '@/ai/flows/generate-battle-solution';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function BattleWithAI() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [aiCode, setAiCode] = useState('AI is thinking...');
  const [isBattling, setIsBattling] = useState(false);
  const [winner, setWinner] = useState<'user' | 'ai' | 'draw' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);

  const startBattle = useCallback(() => {
    setIsBattling(true);
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
    setUserCode('');
    setWinner(null);
    setAiCode('AI is thinking...');
    setIsAiThinking(true);

    generateBattleSolution({ challenge: randomChallenge, language: 'python' })
      .then(result => {
        setAiCode(result.code);
      })
      .catch(error => {
        console.error("AI failed to generate a solution:", error);
        setAiCode('// AI failed to generate a solution.');
      })
      .finally(() => {
        setIsAiThinking(false);
      });
  }, []);

  const handleFinish = () => {
    setIsLoading(true);
    // Simulate determining winner. A real implementation would compare code optimization.
    setTimeout(() => {
      const outcomes: Array<'user' | 'ai' | 'draw'> = ['user', 'ai', 'draw'];
      const randomWinner = outcomes[Math.floor(Math.random() * outcomes.length)];
      setWinner(randomWinner);
      setIsLoading(false);
    }, 1000);
  };
  
  const handlePlayAgain = () => {
    setIsBattling(false);
    setTimeout(startBattle, 100);
  }

  const difficultyVariant = challenge?.difficulty === 'Easy' ? 'default' : challenge?.difficulty === 'Medium' ? 'secondary' : 'destructive';
  const difficultyClass = challenge?.difficulty === 'Easy' ? 'bg-green-600/80 text-primary-foreground' : challenge?.difficulty === 'Medium' ? 'bg-yellow-600/80 text-primary-foreground' : 'destructive';


  if (!isBattling) {
    return (
      <div className="text-center">
        <h3 className="text-lg font-semibold">Ready for a challenge?</h3>
        <p className="text-muted-foreground mb-4">Test your skills against our AI.</p>
        <Button onClick={startBattle}>
          <Play className="mr-2" /> Start Battle
        </Button>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{challenge.title}</CardTitle>
            <Badge variant={difficultyVariant} className={difficultyClass}>{challenge.difficulty}</Badge>
          </div>
          <CardDescription>{challenge.category}</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <p>{challenge.description}</p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* User's Screen */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <User />
              <CardTitle className="text-xl">Your Code</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <Textarea
              placeholder="Write your code here..."
              className="flex-grow w-full h-full rounded-b-lg rounded-t-none border-0 font-code text-base"
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              disabled={!!winner}
            />
          </CardContent>
        </Card>

        {/* AI's Screen */}
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
             <div className="flex items-center gap-2">
              <Bot />
              <CardTitle className="text-xl">AI's Code</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <div className="relative w-full h-full">
              {isAiThinking && !winner && (
                <div className="absolute inset-0 bg-muted/40 flex items-center justify-center">
                  <Loader className="animate-spin mr-2" /> AI is thinking...
                </div>
              )}
              <Textarea
                placeholder="AI is generating its solution..."
                readOnly
                className="flex-grow w-full h-full rounded-b-lg rounded-t-none border-0 font-code text-base bg-muted/40"
                value={winner ? aiCode : (isAiThinking ? '' : 'AI has finished. Submit your code to compare.')}
              />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center flex-col items-center gap-4">
        {winner && (
           <Alert variant={winner === 'user' ? 'default' : 'destructive'} className={winner === 'user' ? 'bg-green-600/10 border-green-600/50' : ''}>
            <ShieldCheck className="h-4 w-4" />
            <AlertTitle>
              {winner === 'user' && 'Congratulations, you win!'}
              {winner === 'ai' && 'The AI wins this round!'}
              {winner === 'draw' && "It's a draw!"}
            </AlertTitle>
            <AlertDescription>
                {winner === 'user' && 'Your solution was more optimized.'}
                {winner === 'ai' && 'The AI\'s solution was more optimized. Better luck next time!'}
                {winner === 'draw' && "Both solutions were equally optimized."}
            </AlertDescription>
          </Alert>
        )}
        <div className="flex justify-center gap-4">
            <Button onClick={winner ? handlePlayAgain : handleFinish} disabled={isLoading || !userCode.trim() || isAiThinking}>
                {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                {winner ? 'Play Again' : 'Finish & Compare'}
            </Button>
            {winner && (
                <Button onClick={startBattle} variant="secondary">
                    New Challenge
                </Button>
            )}
        </div>
      </div>
    </div>
  );
}

function BattleWithFriend() {
  const router = useRouter();
  const { toast } = useToast();

  const handleCreateBattle = () => {
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    const battleId = crypto.randomUUID();
    const battleUrl = `/live-battles/${battleId}?challengeId=${randomChallenge.id}`;

    // For now, we'll just navigate. A real implementation would store this battle session.
    router.push(battleUrl);
  };

  return (
    <div className="text-center">
      <h3 className="text-lg font-semibold">Challenge a Friend</h3>
      <p className="text-muted-foreground mb-4">Start a new battle and share the link with a friend to begin.</p>
      <Button onClick={handleCreateBattle}>
        <Play className="mr-2" /> Create Battle Room
      </Button>
    </div>
  );
}


export default function LiveBattlesPage() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Battles</CardTitle>
        <CardDescription>Challenge another coder to a real-time coding duel.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ai" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ai"><BrainCircuit className="mr-2" />Battle with AI</TabsTrigger>
            <TabsTrigger value="friend"><Users className="mr-2" />Battle with Friend</TabsTrigger>
          </TabsList>
          <TabsContent value="ai" className="pt-6">
            <BattleWithAI />
          </TabsContent>
          <TabsContent value="friend" className="pt-6">
             <BattleWithFriend />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
