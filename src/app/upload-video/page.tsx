
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { mockVideos } from '@/data/mockVideos';
import { videoGenres } from '@/data/genres';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud } from 'lucide-react';

const videoUploadFormSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 3 characters.' }).max(100, { message: 'Title must be 100 characters or less.' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }).max(1000, { message: 'Description must be 1000 characters or less.' }),
  genre: z.string({ required_error: 'Please select a genre.' }),
  videoFile: z.instanceof(FileList).refine((files) => files?.length === 1, 'Video file is required.'),
  thumbnailFile: z.instanceof(FileList).refine((files) => files?.length === 1, 'Thumbnail image is required.'),
  duration: z.string().regex(/^\d{1,2}h\s\d{1,2}m$/, { message: 'Duration must be in format like "1h 30m". Example: 0h 5m, 1h 0m, 12h 59m' }),
});

type VideoUploadFormValues = z.infer<typeof videoUploadFormSchema>;

export default function UploadVideoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<VideoUploadFormValues>({
    resolver: zodResolver(videoUploadFormSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: '',
      genre: undefined,
      videoFile: undefined,
      thumbnailFile: undefined,
    },
  });

  const handleHeaderSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/');
    }
  };

  async function onSubmit(data: VideoUploadFormValues) {
    console.log('Video Upload Data:', {
      title: data.title,
      description: data.description,
      genre: data.genre,
      duration: data.duration,
      videoFileName: data.videoFile[0]?.name,
      videoFileSize: data.videoFile[0]?.size,
      thumbnailFileName: data.thumbnailFile[0]?.name,
      thumbnailFileSize: data.thumbnailFile[0]?.size,
    });

    // --- Backend Integration Point ---
    // In a real application:
    // 1. Create FormData
    // const formData = new FormData();
    // formData.append('title', data.title);
    // formData.append('description', data.description);
    // formData.append('genre', data.genre);
    // formData.append('duration', data.duration);
    // if (data.videoFile[0]) formData.append('videoFile', data.videoFile[0]);
    // if (data.thumbnailFile[0]) formData.append('thumbnailFile', data.thumbnailFile[0]);
    //
    // 2. Send to backend API
    // try {
    //   const response = await fetch('/api/your-video-upload-endpoint', {
    //     method: 'POST',
    //     body: formData,
    //   });
    //   if (!response.ok) throw new Error('Upload failed');
    //   const result = await response.json();
    //   toast({ title: 'Success!', description: `${result.message || 'Video uploaded successfully.'}` });
    //   form.reset();
    //   // Optionally redirect or update UI, e.g., router.push('/my-videos');
    // } catch (error) {
    //   console.error('Upload error:', error);
    //   toast({ title: 'Error', description: 'Failed to upload video. Please try again.', variant: 'destructive' });
    // }
    // --- End Backend Integration Point ---

    toast({
      title: 'Video Submitted (Simulation)',
      description: `"${data.title}" details have been logged. In a real app, it would be uploaded and processed.`,
    });
    form.reset();
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header videos={mockVideos} onSearch={handleHeaderSearch} />
      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--content-background))] rounded-md shadow-inner my-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <UploadCloud className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--content-foreground))]">Upload New Video</h1>
          </div>
          <Card className="shadow-xl border-border">
            <CardHeader>
              <CardTitle className="text-xl">Video Details</CardTitle>
              <CardDescription>Fill in the information below to add your video to e-Cinema.</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., My Awesome Film" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell us about your video..." {...field} rows={5} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                    <FormField
                      control={form.control}
                      name="genre"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Genre</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a genre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {videoGenres.map((genre) => (
                                <SelectItem key={genre.value} value={genre.value}>
                                  {genre.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="duration"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Duration</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 1h 45m" {...field} />
                          </FormControl>
                          <FormDescription className="text-xs">Format: Xh Ym (e.g., 0h 5m, 2h 30m).</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="videoFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Video File</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="video/*,.mkv"
                            onChange={(e) => field.onChange(e.target.files)}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                          />
                        </FormControl>
                        <FormDescription>Upload the main video content (e.g., MP4, MOV, MKV).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="thumbnailFile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Thumbnail Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            onChange={(e) => field.onChange(e.target.files)}
                            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                          />
                        </FormControl>
                        <FormDescription>A catchy thumbnail for your video (e.g., JPG, PNG, WEBP).</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting}>
                    <UploadCloud className="mr-2 h-4 w-4" />
                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Video'}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-12">
        © {new Date().getFullYear()} e-Cinema. All rights reserved.
      </footer>
    </div>
  );
}
