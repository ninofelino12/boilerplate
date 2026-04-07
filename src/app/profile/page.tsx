'use client';

import Header from '@/components/layout/Header';
import Card from '@/components/ui/Card';

export default function ProfilePage() {
  const menuItems = [
    {
      title: 'Database Status',
      icon: '🗄️',
      metadata: [
        { label: 'Neon', value: 'Connected' },
        { label: 'RTDB', value: 'Connected' },
      ],
    },
    {
      title: 'Application Info',
      icon: 'ℹ️',
      metadata: [
        { label: 'Framework', value: 'Next.js 14' },
        { label: 'Database', value: 'Neon + Firebase' },
        { label: 'Language', value: 'TypeScript' },
      ],
    },
  ];

  const techStack = [
    { name: 'Next.js', icon: '▲', description: 'React framework' },
    { name: 'Neon', icon: '💚', description: 'Serverless PostgreSQL' },
    { name: 'Firebase', icon: '🔥', description: 'Real-time Database' },
    { name: 'TailwindCSS', icon: '🎨', description: 'Utility-first CSS' },
    { name: 'TypeScript', icon: '🔷', description: 'Type safety' },
  ];

  return (
    <div className="min-h-screen">
      <Header title="Profile" />

      <div className="container-mobile py-4 space-y-4">
        {/* Profile Header */}
        <div className="card text-center">
          <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-3xl text-white">
            👤
          </div>
          <h2 className="text-xl font-bold">Mobile App User</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            user@example.com
          </p>
        </div>

        {/* Tech Stack */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Tech Stack</h3>
          <div className="space-y-3">
            {techStack.map((tech, index) => (
              <Card
                key={index}
                title={tech.name}
                description={tech.description}
                icon={tech.icon}
              />
            ))}
          </div>
        </div>

        {/* Database Status */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-1">Status</h3>
          <div className="space-y-3">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                icon={item.icon}
                metadata={item.metadata}
              />
            ))}
          </div>
        </div>

        {/* App Info */}
        <div className="card text-center text-sm text-gray-600 dark:text-gray-400">
          <p className="font-medium">Mobile App Boilerplate</p>
          <p className="mt-1">Built with Next.js, Neon, and Firebase</p>
          <p className="mt-2 text-xs">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}
