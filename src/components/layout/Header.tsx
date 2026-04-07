'use client';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function Header({ title, showBack = false, action }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 safe-top bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="container-mobile">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center gap-3">
            {showBack && (
              <button
                onClick={() => window.history.back()}
                className="p-2 -ml-2 touch-feedback rounded-full"
              >
                ←
              </button>
            )}
            <h1 className="text-lg font-semibold">{title}</h1>
          </div>
          {action && (
            <button
              onClick={action.onClick}
              className="text-blue-500 font-medium px-3 py-1 touch-feedback rounded-lg"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
