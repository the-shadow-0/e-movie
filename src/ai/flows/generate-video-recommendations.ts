'use server';

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateVideoRecommendationsInputSchema = z.object({
  currentMovieTitle: z.string().describe('The title of the movie currently being watched.'),
  currentMovieDescription: z.string().describe('The description of the movie currently being watched.'),
  userViewingHistory: z.array(z.string()).describe('A list of titles of movies the user has previously watched.'),
  numberOfRecommendations: z.number().default(3).describe('The number of video recommendations to generate.'),
});
export type GenerateVideoRecommendationsInput = z.infer<typeof GenerateVideoRecommendationsInputSchema>;

const GenerateVideoRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended movie titles.'),
});
export type GenerateVideoRecommendationsOutput = z.infer<typeof GenerateVideoRecommendationsOutputSchema>;

export async function generateVideoRecommendations(input: GenerateVideoRecommendationsInput): Promise<GenerateVideoRecommendationsOutput> {
  return generateVideoRecommendationsFlow(input);
}

const generateVideoRecommendationsPrompt = ai.definePrompt({
  name: 'generateVideoRecommendationsPrompt',
  input: { schema: GenerateVideoRecommendationsInputSchema },
  output: { schema: GenerateVideoRecommendationsOutputSchema },
  prompt: `You are a movie recommendation expert. Based on the current movie the user is watching and their viewing history, you will recommend other movies they might enjoy.

Current Movie:
Title: {{{currentMovieTitle}}}
Description: {{{currentMovieDescription}}}

User Viewing History:
{{#if userViewingHistory}}
  {{#each userViewingHistory}}- {{{this}}}
  {{/each}}
{{else}}
  The user has no viewing history.
{{/if}}

Please provide {{{numberOfRecommendations}}} recommendations.

Respond with a list of movie titles.
`,
});

const generateVideoRecommendationsFlow = ai.defineFlow(
  {
    name: 'generateVideoRecommendationsFlow',
    inputSchema: GenerateVideoRecommendationsInputSchema,
    outputSchema: GenerateVideoRecommendationsOutputSchema,
  },
  async input => {
    const { output } = await generateVideoRecommendationsPrompt(input);
    return output!;
  }
);
