'use server';

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  description: z.string().describe('The description of the coding task or functionality.'),
  language: z.string().optional().describe('The programming language for the code snippet (e.g., JavaScript, Python). Defaults to JavaScript.'),
});
export type GenerateCodeSnippetInput = z.infer<typeof GenerateCodeSnippetInputSchema>;

const GenerateCodeSnippetOutputSchema = z.object({
  codeSnippet: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeSnippetOutput = z.infer<typeof GenerateCodeSnippetOutputSchema>;

export async function generateCodeSnippet(input: GenerateCodeSnippetInput): Promise<GenerateCodeSnippetOutput> {
  return generateCodeSnippetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeSnippetPrompt',
  input: {schema: GenerateCodeSnippetInputSchema},
  output: {schema: GenerateCodeSnippetOutputSchema},
  prompt: `You are an AI assistant that generates code snippets based on user descriptions.

  Generate a code snippet that implements the following:
  Description: {{{description}}}

  Language: {{language}}

  Please provide only the code snippet, without any surrounding explanations or comments unless absolutely necessary for clarity.
  `,
});

const generateCodeSnippetFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: GenerateCodeSnippetInputSchema,
    outputSchema: GenerateCodeSnippetOutputSchema,
  },
  async input => {
    const {
      output,
    } = await prompt({
      ...input,
      language: input.language ?? 'JavaScript',
    });
    return output!;
  }
);
