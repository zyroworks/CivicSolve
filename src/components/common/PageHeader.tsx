import React, { ReactNode } from 'react';

export interface PageHeaderProps {
  badge?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  description,
  actions,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 ${className}`}>
      <div className="space-y-1">
        {badge && <div className="mb-2">{badge}</div>}
        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-500 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2.5 shrink-0 self-start md:self-auto">{actions}</div>}
    </div>
  );
};
