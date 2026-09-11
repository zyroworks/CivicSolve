import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { signInWithGoogle, signInSimulatedGoogle, isFirebaseLive, isAuthenticated, user } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<UserRole>('CITIZEN');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If already authenticated, allow quick redirect
  if (isAuthenticated && user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 bg-surface-container-lowest rounded-3xl border border-surface-container-high shadow-xl text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full ring-4 ring-primary/20 overflow-hidden">
            <img src={user.photoURL} alt={user.displayName} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 mb-2">
              <span className="material-symbols-outlined text-xs">verified</span>
              Signed In with Google
            </span>
            <h2 className="text-xl font-bold text-on-surface">{user.displayName}</h2>
            <p className="text-sm text-on-surface-variant">{user.email}</p>
          </div>
          <div className="pt-4 flex flex-col gap-3">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3 px-4 bg-primary text-on-primary font-bold rounded-xl shadow-md hover:bg-primary/90 transition-colors"
            >
              Continue to Home Dashboard
            </button>
            <button
              onClick={() => navigate('/report')}
              className="w-full py-3 px-4 bg-surface-container-high text-on-surface font-semibold rounded-xl hover:bg-surface-container-highest transition-colors text-sm"
            >
              Report a Civic Problem
            </button>
          </div>
        </div>
      </div>
    );
  }

  const roleOptions: { role: UserRole; title: string; desc: string; icon: string }[] = [
    {
      role: 'CITIZEN',
      title: 'Citizen',
      desc: 'Report civic issues, track ward resolution, endorse solutions',
      icon: 'record_voice_over',
    },
    {
      role: 'GOVT_ADMIN',
      title: 'Government Officer',
      desc: 'Municipal triage, validate challenges, allocate R&D grants',
      icon: 'account_balance',
    },
    {
      role: 'UNIVERSITY',
      title: 'Academic Researcher',
      desc: 'Claim validated challenges, engineer lab prototypes (TRL 1-6)',
      icon: 'school',
    },
    {
      role: 'INDUSTRY',
      title: 'Industry / CSR Sponsor',
      desc: 'Fund engineering sprints, provide corporate hardware grants',
      icon: 'domain',
    },
  ];

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await signInWithGoogle(selectedRole);
      navigate('/');
    } catch (err: any) {
      console.error('Google Sign-in failed:', err);
      setErrorMessage(err.message || 'Failed to sign in with Google. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      await signInSimulatedGoogle('Dr. Ananya Sen', 'ananya.sen@jharkhand-gov.in', selectedRole);
      navigate('/');
    } catch (err: any) {
      setErrorMessage(err.message || 'Demo sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Platform Hero & Security Assurances */}
        <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary/95 to-slate-900 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="material-symbols-outlined text-2xl text-white">hub</span>
              </div>
              <div>
                <span className="font-bold text-lg tracking-tight text-white">Civic<span className="text-emerald-400">Solve</span></span>
                <p className="text-[10px] text-white/70 uppercase tracking-widest font-bold">Societal Innovation Platform</p>
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Empowering Citizens & Innovators Across Jharkhand
              </h1>
              <p className="text-sm text-white/80 mt-3 leading-relaxed">
                Connect directly with municipal administrators, university engineering labs, and industry mentors to solve urgent societal challenges.
              </p>
            </div>

            {/* Value Pillars */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-emerald-400 text-xl">verified_user</span>
                <div>
                  <p className="text-xs font-bold text-white">Google OAuth 2.0 Security</p>
                  <p className="text-[11px] text-white/70">Instant, passwordless verification</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-sky-300 text-xl">map</span>
                <div>
                  <p className="text-xs font-bold text-white">Jharkhand GIS Map Triage</p>
                  <p className="text-[11px] text-white/70">24 Districts geo-tagged problem tracker</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                <span className="material-symbols-outlined text-amber-300 text-xl">handshake</span>
                <div>
                  <p className="text-xs font-bold text-white">Multi-Stakeholder Bridge</p>
                  <p className="text-[11px] text-white/70">Government, Academia, & Industry aligned</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 mt-4 border-t border-white/10 text-xs text-white/60 relative z-10 flex items-center justify-between">
            <span>Official Societal Platform</span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Secure 256-Bit SSL
            </span>
          </div>
        </div>

        {/* Right Side: Google Login & Role Selector Form */}
        <div className="lg:col-span-7 bg-surface-container-lowest p-8 sm:p-10 rounded-3xl border border-surface-container-high shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Single Sign-On</span>
              <h2 className="text-2xl sm:text-3xl font-black text-on-surface tracking-tight mt-1">
                Sign in to your Account
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Use your official Google account for secure, one-click access.
              </p>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="p-3.5 bg-error/10 border border-error/20 rounded-2xl flex items-start gap-2.5 text-error text-xs">
                <span className="material-symbols-outlined text-base mt-0.5">error</span>
                <div>
                  <p className="font-bold">Authentication Issue</p>
                  <p className="mt-0.5 text-error/90 leading-normal">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                1. Select your Primary Civic Persona
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {roleOptions.map((opt) => {
                  const isSelected = selectedRole === opt.role;
                  return (
                    <button
                      key={opt.role}
                      type="button"
                      onClick={() => setSelectedRole(opt.role)}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        isSelected
                          ? 'border-primary bg-primary-container/20 ring-2 ring-primary/20'
                          : 'border-surface-container-high hover:border-surface-container-highest bg-surface-container-low/50 hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`material-symbols-outlined text-lg ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                          {opt.icon}
                        </span>
                        <span className={`text-xs font-bold ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                          {opt.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-1 line-clamp-2 leading-tight">
                        {opt.desc}
                      </p>
                      {isSelected && (
                        <span className="absolute top-2 right-2 material-symbols-outlined text-primary text-sm font-bold">
                          check_circle
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary Google Login Button */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-2">
                2. Authenticate with Google
              </label>
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-2xl bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-sm shadow-md hover:shadow-lg border border-neutral-300 transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer group"
              >
                {/* Authentic 4-color Google G Icon */}
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
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
                <span>{loading ? 'Connecting with Google...' : 'Continue with Google'}</span>
              </button>

              {/* Status indicator */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-on-surface-variant">
                <span className="flex items-center gap-1">
                  <span className={`w-2 h-2 rounded-full ${isFirebaseLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  {isFirebaseLive ? 'Live Firebase Google Auth Active' : 'Ready for Firebase Credentials (Dev Mode)'}
                </span>
                <span className="text-[10px] text-outline font-medium">OAuth 2.0 SSL</span>
              </div>
            </div>

            {/* Quick Demo Login Option */}
            <div className="pt-2 border-t border-surface-container-high/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-on-surface-variant">Quick Presentation Access:</span>
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">bolt</span>
                  1-Click Verified Demo Sign-In
                </button>
              </div>
            </div>

          </div>

          {/* Footer Back Link */}
          <div className="pt-6 mt-6 border-t border-surface-container-high/60 text-center text-xs text-on-surface-variant">
            <span>Want to browse first? </span>
            <Link to="/" className="text-primary font-bold hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
