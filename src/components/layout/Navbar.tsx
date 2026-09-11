import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, currentUser, currentRole, switchRole, isAuthenticated, signOut } = useAuth();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { role: UserRole; label: string; icon: string }[] = [
    { role: 'CITIZEN', label: 'Citizens', icon: 'campaign' },
    { role: 'GOVT_ADMIN', label: 'Govt Admin', icon: 'account_balance' },
    { role: 'UNIVERSITY', label: 'Universities', icon: 'school' },
    { role: 'INDUSTRY', label: 'Industry', icon: 'corporate_fare' },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/report', label: 'Report Problem' },
    { path: '/challenges', label: 'Challenges' },
    { path: '/workspace', label: 'Innovation Projects' },
    { path: '/admin', label: 'Govt Portal' },
    { path: '/impact', label: 'Impact' },
    { path: '/presentation', label: '⚡ SIH Pitch Deck' },
  ];

  const sampleNotifications = [
    {
      id: 'notif-1',
      title: 'High Priority Triage Match',
      desc: 'Drinking Water Turbidity #JHK-2024-884 verified by RMC Admin.',
      time: '12m ago',
      unread: true,
    },
    {
      id: 'notif-2',
      title: 'Lab Sprint Milestone',
      desc: 'BIT Sindri Lab submitted Sprint 3 telemetry data for Solar Micro-Grid.',
      time: '2h ago',
      unread: true,
    },
    {
      id: 'notif-3',
      title: 'CSR Matching Grant',
      desc: 'Tata Steel Foundation allocated ₹8.5L CSR grant for IoT sensors.',
      time: '1d ago',
      unread: true,
    },
  ];

  const handleSignOut = async () => {
    setProfileDropdownOpen(false);
    await signOut();
    navigate('/');
  };

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
                  Societal Innovation Platform
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

          {/* Right Area: Role Switcher, Notifications & Auth State */}
          <div className="flex items-center gap-space-sm">
            
            {/* SIH Pitch Deck Quick Button */}
            <Link
              to="/presentation"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 via-primary to-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 hover:shadow-cyan-500/40 transition-all border border-cyan-400/30"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-200 animate-ping" />
              <span>SIH Pitch Deck</span>
            </Link>

            {/* Quick Stakeholder Persona Switcher */}
            <div className="hidden lg:flex items-center bg-surface-container-low p-1 rounded-full shadow-inner border border-surface-container-high/40">
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

            {/* Notifications Bell Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-full hover:bg-surface-container-low text-on-surface-variant transition-colors"
                title="Notifications"
              >
                <span className="material-symbols-outlined text-xl">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Drawer */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-surface-container-high/60">
                    <div className="flex items-center gap-1.5">
                      <span className="font-title-sm text-on-surface font-bold text-sm">Platform Notifications</span>
                      <span className="text-xs bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full font-bold">
                        {unreadCount} new
                      </span>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-[11px] text-primary hover:underline font-semibold"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {sampleNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="p-2.5 rounded-xl hover:bg-surface-container-low transition-colors border border-transparent hover:border-surface-container-high/40 text-left"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <p className="text-xs font-bold text-on-surface leading-tight">{notif.title}</p>
                          <span className="text-[10px] text-on-surface-variant whitespace-nowrap">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">{notif.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 mt-2 border-t border-surface-container-high/60 text-center">
                    <Link
                      to="/challenges"
                      onClick={() => setNotificationsOpen(false)}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      View All Activity in Jharkhand →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* REAL GOOGLE AUTH SECTION */}
            {isAuthenticated && user ? (
              /* Authenticated User Profile Pill & Dropdown */
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full border border-surface-container-high hover:border-primary/40 hover:bg-surface-container-low transition-all text-left group"
                >
                  <div className="relative">
                    <img
                      src={user.photoURL || currentUser.avatar}
                      alt={user.displayName || 'Google User'}
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 ring-2 ring-surface-container-lowest rounded-full" />
                  </div>
                  <div className="hidden sm:flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-label-md text-label-md text-on-surface font-bold leading-tight max-w-[130px] truncate">
                        {user.displayName || 'Civic User'}
                      </span>
                      <span className="material-symbols-outlined text-[14px] text-emerald-600" title="Google Verified Account">
                        verified
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary text-[10px] font-bold leading-tight">
                      {currentUser.title}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-base text-on-surface-variant group-hover:text-primary transition-transform">
                    {profileDropdownOpen ? 'expand_less' : 'expand_more'}
                  </span>
                </button>

                {/* Authenticated User Dropdown Menu */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-xl p-3 z-50">
                    
                    {/* User ID Card */}
                    <div className="flex items-center gap-3 p-2 bg-surface-container-low rounded-xl mb-3 border border-surface-container-high/40">
                      <img
                        src={user.photoURL || currentUser.avatar}
                        alt={user.displayName}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="font-bold text-sm text-on-surface truncate">{user.displayName}</p>
                        </div>
                        <p className="text-[11px] text-on-surface-variant truncate">{user.email}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                            <span className="material-symbols-outlined text-[10px]">check_circle</span>
                            Google Auth
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Persona Selector inside Menu */}
                    <div className="mb-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant mb-1.5 px-1">
                        Active Persona
                      </p>
                      <div className="grid grid-cols-2 gap-1.5">
                        {roles.map(({ role, label, icon }) => {
                          const isSelected = currentRole === role;
                          return (
                            <button
                              key={role}
                              type="button"
                              onClick={() => {
                                switchRole(role);
                              }}
                              className={`flex items-center gap-1.5 p-1.5 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-primary text-on-primary shadow-sm'
                                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                              }`}
                            >
                              <span className="material-symbols-outlined text-sm">{icon}</span>
                              <span className="truncate">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quick Access Links */}
                    <div className="space-y-1 mb-3 pt-2 border-t border-surface-container-high/60">
                      <Link
                        to="/report"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-primary">add_circle</span>
                        Report New Civic Issue
                      </Link>
                      <Link
                        to="/workspace"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-primary">biotech</span>
                        Innovation Lab Projects
                      </Link>
                      <Link
                        to="/admin"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-colors"
                      >
                        <span className="material-symbols-outlined text-base text-primary">dashboard</span>
                        Government Portal Desk
                      </Link>
                    </div>

                    {/* Sign Out Button */}
                    <div className="pt-2 border-t border-surface-container-high/60">
                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-error/10 text-error hover:bg-error/20 font-bold text-xs transition-colors"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        Sign Out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* Logged Out State: Official Google Sign-In Button */
              <Link
                to="/login"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold shadow-sm border border-neutral-300 hover:shadow transition-all group"
                title="Sign in with your Google account"
              >
                {/* Official Google G Logo */}
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.39 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="hidden sm:inline">Sign in with Google</span>
                <span className="sm:hidden">Sign In</span>
              </Link>
            )}

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

        {/* Mobile dropdown drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden pt-3 pb-2 border-t border-surface-container-high mt-2 flex flex-col gap-2">
            
            {/* Mobile Auth Status */}
            {isAuthenticated && user ? (
              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl mb-1">
                <div className="flex items-center gap-2">
                  <img
                    src={user.photoURL || currentUser.avatar}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-xs font-bold text-on-surface">{user.displayName}</p>
                    <p className="text-[10px] text-primary">{currentUser.title}</p>
                  </div>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-2.5 py-1 text-xs text-error font-semibold bg-error/10 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white border border-neutral-300 text-neutral-800 text-xs font-bold shadow-sm mb-1"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.39 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.27 2.61 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                Sign in with Google
              </Link>
            )}

            {/* Mobile Role Switcher */}
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

            {/* Mobile Nav Links */}
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