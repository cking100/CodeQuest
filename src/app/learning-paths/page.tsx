import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { learningPaths } from '@/lib/learning-paths-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';

export default function LearningPathsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Learning Paths</CardTitle>
          <CardDescription>Follow structured paths to master new technologies and concepts.</CardDescription>
        </CardHeader>
      </Card>

      {learningPaths.map((path) => (
        <Card key={path.id}>
          <CardHeader>
            <CardTitle>{path.title}</CardTitle>
            <CardDescription>{path.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {path.modules.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center bg-primary text-primary-foreground rounded-full w-8 h-8 text-sm">
                        {index + 1}
                      </div>
                      {module.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-16">
                    <p className="mb-4">{module.description}</p>
                    {module.youtubeLink && (
                      <Button asChild variant="outline">
                        <Link href={module.youtubeLink} target="_blank" rel="noopener noreferrer">
                          <Youtube className="mr-2" />
                          Watch on YouTube
                        </Link>
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
