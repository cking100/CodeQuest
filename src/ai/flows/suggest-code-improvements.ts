// src/ai/flows/suggest-code-improvements.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting code improvements.
 *
 * - suggestCodeImprovements - A function that takes code as input and returns improvement suggestions.
 * - SuggestCodeImprovementsInput - The input type for the suggestCodeImprovements function.
 * - SuggestCodeImprovementsOutput - The return type for the suggestCodeImprovements function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCodeImprovementsInputSchema = z.object({
  code: z.string().describe('The code to be improved.'),
  programmingLanguage: z
    .string()
    .optional()
    .describe('The programming language of the code.'),
});
export type SuggestCodeImprovementsInput = z.infer<typeof SuggestCodeImprovementsInputSchema>;

const SuggestCodeImprovementsOutputSchema = z.object({
  improvements: z.string().describe('Suggestions for improving the code.'),
});
export type SuggestCodeImprovementsOutput = z.infer<typeof SuggestCodeImprovementsOutputSchema>;

export async function suggestCodeImprovements(
  input: SuggestCodeImprovementsInput
): Promise<SuggestCodeImprovementsOutput> {
  return suggestCodeImprovementsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCodeImprovementsPrompt',
  input: {schema: SuggestCodeImprovementsInputSchema},
  output: {schema: SuggestCodeImprovementsOutputSchema},
  prompt: `You are an AI assistant that helps users improve their code.

  You will be given a piece of code and your task is to provide suggestions on how to improve its efficiency, readability, and security.
  You must return your response in markdown format.

  {% if programmingLanguage %}The code is written in {{programmingLanguage}}.{% endif %}

  Code:
  \`\`\`
  {{{code}}}
  \`\`\`
  `,
});

const suggestCodeImprovementsFlow = ai.defineFlow(
  {
    name: 'suggestCodeImprovementsFlow',
    inputSchema: SuggestCodeImprovementsInputSchema,
    outputSchema: SuggestCodeImprovementsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
