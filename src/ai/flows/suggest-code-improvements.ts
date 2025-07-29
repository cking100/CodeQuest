'use server'

import {ai} from '@/ai/genkit'
import {z} from 'genkit'

const suggcode = z.object({
    code: z.string().describe("some code from user"),
    programmingLanguage: z.string().optional().describe("lang of the code")
})
export type codeinput = z.infer<typeof suggcode>

const outputcode = z.object({
    improvements: z.string().describe("what to fix in code")
})
export type codeoutput = z.infer<typeof outputcode>


export async function doSuggestions(input: codeinput): Promise<codeoutput>{
  return flowSuggest(input)
}

const promptSuggest = ai.definePrompt({
  name: "codereviewprompt",
  input: {schema: suggcode},
  output: {schema: outputcode},
  prompt: `You are a AI who gives tips to make code better.

{% if programmingLanguage %}
Lang: {{programmingLanguage}}
{% endif %}

Code:
\`\`\`
{{{code}}}
\`\`\`

Give ideas to improve performance, readability, bugs or anything else. Say it in markdown.
`
})


const flowSuggest = ai.defineFlow({
  name: "flowSuggest",
  inputSchema: suggcode,
  outputSchema: outputcode
}, async (input) => {
  const result = await promptSuggest(input)

  if (!result.output) {
    return { improvements: "No suggestions found. Try again with different code." }  
  }

  return result.output
})
