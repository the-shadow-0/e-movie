import { VideoCard } from './VideoCard';
import type { Video } from '@/types';

interface VideoGridProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoGrid({ videos, onVideoSelect }: VideoGridProps) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-[hsl(var(--content-muted-foreground))]">
        <p className="text-xl">No videos found.</p>
        <p>Try adjusting your search or check back later.</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoSelect={onVideoSelect} />
      ))}
    </div>
  );
}
