import React, { ReactNode } from 'react';

export type BadgeVariant = 'blue' | 'emerald' | 'amber' | 'red' | 'slate' | 'teal';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'blue',
  size = 'md',
  icon,
  children,
  className = '',
}) => {
  const variantStyles: Record<BadgeVariant, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200/60',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/60',
    red: 'bg-red-50 text-red-700 border-red-200/60',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/60',
    teal: 'bg-teal-50 text-teal-700 border-teal-200/60',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0 text-current">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
