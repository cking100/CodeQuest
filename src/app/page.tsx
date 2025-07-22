import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-4xl font-headline tracking-tight lg:text-5xl">
            Welcome to Code Quest!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">
            Explore the features using the navigation bar and sidebar. Your
            journey to coding mastery starts here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
