
'use client';

import { Header } from '@/components/layout/Header';
import { mockVideos } from '@/data/mockVideos';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

export default function AccountSettingsPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [currentUserName, setCurrentUserName] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');

  useEffect(() => {
    setCurrentUserName('Demo User');
    setCurrentUserEmail('user@example.com');
  }, []);


  const handleHeaderSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      router.push(`/?search=${encodeURIComponent(searchTerm)}`);
    } else {
      router.push('/');
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: "Settings Saved",
      description: "Your account settings have been updated (simulation).",
    });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header videos={mockVideos} onSearch={handleHeaderSearch} />
      <main className="flex-1 container mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-[hsl(var(--content-background))] rounded-md shadow-inner my-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight text-[hsl(var(--content-foreground))] mb-8">Account Settings</h1>
          <Card className="shadow-xl border-border">
            <CardHeader>
              <CardTitle className="text-xl">Profile Information</CardTitle>
              <CardDescription>Update your personal details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={currentUserName} placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue={currentUserEmail} placeholder="your@email.com" readOnly />
                  <p className="text-xs text-muted-foreground">Email cannot be changed through this form.</p>
                </div>

                <Separator className="my-6" />

                <CardTitle className="text-xl pt-2">Change Password</CardTitle>
                <CardDescription>Update your login password.</CardDescription>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>

                <Button type="submit" className="w-full sm:w-auto mt-4">Save Changes</Button>
              </form>
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
