'use client';

import { useEffect, useState } from 'react';
import { generateVideoRecommendations, type GenerateVideoRecommendationsOutput } from '@/ai/flows/generate-video-recommendations';
import type { Video } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Film } from 'lucide-react';

interface RecommendationsProps {
  currentVideo: Video;
}

const mockUserViewingHistory = ['Inception', 'The Dark Knight', 'Interstellar'];

export function Recommendations({ currentVideo }: RecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!currentVideo) return;

    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        const result: GenerateVideoRecommendationsOutput = await generateVideoRecommendations({
          currentMovieTitle: currentVideo.title,
          currentMovieDescription: currentVideo.description,
          userViewingHistory: mockUserViewingHistory, // Using mock history for now
          numberOfRecommendations: 3,
        });
        setRecommendations(result.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: 'Error',
          description: 'Could not fetch video recommendations. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [currentVideo, toast]);

  return (
    <Card className="mt-6 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-md bg-muted" />
                <Skeleton className="h-6 w-3/4 rounded-md bg-muted" />
              </div>
            ))}
          </div>
        ) : recommendations.length > 0 ? (
          <ul className="space-y-3">
            {recommendations.map((title, index) => (
              <li key={index} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent/50 transition-colors">
                <Film className="h-5 w-5 text-primary" />
                <span className="text-sm text-card-foreground">{title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No recommendations available at the moment.</p>
        )}
      </CardContent>
    </Card>
  );
}
