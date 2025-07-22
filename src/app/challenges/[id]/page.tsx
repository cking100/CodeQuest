"use client";

import { useState } from 'react';
import { challenges } from '@/lib/challenges-data';
import { notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import { evaluateCode, type EvaluateCodeOutput } from '@/ai/flows/evaluate-code-flow';
import { useToast } from '@/hooks/use-toast';

export default function ChallengeDetailPage() {
  const params = useParams();
  const challengeId = typeof params.id === 'string' ? params.id : '';
  const challenge = challenges.find(c => c.id === challengeId);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState<EvaluateCodeOutput | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();
  
  if (!challenge) {
    notFound();
  }

  const handleRunCode = async () => {
    if (!code) {
      toast({
        title: 'No Code',
        description: 'Please write some code before running.',
        variant: 'destructive',
      });
      return;
    }
    setIsRunning(true);
    setOutput(null);
    try {
      const result = await evaluateCode({
        code,
        language,
        challengeId: challenge.id,
      });
      setOutput(result);
    } catch (error) {
      console.error('Error evaluating code:', error);
      toast({
        title: 'Evaluation Error',
        description: 'An unexpected error occurred while evaluating your code. Please try again.',
        variant: 'destructive',
      });
      setOutput({ success: false, output: 'An error occurred during evaluation.' });
    } finally {
      setIsRunning(false);
    }
  }

  const difficultyVariant = challenge.difficulty === 'Easy' ? 'default' : challenge.difficulty === 'Medium' ? 'secondary' : 'destructive';
  const difficultyClass = challenge.difficulty === 'Easy' ? 'bg-green-600/80 text-primary-foreground' : challenge.difficulty === 'Medium' ? 'bg-yellow-600/80 text-primary-foreground' : 'destructive';

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <Card className="flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle>{challenge.title}</CardTitle>
            <Badge variant={difficultyVariant} className={difficultyClass}>{challenge.difficulty}</Badge>
          </div>
          <CardDescription>{challenge.category}</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert flex-grow overflow-auto">
          <p>{challenge.description}</p>
        </CardContent>
        <CardFooter className="flex-col items-start gap-4 !p-6">
            <h3 className="font-semibold">Test Cases</h3>
            <div className="space-y-4 w-full">
                {challenge.testCases.map((tc, index) => (
                    <div key={index}>
                        <p className="font-mono text-sm"><strong>Input:</strong> {tc.input}</p>
                        <p className="font-mono text-sm"><strong>Expected:</strong> {tc.expected}</p>
                        {index < challenge.testCases.length - 1 && <Separator className="mt-2" />}
                    </div>
                ))}
            </div>
        </CardFooter>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
            <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="java">Java</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <Card className="flex-grow flex flex-col">
            <CardContent className="p-0 flex-grow flex flex-col">
                 <Textarea
                    placeholder={`Write your ${language} code here...`}
                    className="flex-grow w-full h-full rounded-b-none border-0 font-code text-base"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    />
            </CardContent>
        </Card>
        <div className="flex-shrink-0">
             <h3 className="font-semibold mb-2">Output</h3>
             <Card className="min-h-[100px]">
                <CardContent className="p-4">
                    {isRunning ? (
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Loader className="animate-spin w-4 h-4" />
                            <span>Running...</span>
                        </div>
                    ) : output ? (
                         <Alert variant={!output.success ? 'destructive' : 'default'} className={output.success ? 'bg-green-600/10 border-green-600/50' : ''}>
                            {!output.success ? <XCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                            <AlertTitle>{!output.success ? 'Test Failed' : 'Success'}</AlertTitle>
                            <AlertDescription>
                                <pre className="whitespace-pre-wrap font-code">{output.output}</pre>
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <p className="text-muted-foreground">Click "Run Code" to see the output.</p>
                    )}
                </CardContent>
            </Card>
        </div>
        <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleRunCode} disabled={isRunning}>
              {isRunning && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Run Code
            </Button>
            <Button disabled={isRunning || !output?.success}>Submit</Button>
        </div>
      </div>
    </div>
  );
}
