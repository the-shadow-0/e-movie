
'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { VideoGrid } from '@/components/video/VideoGrid';
import { VideoPlayerOverlay } from '@/components/video/VideoPlayerOverlay';
import { VideoCarousel } from '@/components/video/VideoCarousel';
import { mockVideos } from '@/data/mockVideos';
import type { Video } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [displayedVideos, setDisplayedVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayedVideos(mockVideos);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
    setTimeout(() => setSelectedVideo(null), 300);
  };

  const handleSearch = (searchTerm: string) => {
    setIsLoading(true);
    if (searchTerm.trim() === '') {
      setDisplayedVideos(mockVideos);
    } else {
      const filtered = mockVideos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setDisplayedVideos(filtered);
    }
    setTimeout(() => setIsLoading(false), 500);
  };

  const SkeletonCarousel = () => (
    <div className="relative w-full py-6 mb-4 md:py-8 md:mb-6">
      <div className="flex items-center justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4 px-10 md:px-12 lg:px-16">
        <Skeleton className="h-[120px] w-1/4 md:w-1/5 lg:w-1/6 rounded-lg opacity-70" />
        <Skeleton className="h-[180px] w-1/2 md:w-2/5 lg:w-1/3 rounded-lg" />
        <Skeleton className="h-[120px] w-1/4 md:w-1/5 lg:w-1/6 rounded-lg opacity-70" />
      </div>
    </div>
  );

  const SkeletonGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4 md:p-6">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-[150px] w-full rounded-xl" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );


  return (
    <div className="flex min-h-screen flex-col">
      <Header videos={mockVideos} onSearch={handleSearch} />
      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--content-background))] rounded-md shadow-inner my-4">
        {isLoading ? (
          <>
            <SkeletonCarousel />
            <SkeletonGrid />
          </>
        ) : (
          <>
            {mockVideos.length > 0 && <VideoCarousel videos={mockVideos} onVideoSelect={handleVideoSelect} />}
            <VideoGrid videos={displayedVideos} onVideoSelect={handleVideoSelect} />
          </>
        )}
      </main>
      {selectedVideo && (
        <VideoPlayerOverlay
          video={selectedVideo}
          isOpen={isPlayerOpen}
          onClose={handleClosePlayer}
        />
      )}
      <footer className="py-6 text-center text-sm text-muted-foreground border-t">
        © {new Date().getFullYear()} e-Cinema. All rights reserved.
      </footer>
    </div>
  );
}
