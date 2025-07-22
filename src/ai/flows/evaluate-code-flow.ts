
'use server';
/**
 * @fileOverview A flow to evaluate user-submitted code for correctness.
 *
 * - evaluateCode - A function that evaluates the code against the problem.
 * - EvaluateCodeInput - The input type for the evaluateCode function.
 * - EvaluateCodeOutput - The return type for the evaluateCode function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import {challenges, type Challenge} from '@/lib/challenges-data';

const EvaluateCodeInputSchema = z.object({
  code: z.string().describe("The user's code submission."),
  language: z.string().describe('The programming language of the code.'),
  challengeId: z.string().describe('The ID of the challenge being attempted.'),
});
export type EvaluateCodeInput = z.infer<typeof EvaluateCodeInputSchema>;

const EvaluateCodeOutputSchema = z.object({
  success: z.boolean().describe('Whether the code passed all test cases.'),
  output: z.string().describe('The output from the code execution, e.g., "All test cases passed!" or details on the failed test case.'),
});
export type EvaluateCodeOutput = z.infer<typeof EvaluateCodeOutputSchema>;

export async function evaluateCode(input: EvaluateCodeInput): Promise<EvaluateCodeOutput> {
  return evaluateCodeFlow(input);
}

// Define a new Zod schema for the prompt input that includes the full challenge data
const EvaluatePromptInputSchema = EvaluateCodeInputSchema.extend({
    challenge: z.custom<Challenge>(),
});


const prompt = ai.definePrompt({
  name: 'evaluateCodePrompt',
  input: {schema: EvaluatePromptInputSchema},
  output: {schema: EvaluateCodeOutputSchema},
  prompt: `You are an expert code judge. Your task is to evaluate a user's code submission for a specific challenge with 100% accuracy.

**Challenge Details:**
- Title: {{{challenge.title}}}
- Description: {{{challenge.description}}}

**User Submission:**
- Language: {{language}}
- Code:
\`\`\`{{language}}
{{{code}}}
\`\`\`

**Instructions for Evaluation:**

You MUST follow these steps precisely.

1.  **Analyze the Code**: Understand the algorithm and logic of the user's code. If the code is in a class (like a 'Solution' class in Java), identify the main method that solves the problem.
2.  **Evaluate Test Cases**: For each test case provided below, you must perform the following sub-steps:
    a.  **Simulate Execution**: Mentally run the user's code with the test case's input. For class-based code, this means simulating a call to the main method (e.g., \`new Solution().fizzBuzz(3)\`).
    b.  **Determine Actual Output**: Figure out what the code would return.
    c.  **Compare**: Check if the "Actual Output" matches the "Expected Output". Note that the format of the output (e.g., JSON array vs. list) should be considered equivalent.
3.  **Final Verdict**:
    *   If the code passes **ALL** test cases, you MUST set the \`success\` field to \`true\` and the \`output\` field to "All test cases passed!".
    *   If the code fails **ANY** test case, you MUST set the \`success\` field to \`false\` and the \`output\` field to a string with the details of the FIRST failed test case, in this exact format: "Failed on test case: Input: [input data]\\nExpected: [expected output]\\nActual: [actual output]".
    *   Do not make assumptions. If the code is syntactically flawed or contains an obvious error that prevents it from running, mark it as a failure and briefly describe the error in the output.

**Test Cases for Evaluation:**
{{#each challenge.testCases}}
- Test Case {{@index}}:
  - Input: \`{{{this.input}}}\`
  - Expected Output: \`{{{this.expected}}}\`
{{/each}}

Now, begin your evaluation. First, provide a brief, silent "chain-of-thought" analysis of how you will evaluate the code against the tests, then provide the final JSON output.
`,
});

const evaluateCodeFlow = ai.defineFlow(
  {
    name: 'evaluateCodeFlow',
    inputSchema: EvaluateCodeInputSchema,
    outputSchema: EvaluateCodeOutputSchema,
  },
  async (input) => {
    const challenge = challenges.find((c) => c.id === input.challengeId);
    if (!challenge) {
      throw new Error(`Challenge with id ${input.challengeId} not found.`);
    }

    const {output} = await prompt({ ...input, challenge });
    return output!;
  }
);
