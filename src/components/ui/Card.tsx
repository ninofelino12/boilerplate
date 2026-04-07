interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  onClick?: () => void;
  metadata?: {
    label: string;
    value: string;
  }[];
}

export default function Card({ title, description, icon, onClick, metadata }: CardProps) {
  return (
    <div
      className={`card ${onClick ? 'touch-feedback cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {icon && (
          <div className="text-2xl flex-shrink-0">
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base mb-1 truncate">{title}</h3>
          {description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
          {metadata && metadata.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {metadata.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-xs text-blue-700 dark:text-blue-300"
                >
                  <span className="font-medium">{item.label}:</span>
                  <span className="ml-1">{item.value}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
