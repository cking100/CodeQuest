import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { learningPaths } from '@/lib/learning-paths-data';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Youtube } from 'lucide-react';
export default function Paths() {
  return (
    <div className="hii">
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
                    <div className="centre">
                      <div className="item">
                        {index + 1}
                      </div>
                      {module.title}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="proprtyu">
                    <p className="comp">{module.description}</p>
                    {module.youtubeLink && (
                      <Button asChild variant="outline">
                        <Link href={module.youtubeLink} target="_blank" rel="noopener noreferrer">
                          <Youtube className="mr" />
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
