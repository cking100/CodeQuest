import Link from 'next/link';
import { challenges } from '@/lib/challenges-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Challenge } from '@/lib/challenges-data';

function ChallengeTable({ challenges, difficulty }: { challenges: Challenge[]; difficulty: 'Easy' | 'Medium' | 'Hard' }) {
  const filteredChallenges = challenges.filter(c => c.difficulty === difficulty);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="text-right">Difficulty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredChallenges.map((challenge) => (
          <TableRow key={challenge.id}>
            <TableCell className="font-medium">
              <Link href={`/challenges/${challenge.id}`} className="hover:underline">
                {challenge.title}
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">{challenge.category}</TableCell>
            <TableCell className="text-right">
              <Badge
                variant={
                  challenge.difficulty === 'Easy'
                    ? 'default'
                    : challenge.difficulty === 'Medium'
                    ? 'secondary'
                    : 'destructive'
                }
                className={
                    challenge.difficulty === 'Easy' ? 'bg-green-600/80 text-primary-foreground' : 
                    challenge.difficulty === 'Medium' ? 'bg-yellow-600/80 text-primary-foreground' : 
                    'bg-destructive text-destructive-foreground'
                }
              >
                {challenge.difficulty}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function ChallengesPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Coding Challenges</CardTitle>
        <CardDescription>Sharpen your skills with our collection of coding challenges.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="easy" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="easy">Easy</TabsTrigger>
            <TabsTrigger value="medium">Medium</TabsTrigger>
            <TabsTrigger value="hard">Hard</TabsTrigger>
          </TabsList>
          <TabsContent value="easy">
            <ChallengeTable challenges={challenges} difficulty="Easy" />
          </TabsContent>
          <TabsContent value="medium">
            <ChallengeTable challenges={challenges} difficulty="Medium" />
          </TabsContent>
          <TabsContent value="hard">
            <ChallengeTable challenges={challenges} difficulty="Hard" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
