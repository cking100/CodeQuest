
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gem, Crown, Zap, PlusSquare, Footprints, BrainCircuit, BarChart, Users, MessageSquare, Mic } from 'lucide-react';

const badges = [
  {
    icon: Gem,
    title: 'Diamond Coder',
    description: 'Awarded for solving your first "Hard" difficulty challenge.',
    unlocked: true,
  },
  {
    icon: Crown,
    title: 'Challenge Conqueror',
    description: 'Awarded for solving every single challenge on the platform.',
    unlocked: false,
  },
  {
    icon: Zap,
    title: 'AI Vanquisher',
    description: 'Awarded for winning a Live Battle against the AI.',
    unlocked: true,
  },
  {
    icon: PlusSquare,
    title: 'Community Contributor',
    description: 'Awarded for submitting a new challenge for review.',
    unlocked: false,
  },
  {
    icon: Footprints,
    title: 'First Steps',
    description: 'Awarded for solving your first "Easy" challenge.',
    unlocked: true,
  },
  {
    icon: BrainCircuit,
    title: 'Persistent Problem-Solver',
    description: 'Awarded for solving 10 challenges across any difficulty.',
    unlocked: true,
  },
  {
    icon: BarChart,
    title: 'Algorithm Ace',
    description: 'Awarded for using the Algorithm Visualizer to understand a sorting algorithm.',
    unlocked: false,
  },
  {
    icon: Users,
    title: 'Team Player',
    description: 'Awarded for completing a "Team Collaboration" soft skill exercise.',
    unlocked: true,
  },
   {
    icon: MessageSquare,
    title: 'Eloquent Explainer',
    description: 'Awarded for getting feedback on an "Explain Code" exercise.',
    unlocked: false,
  },
  {
    icon: Mic,
    title: 'Voice Commander',
    description: 'Awarded for trying out the Voice Coding feature.',
    unlocked: false,
  },
];

export default function MyBadgesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Badges</CardTitle>
          <CardDescription>A collection of all the badges you've earned on your coding quest.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {badges.map((badge, index) => (
          <Card key={index} className={`transition-all ${!badge.unlocked ? 'opacity-40 grayscale' : 'border-primary/50 shadow-lg'}`}>
            <CardHeader className="items-center text-center">
              <div className={`flex items-center justify-center w-16 h-16 rounded-full mb-4 ${badge.unlocked ? 'bg-primary/10' : 'bg-muted'}`}>
                <badge.icon className={`w-8 h-8 ${badge.unlocked ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <CardTitle>{badge.title}</CardTitle>
              <CardDescription>{badge.description}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Badge variant={badge.unlocked ? 'default' : 'secondary'}>
                {badge.unlocked ? 'Unlocked' : 'Locked'}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
