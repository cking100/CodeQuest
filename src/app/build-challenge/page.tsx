
'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const testCaseSchema = z.object({
  input: z.string().min(1, 'Test case input is required.'),
  expected: z.string().min(1, 'Expected output is required.'),
});

const challengeFormSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters long.'),
  description: z.string().min(20, 'Description must be at least 20 characters long.'),
  category: z.string().min(3, 'Category must be at least 3 characters long.'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard'], {
    required_error: 'You need to select a difficulty.',
  }),
  testCases: z.array(testCaseSchema).min(1, 'At least one test case is required.'),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

export default function BuildChallengePage() {
  const { toast } = useToast();
  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      testCases: [{ input: '', expected: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'testCases',
  });

  function onSubmit(data: ChallengeFormValues) {
    // Here you would typically send the data to your backend for review and approval.
    console.log('Challenge submitted:', data);
    toast({
      title: 'Challenge Submitted!',
      description: 'Your challenge has been sent for review. Thank you for your contribution!',
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build a Challenge</CardTitle>
        <CardDescription>Create your own coding challenge and share it with the community. Submissions will be reviewed before publishing.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenge Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Two Sum'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the problem, input, and expected output..." rows={6} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Arrays'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormLabel>Test Cases</FormLabel>
              <FormDescription className="mb-4">Provide at least one test case to verify solutions.</FormDescription>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start p-4 border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow w-full">
                       <FormField
                        control={form.control}
                        name={`testCases.${index}.input`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Input</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., nums = [2,7,11,15], target = 9" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name={`testCases.${index}.expected`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Expected Output</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., [0,1]" {...field} />
                            </FormControl>
                             <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => remove(index)}
                      className="mt-0 md:mt-7 flex-shrink-0"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Remove test case</span>
                    </Button>
                  </div>
                ))}
              </div>
               <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => append({ input: '', expected: '' })}
              >
                <PlusCircle className="mr-2" />
                Add Test Case
              </Button>
            </div>
            
            <Button type="submit">Submit for Review</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
