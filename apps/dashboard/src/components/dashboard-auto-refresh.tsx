'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DashboardAutoRefreshProps {
  intervalMs?: number;
}

export function DashboardAutoRefresh({ intervalMs = 15000 }: DashboardAutoRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();

    const timer = window.setInterval(refresh, intervalMs);
    const handleFocus = () => refresh();

    window.addEventListener('focus', handleFocus);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', handleFocus);
    };
  }, [router, intervalMs]);

  return null;
}