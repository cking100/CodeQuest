'use server';

/**
 * @fileOverview A flow to generate a code solution for a live battle challenge.
 *
 * - generateBattleSolution - A function that takes a challenge and returns a code solution.
 * - GenerateBattleSolutionInput - The input type for the generateBattleSolution function.
 * - GenerateBattleSolutionOutput - The return type for the generateBattleSolution function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Challenge } from '@/lib/challenges-data';


const GenerateBattleSolutionInputSchema = z.object({
  challenge: z.custom<Challenge>(),
  language: z.string().default('python'),
});
export type GenerateBattleSolutionInput = z.infer<typeof GenerateBattleSolutionInputSchema>;

const GenerateBattleSolutionOutputSchema = z.object({
  code: z.string().describe('The generated code solution for the challenge.'),
});
export type GenerateBattleSolutionOutput = z.infer<typeof GenerateBattleSolutionOutputSchema>;

export async function generateBattleSolution(input: GenerateBattleSolutionInput): Promise<GenerateBattleSolutionOutput> {
  return generateBattleSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBattleSolutionPrompt',
  input: { schema: GenerateBattleSolutionInputSchema },
  output: { schema: GenerateBattleSolutionOutputSchema },
  prompt: `You are an expert competitive programmer.
  Your task is to solve the following coding challenge in {{language}}.
  Provide only the code for the solution. Do not include any explanations, comments, or markdown formatting.

  **Challenge Details:**
  - Title: {{{challenge.title}}}
  - Description: {{{challenge.description}}}
  - Test Cases:
    {{#each challenge.testCases}}
    - Input: {{{this.input}}}, Expected Output: {{{this.expected}}}
    {{/each}}

  **Language:** {{language}}
  
  **Solution Code:**
  `,
});


const generateBattleSolutionFlow = ai.defineFlow(
  {
    name: 'generateBattleSolutionFlow',
    inputSchema: GenerateBattleSolutionInputSchema,
    outputSchema: GenerateBattleSolutionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
