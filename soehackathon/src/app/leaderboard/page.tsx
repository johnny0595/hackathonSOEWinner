'use client';

import { Leaderboard } from '@/components/leaderboard';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { mockLeaderboardData } from '@/data/mock-leaderboard';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Games</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">Leaderboard</h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                NC State Sports Prediction Champions
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <Leaderboard data={mockLeaderboardData} />
      </main>
    </div>
  );
}