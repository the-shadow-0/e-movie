
'use client';

import Image from 'next/image';
import type { Video } from '@/types';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

interface VideoCarouselItemProps {
  video: Video;
  isCenter: boolean;
  onVideoSelect: (video: Video) => void;
}

export function VideoCarouselItem({ video, isCenter, onVideoSelect }: VideoCarouselItemProps) {
  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden shadow-md cursor-pointer transition-all duration-300 ease-in-out group aspect-video',
        isCenter
          ? 'w-1/2 md:w-2/5 lg:w-1/3 scale-100 opacity-100 z-10 shadow-xl'
          : 'w-1/4 md:w-1/5 lg:w-1/6 scale-75 opacity-70 hover:opacity-90 hover:scale-80'
      )}
      onClick={() => onVideoSelect(video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onVideoSelect(video)}
      aria-label={`Play video ${video.title}`}
    >
      <Image
        src={video.thumbnailUrl}
        alt={`Thumbnail for ${video.title}`}
        layout="fill"
        objectFit="cover"
        className={cn(
          'transition-transform duration-300',
          isCenter ? 'group-hover:scale-105' : 'group-hover:scale-110'
        )}
        data-ai-hint={`${video.genre?.toLowerCase() ?? "movie"} scene`}
        priority={isCenter}
      />
      {isCenter && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-white/90 drop-shadow-lg" />
        </div>
      )}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 p-2 md:p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300',
          isCenter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}
      >
        <h3 className={cn(
          'font-semibold text-white truncate',
          isCenter ? 'text-sm md:text-base lg:text-lg' : 'text-xs md:text-sm'
        )}>
          {video.title}
        </h3>
      </div>
    </div>
  );
}
