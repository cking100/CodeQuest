'use server';
import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const object = z.object({
  code: z.string().describe('code thing to fix maybe'),
  error: z.string().describe('whats broken'),
});
export type DebugIn = z.infer<typeof object>;

const outThing = z.object({
  suggestions: z.string().describe('maybe try this?'),
});
export type DebugOut = z.infer<typeof outThing>;

export async function Fixs(input: DebugIn): Promise<DebugOut> {
  return debuggyFlow(input);
}

const makePrompt = ai.definePrompt({
  name: 'debugMaybePrompt',
  input: {schema: object},
  output: {schema: outThing},
  prompt: `you are a bot and you help fix stuff

code:
{{code}}

what went wrong:
{{error }} 
`,
});


const debuggyFlow = ai.defineFlow(
  {
    name: 'flowsDebug',
    inputSchema: object,
    outputSchema: outThing,
  },
  async input => {
    const {output} = await makePrompt(input);
    return output!;
  }
);
