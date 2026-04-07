'use client';

import Link from 'next/link';
import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';

export default function Home() {
  const features = [
    {
      title: 'Neon Database',
      description: 'Serverless PostgreSQL with powerful query capabilities',
      icon: '🗄️',
      link: '/items',
    },
    {
      title: 'Firebase RTDB',
      description: 'Real-time data synchronization across all clients',
      icon: '⚡',
      link: '/realtime',
    },
    {
      title: 'Mobile-First Design',
      description: 'Optimized for mobile devices with touch-friendly UI',
      icon: '📱',
      link: '/profile',
    },
    {
      title: 'TypeScript',
      description: 'Full type safety throughout the application',
      icon: '🔷',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Mobile App" />
      
      <div className="container-mobile py-4 space-y-4">
        {/* Hero Section */}
        <div className="card bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <h2 className="text-xl font-bold mb-2">Welcome! 👋</h2>
          <p className="text-sm opacity-90 mb-3">
            A modern mobile-style application built with Next.js, Neon Database, and Firebase RTDB
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2 py-1 bg-white/20 rounded-full">Next.js 14</span>
            <span className="px-2 py-1 bg-white/20 rounded-full">PostgreSQL</span>
            <span className="px-2 py-1 bg-white/20 rounded-full">Firebase</span>
            <span className="px-2 py-1 bg-white/20 rounded-full">TypeScript</span>
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Features</h3>
          <div className="space-y-3">
            {features.map((feature, index) => (
              feature.link ? (
                <Link key={index} href={feature.link}>
                  <Card
                    title={feature.title}
                    description={feature.description}
                    icon={feature.icon}
                  />
                </Link>
              ) : (
                <Card
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                />
              )
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/items" className="btn-primary text-center text-sm">
              Browse Items
            </Link>
            <Link href="/realtime" className="btn-secondary text-center text-sm">
              Realtime Data
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
