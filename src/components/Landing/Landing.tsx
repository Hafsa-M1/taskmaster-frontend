import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tmheroBg from '../../assets/tmhero-bg.png';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const features = [
    {
      id: 1,
      title: "Smart Task Management",
      description: "Create, edit, and organize tasks with clear status tracking.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="grad-feature-1" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#0f766e" />
            </linearGradient>
          </defs>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#grad-feature-1)" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600",
      hoverGradient: "from-emerald-600 to-teal-700",
      textColor: "text-emerald-900",
      descriptionColor: "text-emerald-800/90",
      iconColor: "text-emerald-800"
    },
    {
      id: 2,
      title: "Precision Time Tracking",
      description: "Track time for each task with start/stop timers and clear totals.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="grad-feature-2" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#6d28d9" />
            </linearGradient>
          </defs>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#grad-feature-2)" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: "from-violet-500 to-purple-600",
      hoverGradient: "from-violet-600 to-purple-700",
      textColor: "text-violet-900",
      descriptionColor: "text-violet-800/90",
      iconColor: "text-violet-800"
    },
    {
      id: 3,
      title: "Productivity Insights",
      description: "View completed tasks and time spent today and this week in one dashboard.",
      icon: (
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="grad-feature-3" x1="0%" x2="100%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="url(#grad-feature-3)" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "from-amber-500 to-orange-600",
      hoverGradient: "from-amber-600 to-orange-700",
      textColor: "text-amber-900",
      descriptionColor: "text-amber-800/90",
      iconColor: "text-amber-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-100 relative overflow-hidden">
      {/* Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float { animation: float 7s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 8s infinite linear; }
      `}</style>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-400/25 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: '0 0 25px rgba(59, 130, 246, 0.4)'
            }}
          />
        ))}
      </div>

      {/* Mouse-following orb */}
      <div
        className="fixed w-[900px] h-[900px] rounded-full pointer-events-none opacity-10 blur-3xl transition-all duration-200"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.45) 0%, rgba(139, 92, 246, 0.25) 50%, transparent 70%)',
          left: `${mousePosition.x - 450}px`,
          top: `${mousePosition.y - 450}px`,
        }}
      />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="text-4xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
              TaskMaster
            </span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              to="/login"
              className="px-7 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 text-blue-300 font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Log In
            </Link>
            <Link
              to="/register"
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

     
      <section
        className="relative pt-32 pb-40 px-6 md:pt-30 md:pb-56 min-h-[90vh] flex items-center overflow-hidden"
        style={{
          backgroundImage: `url(${tmheroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/65 to-black/55" />
        
        {/* Subtle shimmer */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -inset-y-full -left-1/2 w-1/2 h-full bg-gradient-to-r from-transparent via-white/8 to-transparent transform rotate-12 animate-shimmer" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 mb-12 px-7 py-3.5 bg-white/10 backdrop-blur-lg rounded-full border border-white/15 shadow-xl">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping" />
            <span className="text-sm font-semibold tracking-wider text-slate-300">
              PERSONAL TASK & TIME TRACKER
            </span>
          </div>

          <div className="space-y-5 mb-14">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight leading-tight">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent font-light italic">
                Own Your
              </span>{' '}
              <span className="font-bold">Time.</span>
            </h1>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-bold">
                Amplify Your Focus.
              </span>
            </h2>
          </div>

          <p className="max-w-3xl mx-auto mb-16 text-lg md:text-xl text-slate-200 font-light leading-relaxed backdrop-blur-sm bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl">
            TaskMaster combines intuitive task management, precise time tracking, and meaningful productivity insights by helping you stay organized and focused with clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-400 transform hover:scale-[1.03] border border-white/10"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Free Today
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl" />
            </Link>

            <Link
              to="/login"
              className="px-12 py-6 bg-white/10 backdrop-blur-lg border border-white/20 hover:border-white/40 text-blue text-xl font-semibold rounded-2xl transition-all duration-300 hover:bg-white/15 shadow-xl"
            >
              Already have an account? <span className="font-bold">Log In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section – more balanced & polished */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-5">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Modern Features
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Built to help you work smarter — not harder.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`group relative transition-all duration-400 hover:-translate-y-2 ${
                  activeCard === feature.id ? 'scale-[1.04]' : 'hover:scale-[1.03]'
                }`}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 -z-10`} />

                <div className="relative bg-white rounded-3xl p-10 border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-400 min-h-[340px] flex flex-col">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className={`text-2xl font-bold ${feature.textColor} mb-5 group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>

                  <p className={`text-base ${feature.descriptionColor} leading-relaxed flex-grow`}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Optional demo preview – kept but can be removed if not needed */}
          
        </div>
      </section>

      {/* Footer – unchanged for now */}
      <footer className="relative py-16 px-6 bg-slate-950 border-t border-slate-800/70">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
      {/* Brand & Copyright */}
      <div>
        <div className="text-3xl font-bold tracking-tight mb-3">
          <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            TaskMaster
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} TaskMaster – Personal Task & Time Tracker
        </p>
      </div>

      {/* Assignment context – clean & subtle */}
      <div className="text-slate-400 text-sm space-y-1">
        <p className="font-medium text-slate-300">
          Assignment for ANKA Technologies (Pvt) Ltd
        </p>
        <p>R&D Team – Kandy, Sri Lanka</p>
      </div>
    </div>

    {/* Optional subtle bottom line */}
    <div className="mt-10 pt-8 border-t border-slate-800/50 text-center">
      <p className="text-xs text-slate-600">
        Built with React, TypeScript, NestJS & PostgreSQL
      </p>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Landing;