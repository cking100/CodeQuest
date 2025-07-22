
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { challenges, type Challenge } from '@/lib/challenges-data';

// SpeechRecognition might be prefixed in some browsers
const SpeechRecognition =
  (typeof window !== 'undefined' && window.SpeechRecognition) ||
  (typeof window !== 'undefined' && (window as any).webkitSpeechRecognition);

export default function VoiceCodingPage() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasPermission, setHasPermission] = useState(true);
  const [isApiSupported, setIsApiSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Select a random challenge on component mount
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);

    if (!SpeechRecognition) {
      setIsApiSupported(false);
      return;
    }

    // Initialize speech recognition
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript((prev) => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setHasPermission(false);
      }
       toast({
        title: 'Voice Error',
        description: `An error occurred: ${event.error}`,
        variant: 'destructive',
      });
    };
    
    recognition.onend = () => {
      // Automatically restart if it's supposed to be listening
      if (isListening) {
        recognition.start();
      }
    };

    recognitionRef.current = recognition;
  }, []); // isListening is intentionally omitted to avoid re-creating recognition instance

  const handleToggleListening = async () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
      toast({ title: 'Voice Disabled', description: 'Stopped listening to your microphone.' });
    } else {
        try {
            // Check for microphone permission
            await navigator.mediaDevices.getUserMedia({ audio: true });
            setHasPermission(true);
            recognitionRef.current.start();
            setIsListening(true);
            toast({ title: 'Voice Enabled', description: 'Listening to your microphone.' });
        } catch (err) {
            console.error('Microphone access denied:', err);
            setHasPermission(false);
            toast({
                title: 'Microphone Access Denied',
                description: 'Please enable microphone permissions in your browser settings.',
                variant: 'destructive',
            });
        }
    }
  };

  const difficultyVariant = challenge?.difficulty === 'Easy' ? 'default' : challenge?.difficulty === 'Medium' ? 'secondary' : 'destructive';
  const difficultyClass = challenge?.difficulty === 'Easy' ? 'bg-green-600/80 text-primary-foreground' : challenge?.difficulty === 'Medium' ? 'bg-yellow-600/80 text-primary-foreground' : 'destructive';

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Voice Coding</CardTitle>
          <CardDescription>Code hands-free! Use your voice to write the solution for the challenge below.</CardDescription>
        </CardHeader>
        <CardContent>
            {!isApiSupported ? (
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Browser Not Supported</AlertTitle>
                    <AlertDescription>
                        Your browser does not support the Web Speech API. Please try Chrome or Edge.
                    </AlertDescription>
                </Alert>
            ) : !hasPermission && (
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Microphone Access Required</AlertTitle>
                    <AlertDescription>
                        You have denied microphone access. Please enable it in your browser settings to use this feature.
                    </AlertDescription>
                </Alert>
            )}
        </CardContent>
      </Card>
      
      {challenge && (
          <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle>{challenge.title}</CardTitle>
                    <Badge variant={difficultyVariant} className={difficultyClass}>{challenge.difficulty}</Badge>
                </div>
                <CardDescription>{challenge.category}</CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="prose prose-sm dark:prose-invert">{challenge.description}</p>
              </CardContent>
          </Card>
      )}

      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
            <Button onClick={handleToggleListening} disabled={!isApiSupported} size="lg">
                {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
                {isListening ? 'Stop Listening' : 'Start Listening'}
            </Button>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Your Code</CardTitle>
                <CardDescription>Your transcribed code will appear here. You can also type normally.</CardDescription>
            </CardHeader>
            <CardContent>
                <Textarea
                    placeholder="Say 'function hello world...' or start typing."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    rows={15}
                    className="font-code text-base"
                />
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
