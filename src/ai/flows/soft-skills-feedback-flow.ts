'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Keep schemas/constants internal (not exported)
const SkillSchema = z.object({
  scenario: z.string().describe('The title of the soft skill scenario.'),
  prompt: z.string().describe('The prompt or question given to the user.'),
  codeContext: z.string().nullable().describe('An optional code snippet provided as context for the scenario.'),
  userResponse: z.string().describe("The user's written response to the scenario."),
  type: z.enum(['technical-writing', 'explain-code', 'problem-solving', 'team-collaboration'])
    .describe('The type of scenario being evaluated.'),
});

const SoftSkillsFeedbackOutputSchema = z.object({
  feedback: z.string().describe("Constructive, AI-generated feedback on the user's response, formatted in Markdown."),
});

const promptTemplates: Record<string, string> = {
  'technical-writing': `You are an AI assistant reviewing a user's attempt at technical documentation.
Scenario: {{scenario}}
Task: {{prompt}}
{{#if codeContext}}
Code Context:
{{{codeContext}}}
{{/if}}
User's Documentation:
"{{{userResponse}}}"

Provide constructive feedback. Analyze clarity, conciseness, and accuracy. Is it easy for another developer to understand? Suggest specific improvements. Format your feedback in Markdown.`,

  'explain-code': `You are an AI assistant reviewing a user's ability to communicate technical concepts.
Scenario: {{scenario}}
Task: {{prompt}}
{{#if codeContext}}
Code Context:
\`\`\`
{{{codeContext}}}
\`\`\`
{{/if}}
User's Explanation:
"{{{userResponse}}}"

Provide constructive feedback. Did the user avoid jargon? Is the explanation clear and easy to understand for someone without a coding background? Is the tone appropriate and constructive? Suggest specific improvements. Format your feedback in Markdown.`,

  'problem-solving': `You are an AI assistant role-playing as a senior manager, reviewing how a team member handles a workplace challenge.
Scenario: {{scenario}}
Task: {{prompt}}
User's Proposed Solution:
"{{{userResponse}}}"

Provide constructive feedback from a manager's perspective. Does the user's response show ownership, proactivity, and good communication? Is the proposed solution reasonable? Suggest what would make their approach even better. Format your feedback in Markdown.`,

  'team-collaboration': `You are an AI assistant role-playing as a senior project lead, evaluating a response to a team collaboration scenario.
Scenario: {{scenario}}
Task: {{prompt}}
User's Proposed Action:
"{{{userResponse}}}"

Provide constructive feedback. Does the user's response prioritize the team's well-being and project goals? Does it demonstrate good negotiation and stakeholder management skills? Is the communication clear and professional? Suggest improvements. Format your feedback in Markdown.`,
};
export async function provideSoftSkillsFeedback(input: z.infer<typeof SkillSchema>): Promise<z.infer<typeof SoftSkillsFeedbackOutputSchema>> {
  const promptText = promptTemplates[input.type];

  const prompt = ai.definePrompt({
    name: `softSkillsPrompt_${input.type}`,
    input: { schema: SkillSchema },
    output: { schema: SoftSkillsFeedbackOutputSchema },
    prompt: promptText,
  });

  const { output } = await prompt(input);
  return output!;
}
