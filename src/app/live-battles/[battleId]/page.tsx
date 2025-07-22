
"use client";

import { useSearchParams, notFound, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { challenges, type Challenge } from '@/lib/challenges-data';
import { User, Copy, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export default function BattleRoomPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const battleId = typeof params.battleId === 'string' ? params.battleId : '';
  const challengeId = searchParams.get('challengeId');
  const challenge = challenges.find(c => c.id === challengeId);
  const { toast } = useToast();
  const [battleUrl, setBattleUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setBattleUrl(window.location.href);
    }
  }, []);

  if (!challenge || !battleId) {
    notFound();
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(battleUrl);
    toast({
      title: 'Link Copied!',
      description: 'The battle link has been copied to your clipboard.',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className='flex justify-between items-start'>
            <CardTitle>{challenge.title}</CardTitle>
            <Button variant="outline" onClick={handleCopyLink}>
              <Copy className="mr-2" />
              Copy Invite Link
            </Button>
          </div>
          <CardDescription>{challenge.category}</CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert">
          <p>{challenge.description}</p>
        </CardContent>
      </Card>

      <div className="text-center text-muted-foreground">
        <Users className="mx-auto mb-2" />
        Waiting for opponent...
      </div>
      
      {/* Placeholder for the two-player view */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-2">
            <User />
            <CardTitle className="text-xl">Player 1</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <Textarea
              placeholder="Player 1's code will appear here..."
              className="flex-grow w-full h-full rounded-b-lg rounded-t-none border-0 font-code text-base"
              readOnly
            />
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-2">
            <User />
            <CardTitle className="text-xl">Player 2</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <Textarea
              placeholder="Player 2's code will appear here..."
              className="flex-grow w-full h-full rounded-b-lg rounded-t-none border-0 font-code text-base"
              readOnly
            />
          </CardContent>
        </Card>
      </div>
       <div className="flex justify-center">
            <Button disabled>Start Battle (once opponent joins)</Button>
        </div>
    </div>
  );
}
