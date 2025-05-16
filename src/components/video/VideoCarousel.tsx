
'use client';

import { useState } from 'react';
import type { Video } from '@/types';
import { VideoCarouselItem } from './VideoCarouselItem';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface VideoCarouselProps {
  videos: Video[];
  onVideoSelect: (video: Video) => void;
}

export function VideoCarousel({ videos, onVideoSelect }: VideoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const numVideos = videos.length;

  const goToPrevious = () => {
    if (numVideos <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + numVideos) % numVideos);
  };

  const goToNext = () => {
    if (numVideos <= 1) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numVideos);
  };

  if (numVideos === 0) {
    return null;
  }

  let displayItems: { video: Video; isCenter: boolean; key: string }[] = [];

  if (numVideos === 1) {
    displayItems = [{ video: videos[0], isCenter: true, key: videos[0].id + '-center' }];
  } else if (numVideos === 2) {
    displayItems = [
      { video: videos[currentIndex], isCenter: true, key: videos[currentIndex].id + '-item1' },
      { video: videos[(currentIndex + 1) % numVideos], isCenter: true, key: videos[(currentIndex + 1) % numVideos].id + '-item2' }
    ];
  } else {
    const prevVideoIndex = (currentIndex - 1 + numVideos) % numVideos;
    const centerVideoIndex = currentIndex;
    const nextVideoIndex = (currentIndex + 1) % numVideos;
    displayItems = [
      { video: videos[prevVideoIndex], isCenter: false, key: videos[prevVideoIndex].id + '-prev' },
      { video: videos[centerVideoIndex], isCenter: true, key: videos[centerVideoIndex].id + '-center' },
      { video: videos[nextVideoIndex], isCenter: false, key: videos[nextVideoIndex].id + '-next' },
    ];
  }

  return (
    <div className="relative w-full py-6 mb-4 md:py-8 md:mb-6">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-10 md:px-12 lg:px-16">
        {displayItems.map(({ video, isCenter, key }) => (
          numVideos === 2 ? (
            <div key={key} className="w-5/12 md:w-4/12 lg:w-3/12"> { }
              <VideoCarouselItem
                video={video}
                isCenter={isCenter}
                onVideoSelect={onVideoSelect}
              />
            </div>
          ) : (
            <VideoCarouselItem
              key={key}
              video={video}
              isCenter={isCenter}
              onVideoSelect={onVideoSelect}
            />
          )
        ))}
      </div>

      {numVideos > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-1 sm:left-2 md:left-3 top-1/2 -translate-y-1/2 z-20 bg-background/70 hover:bg-background/95 rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shadow-md"
            onClick={goToPrevious}
            aria-label="Previous video"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-1 sm:right-2 md:right-3 top-1/2 -translate-y-1/2 z-20 bg-background/70 hover:bg-background/95 rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shadow-md"
            onClick={goToNext}
            aria-label="Next video"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </>
      )}
    </div>
  );
}
