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
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roles: { role: UserRole; label: string; icon: string; desc: string }[] = [
    { role: 'CITIZEN', label: 'Citizen', icon: 'campaign', desc: 'Report issues & track ward progress' },
    { role: 'GOVT_ADMIN', label: 'Govt Admin', icon: 'account_balance', desc: 'Municipal triage & validation' },
    { role: 'UNIVERSITY', label: 'University', icon: 'school', desc: 'R&D labs & student prototypes' },
    { role: 'INDUSTRY', label: 'Industry', icon: 'corporate_fare', desc: 'CSR funding & mentor network' },
  ];

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/challenges', label: 'Challenges' },
    { path: '/#how-it-works', label: 'How It Works', isAnchor: true },
  ];

  const handleNavClick = (e: React.MouseEvent, path: string, isAnchor?: boolean) => {
    if (isAnchor && path.startsWith('/#')) {
      const anchorId = path.replace('/#', '');
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };


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

  const activeRoleObj = roles.find((r) => r.role === currentRole) || roles[0];

  return (
    <header className="fixed top-0 left-0 right-0 w-full h-14 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

        
        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <span className="material-symbols-outlined text-lg">hub</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-slate-900 tracking-tight leading-none">
                Civic<span className="text-blue-600">Solve</span>
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Capacity Connect
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path && !link.isAnchor;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path, link.isAnchor)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-blue-600 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 font-medium'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>


        {/* Right Area: Persona Switcher, Notifications & Auth State */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Streamlined Role Persona Dropdown */}
          <div className="relative" ref={roleRef}>
            <button
              type="button"
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium transition-colors"
              title="Switch Active Persona"
            >
              <span className="material-symbols-outlined text-base text-blue-600">
                {activeRoleObj.icon}
              </span>
              <span>{activeRoleObj.label}</span>
              <span className="material-symbols-outlined text-sm text-slate-400">
                {roleDropdownOpen ? 'expand_less' : 'expand_more'}
              </span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-50">
                <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Persona
                </div>
                {roles.map(({ role, label, icon, desc }) => {
                  const isSelected = currentRole === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        switchRole(role);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                        isSelected
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-base mt-0.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`}>
                        {icon}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span>{label}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                        </div>
                        <p className="text-[10px] text-slate-500 font-normal leading-tight mt-0.5">{desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="View notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-xl shadow-lg p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">Platform Notifications</h3>
                    <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-700 rounded-full">
                      {unreadCount} new
                    </span>
                  </div>
                  <button
                    onClick={() => setUnreadCount(0)}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all read
                  </button>
                </div>

                <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                  {sampleNotifications.map((notif) => (
                    <div key={notif.id} className="py-3 hover:bg-slate-50 rounded-lg px-2 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-900">{notif.title}</span>
                        <span className="text-[10px] text-slate-400">{notif.time}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 text-center">
                  <Link
                    to="/admin"
                    onClick={() => setNotificationsOpen(false)}
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    View All Triage Activity →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Prominent Report a Problem CTA Button */}
          <Link
            to={isAuthenticated ? "/report" : "/login?redirect=/report"}
            state={{ from: '/report', message: 'Please log in to report a community problem.' }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">add_location_alt</span>
            <span>Report a Problem</span>
          </Link>


          {/* Authentication Section */}
          {isAuthenticated && user ? (
            <div className="relative" ref={profileRef}>
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all text-left"
              >
                <img
                  src={user.photoURL || currentUser.avatar}
                  alt={user.displayName || 'User'}
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span className="hidden md:inline text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                  {user.displayName || 'Innovator'}
                </span>
                <span className="material-symbols-outlined text-sm text-slate-400">
                  {profileDropdownOpen ? 'expand_less' : 'expand_more'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-50">
                  <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg mb-2">
                    <img
                      src={user.photoURL || currentUser.avatar}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-slate-900 truncate">{user.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {currentUser.title}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <Link
                      to="/workspace"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <span className="material-symbols-outlined text-base text-slate-400">terminal</span>
                      <span>My Workspace</span>
                    </Link>
                    <Link
                      to="/admin"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-slate-700 hover:bg-slate-50 font-medium"
                    >
                      <span className="material-symbols-outlined text-base text-slate-400">policy</span>
                      <span>Municipal Portal</span>
                    </Link>
                  </div>

                  <div className="pt-2 mt-2 border-t border-slate-100">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">logout</span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <span>Sign In</span>
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg space-y-3">
          {/* Prominent Mobile CTA */}
          <Link
            to={isAuthenticated ? "/report" : "/login?redirect=/report"}
            state={{ from: '/report', message: 'Please log in to report a community problem.' }}
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-xs"
          >
            <span className="material-symbols-outlined text-lg">add_location_alt</span>
            <span>Report a Problem</span>
          </Link>


          <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-slate-50 rounded-lg">
            {roles.map(({ role, label, icon }) => (
              <button
                key={role}
                onClick={() => {
                  switchRole(role);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  currentRole === role
                    ? 'bg-blue-600 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>

          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={(e) => {
                  handleNavClick(e, link.path, link.isAnchor);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  location.pathname === link.path && !link.isAnchor
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 font-medium'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-1 px-3 py-2 rounded-lg text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">login</span>
                <span>Sign In</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>

  );
};