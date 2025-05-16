'use client';

import { useState, useEffect, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Search, Film } from 'lucide-react';
import type { Video } from '@/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  videos: Video[];
  onSearch: (searchTerm: string) => void;
}

export function SearchBar({ videos, onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Video[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.length > 1) {
      const filteredSuggestions = videos.filter((video) =>
        video.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (video: Video) => {
    setSearchTerm(video.title);
    setSuggestions([]);
    onSearch(video.title);
    setIsFocused(false);
  };

  const handleSubmit = (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    onSearch(searchTerm);
    setSuggestions([]);
    setIsFocused(false);
  }


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof Element && !event.target.closest('.search-container')) {
        setIsFocused(false);
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="relative w-full max-w-md search-container">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for videos..."
            className="w-full rounded-lg bg-background pl-10 pr-4 py-2 shadow-sm focus:ring-2 focus:ring-accent"
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
          />
        </div>
      </form>
      {isFocused && suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-popover shadow-lg z-50">
          <ScrollArea className="h-auto max-h-60">
            <ul>
              {suggestions.map((video) => (
                <li key={video.id}>
                  <button
                    type="button"
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-popover-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => handleSuggestionClick(video)}
                  >
                    <Film className="h-4 w-4 text-muted-foreground" />
                    <span>{video.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
