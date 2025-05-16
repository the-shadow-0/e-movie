import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import type { Video } from '@/types';
import { Recommendations } from './Recommendations';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

interface VideoPlayerOverlayProps {
  video: Video | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerOverlay({ video, isOpen, onClose }: VideoPlayerOverlayProps) {
  if (!video) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl lg:max-w-5xl xl:max-w-7xl p-0 max-h-[90vh] flex flex-col bg-background shadow-2xl rounded-lg">
        <DialogHeader className="p-4 pb-0 flex flex-row items-center justify-between border-b">
          <div>
            <DialogTitle className="text-2xl font-bold text-foreground">{video.title}</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">{video.genre} - {video.duration}</DialogDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close video player">
            <X className="h-6 w-6" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
          <div className="lg:w-2/3 aspect-video bg-black flex-shrink-0">
            { }
            <iframe
              className="w-full h-full"
              src={video.videoUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            { }
            { }
          </div>

          <div className="lg:w-1/3 p-4 lg:p-6 overflow-y-auto bg-card">
            <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
            <p className="text-sm text-muted-foreground mb-6 whitespace-pre-wrap">{video.description}</p>
            <Recommendations currentVideo={video} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
