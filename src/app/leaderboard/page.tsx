import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeaderboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>See where you stand among the best coders on the platform.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is where the global and friends-only leaderboards will be displayed, tracking points, ranks, and achievements.</p>
      </CardContent>
    </Card>
  );
}
