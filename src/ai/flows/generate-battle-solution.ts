'use server';
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Challenge } from '@/lib/challenges-data';
const SolSchema = z.object({
  challenge: z.custom<Challenge>(),
  language: z.string().default('python'),
});
export type GenerateBattleSolutionInput = z.infer<typeof SolSchema>;

const outSoluSchema = z.object({
  code: z.string().describe('The generated code solution for the challenge.'),
});
export type outSoluSchema = z.infer<typeof outSoluSchema>;

export async function generateBattleSolution(input: GenerateBattleSolutionInput): Promise<outSoluSchema> {
  return generateBattleSolutionFlow(input);
}
const prompt = ai.definePrompt({
  name: 'generateBattleSolutionPrompt',
  input: { schema:SolSchema },
  output: { schema:outSoluSchema },
  prompt: `You are a programmer.
  Your task is to solve the following coding challenge in {{language}}.
  Provide only the code for the solution.

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
    inputSchema: SolSchema,
    outputSchema:outSoluSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
