import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { currentUser, currentRole, switchRole } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const roles: { role: UserRole; label: string }[] = [
    { role: 'CITIZEN', label: 'Citizens' },
    { role: 'GOVT_ADMIN', label: 'Govt Admin' },
    { role: 'UNIVERSITY', label: 'Universities' },
    { role: 'INDUSTRY', label: 'Industry' },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/report', label: 'Report Problem' },
    { path: '/challenges', label: 'Challenges' },
    { path: '/workspace', label: 'Innovation Projects' },
    { path: '/admin', label: 'Govt Portal' },
    { path: '/impact', label: 'Impact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60">
      <div className="max-w-container-max mx-auto px-gutter-desktop py-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-space-md">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-space-md">
            <Link to="/" className="flex items-center gap-space-xs group">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
                  Civic<span className="text-primary-container">Solve</span>
                </span>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider text-[10px] font-bold">
                  SIH'24 Grand Innovation
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md transition-all ${
                      isActive
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                        : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Area: Search, Role Switcher, Profile */}
          <div className="flex items-center gap-space-sm">
            
            {/* Quick Role Switcher */}
            <div className="hidden md:flex items-center bg-surface-container-low p-1 rounded-full shadow-inner border border-surface-container-high/40">
              {roles.map(({ role, label }) => {
                const isSelected = currentRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => switchRole(role)}
                    className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                      isSelected
                        ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Notifications Bell */}
            <button
              type="button"
              className="relative p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                3
              </span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 pl-2 border-l border-surface-container-high">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
              />
              <div className="hidden sm:flex flex-col text-left">
                <span className="font-label-md text-label-md text-on-surface font-semibold leading-tight">
                  {currentUser.name}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-[11px] leading-tight">
                  {currentUser.title}
                </span>
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* 8-Stage Lifecycle Stepper Ribbon (Visible on main views) */}
        <div className="overflow-x-auto pt-2 hidden lg:flex items-center gap-1 border-t border-surface-container-high/40 mt-2">
          <div className="flex items-center gap-1.5 font-label-sm text-label-sm whitespace-nowrap text-[11px]">
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">record_voice_over</span>1. Citizen Problem
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">auto_awesome</span>2. AI Analysis
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">verified_user</span>3. Govt Validation
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">school</span>4. University Matching
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">groups</span>5. Team Collaboration
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">precision_manufacturing</span>6. Prototype
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">rocket_launch</span>7. Deployment
            </span>
            <span className="text-outline-variant font-bold">→</span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface flex items-center gap-1 font-semibold">
              <span className="material-symbols-outlined text-xs">award_star</span>8. Impact
            </span>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-3 pb-2 border-t border-surface-container-high mt-2 flex flex-col gap-2">
            <div className="flex flex-wrap gap-1 p-1 bg-surface-container-low rounded-lg mb-2">
              {roles.map(({ role, label }) => (
                <button
                  key={role}
                  onClick={() => {
                    switchRole(role);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-1 rounded-md text-xs font-semibold ${
                    currentRole === role ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-surface-container-low text-on-surface"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};