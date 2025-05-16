import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Video } from '@/types';
import { cn } from '@/lib/utils';

interface VideoCardProps {
  video: Video;
  onVideoSelect: (video: Video) => void;
}

export function VideoCard({ video, onVideoSelect }: VideoCardProps) {
  return (
    <Card 
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer bg-card hover:border-accent/50"
      onClick={() => onVideoSelect(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onVideoSelect(video)}
      aria-label={`Play video ${video.title}`}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={video.thumbnailUrl}
            alt={`Thumbnail for ${video.title}`}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={`${video.genre?.toLowerCase() ?? ""} movie scene`}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <PlayCircle className="h-16 w-16 text-white/80 drop-shadow-lg" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold leading-tight text-foreground truncate group-hover:text-primary transition-colors">
          {video.title}
        </CardTitle>
        <CardDescription className="mt-1 text-sm text-muted-foreground line-clamp-2 h-10">
          {video.description}
        </CardDescription>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{video.genre}</span>
          <span>{video.duration}</span>
        </div>
      </CardContent>
    </Card>
  );
}
