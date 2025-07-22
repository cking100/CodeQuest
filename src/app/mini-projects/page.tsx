import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MiniProjectsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mini Projects</CardTitle>
        <CardDescription>Apply your skills by building fun, small-scale projects.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This area will provide a list of guided mini-projects to help solidify learning and build a practical portfolio.</p>
      </CardContent>
    </Card>
  );
}
