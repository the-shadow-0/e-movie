
import { Film } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import type { Video } from '@/types';
import { UserNav } from '@/components/navigation/UserNav';
import { ThemeToggle } from '@/components/theme/ThemeToggle';

interface HeaderProps {
  videos: Video[];
  onSearch: (searchTerm: string) => void;
}

export function Header({ videos, onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2">
          <Film className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            e-Cinema
          </h1>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2 sm:space-x-4">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
            <SearchBar videos={videos} onSearch={onSearch} />
          </div>
          <ThemeToggle /> { }
          <UserNav />
        </div>
      </div>
    </header>
  );
}
