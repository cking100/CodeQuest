import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-code-improvements.ts';
import '@/ai/flows/debug-my-code.ts';
import '@/ai/flows/generate-code-snippet.ts';
import '@/ai/flows/evaluate-code-flow.ts';
import '@/ai/flows/chat.ts';
import '@/ai/flows/generate-battle-solution.ts';
import '@/ai/flows/soft-skills-feedback-flow.ts';
