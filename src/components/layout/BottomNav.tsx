'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

const navItems: NavItem[] = [
  { name: 'Home', path: '/', icon: '🏠' },
  { name: 'Items', path: '/items', icon: '📦' },
  { name: 'Realtime', path: '/realtime', icon: '⚡' },
  { name: 'Profile', path: '/profile', icon: '👤' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(pathname);

  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-bottom">
      <div className="container-mobile">
        <div className="flex items-center justify-around bg-white dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 shadow-lg">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center py-2 px-4 flex-1 touch-feedback transition-all ${
                activeTab === item.path
                  ? 'text-blue-500'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
