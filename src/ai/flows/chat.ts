'use server'
import { ai } from '@/ai/genkit'
import { z } from 'genkit'
const Msg = z.object({
 message: z.string().describe('ai thinks')
})
export type input = z.infer<typeof Msg>
const reply = z.object({
 response: z.string().describe('ai reply')
})
export type typeOfOut = z.infer<typeof reply>

export async function prompt (d: input): Promise<typeOfOut>{
 return theFlow(d)
}


const r = ai.definePrompt({
name: "thePromptyThing",
input: {schema: Msg},
output: {schema: reply},
prompt: `u r a coder bot or smth. just help ppl code ok?? keep it short & markdown style

when user says:
{{{message}}}
`,
})

const theFlow = ai.defineFlow({

name: 'Flow',
inputSchema: Msg,
outputSchema: reply
}, async (x)=>{
    const {    output  } = await r(x)
    return output!
})
