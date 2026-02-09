import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tmheroBg from '../../assets/tmhero-bg.png';

const Landing = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [stats, setStats] = useState({ tasks: 0, hours: 0, users: 0 });

  useEffect(() => {
    // Mouse tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animated counter for stats
    const animateCounter = () => {
      let startTime: number | null = null;
      const duration = 2000;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
        const easedProgress = easeOut(progress);
        
        setStats({
          tasks: Math.floor(easedProgress * 12500),
          hours: Math.floor(easedProgress * 89000),
          users: Math.floor(easedProgress * 3200),
        });
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    // Trigger animation after page load
    const timer = setTimeout(animateCounter, 500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const features = [
    {
      id: 1,
      title: "Smart Task Management",
      description: "AI-powered task prioritization with auto-scheduling and context-aware organization.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
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
      stats: "12500+ tasks managed daily",
      textColor: "text-emerald-900",
      descriptionColor: "text-emerald-800",
      iconColor: "text-emerald-800"
    },
    {
      id: 2,
      title: "Precision Time Tracking",
      description: "Automatic time tracking with detailed analytics and productivity insights.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
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
      stats: "89,000+ hours tracked",
      textColor: "text-violet-900",
      descriptionColor: "text-violet-800",
      iconColor: "text-violet-800"
    },
    {
      id: 3,
      title: "Advanced Analytics",
      description: "Predictive insights and performance forecasting with visual dashboards.",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24">
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
      stats: "98% productivity increase",
      textColor: "text-amber-900",
      descriptionColor: "text-amber-800",
      iconColor: "text-amber-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-gray-900 text-slate-100 relative overflow-hidden">
      {/* Add CSS animations to your global CSS file */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(10px) translateX(5px); }
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 15s ease infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s infinite ease-in-out ${Math.random() * 2}s`,
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}
          />
        ))}
      </div>

      {/* Interactive gradient orb */}
      <div 
        className="fixed w-[800px] h-[800px] rounded-full pointer-events-none opacity-10 blur-3xl transition-all duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)',
          left: `${mousePosition.x - 400}px`,
          top: `${mousePosition.y - 400}px`,
          transform: 'translate3d(0, 0, 0)',
        }}
      />

      {/* Navbar - Updated with solid buttons */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200/30 shadow-2xl">
        <div className="max-w-7xl mx-auto pl-3 pr-6 py-4 flex items-center justify-between">
          <Link to="/" className="group relative -ml-2">
            <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative text-3xl md:text-4xl font-bold tracking-normal">
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent">
                TaskMaster
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-6">
            {/* Updated Login Button */}
            <Link
              to="/login"
              className="relative px-8 py-3 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 font-bold text-blue-800 group-hover:text-blue-700 font-semibold rounded-xl transition-all d"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Log In</span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
            
            {/* Updated Get Started Button */}
            <Link
              to="/register"
              className="relative px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/40 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Get Started Free</span>
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with Background Image */}
      <section 
        className="relative pt-24 pb-32 px-6 md:pt-32 md:pb-40 overflow-hidden min-h-[90vh] flex items-center"
        style={{
          backgroundImage: `url(${tmheroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(to right, #64748b 1px, transparent 1px),
                             linear-gradient(to bottom, #64748b 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }} />
        </div>

        {/* Shimmer effect overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -inset-y-full -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12 animate-shimmer"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 w-full">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-3 mb-10 px-6 py-3 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-xl rounded-full border border-white/20 shadow-2xl">
            <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-ping"></div>
            <span className="text-sm font-semibold text-slate-500 tracking-wider">
              PERSONAL TASK & TIME TRACKER
            </span>
          </div>

          {/* Main headline with elegant typography */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-gray-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent font-light italic">
                Own Your <span className="font-bold">Time.</span>
              </span>
            </h1>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <span className="bg-gradient-to-r from-gray-800 via-purple-800 to-indigo-800 bg-clip-text text-transparent font-light italic">
                Amplify Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-800 bg-clip-text text-transparent font-bold">
                Focus.
              </span>
            </h2>
          </div>

          {/* Subheading with elegant styling */}
          <div className="relative max-w-3xl mx-auto mb-16 -mt-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/15 to-purple-500/10 rounded-3xl blur-3xl opacity-60"></div>
            <p className="relative text-base md:text-lg text-slate-200 font-medium leading-relaxed backdrop-blur-xl bg-white/10 p-6 md:p-8 rounded-3xl border border-white/20 shadow-2xl text-center">
              TaskMaster brings together simple task management, accurate time tracking, and clear productivity insights by helping users stay organized with clarity and ease.
            </p>
          </div>

          {/* Interactive CTA buttons - UPDATED */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            {/* Primary CTA - Updated with modern color */}
            <Link
              to="/register"
              className="group relative px-14 py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden transform hover:scale-[1.02] border-2 border-transparent hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-3">
                <span>Start Free Today</span>
                <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

            {/* Secondary CTA - Updated with modern color */}
            <Link
              to="/login"
              className="group relative px-14 py-5 bg-gradient-to-r from-slate-800/90 to-slate-900/90 hover:from-slate-700 hover:to-slate-800 backdrop-blur-xl border-2 border-slate-700 hover:border-slate-500 text-slate-900 text-xl font-semibold rounded-2xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span className="text-blue-900">Already have an account?</span>
                <span className="font-bold text-blue-800 group-hover:text-blue-700">Log In →</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>


        </div>
      </section>

      {/* Features Section - COMPLETELY UPDATED FOR DARK TEXT */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-gray-100 to-gray-200">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Modern Features
              </span>
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
              Designed for the next generation of productivity
            </p>
          </div>

          {/* Interactive feature cards - WITH DARK TEXT */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature) => (
              <div
                key={feature.id}
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeCard === feature.id ? 'scale-105' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveCard(feature.id)}
                onMouseLeave={() => setActiveCard(null)}
              >
                {/* Card glow effect */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${feature.gradient} rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative bg-white backdrop-blur-sm rounded-3xl p-10 border border-gray-300/50 shadow-2xl overflow-hidden">
                  {/* Animated background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-transparent"></div>
                  </div>

                  {/* Icon with gradient - UPDATED WITH DARK ICONS */}
                  <div className={`relative w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-8 transform group-hover:rotate-6 transition-transform duration-500 shadow-lg`}>
                    <div className={feature.iconColor}>
                      {feature.icon}
                    </div>
                  </div>

                  {/* Content - UPDATED WITH DARK TEXT */}
                  <h3 className={`text-2xl font-bold ${feature.textColor} mb-4 group-hover:scale-105 transition-transform duration-300`}>
                    {feature.title}
                  </h3>
                  <p className={`${feature.descriptionColor} mb-6 leading-relaxed font-medium`}>
                    {feature.description}
                  </p>
                  
                  {/* Stats badge - UPDATED WITH DARK TEXT */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/80 backdrop-blur-sm rounded-full border border-gray-300/50">
                    <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`}></div>
                    <span className="text-sm font-medium text-gray-800">{feature.stats}</span>
                  </div>

                  {/* Hover arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                    <div className={`w-10 h-10 bg-gradient-to-r ${feature.gradient} rounded-full flex items-center justify-center shadow-lg`}>
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive demo preview - UPDATED WITH LIGHT BACKGROUND */}
          <div className="mt-20 relative rounded-3xl overflow-hidden border border-gray-300/50 shadow-2xl bg-gradient-to-br from-white to-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5"></div>
            <div className="relative p-12 text-center">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <h3 className="text-3xl font-bold text-gray-800 mb-4">Live Interactive Demo</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-medium">
                Experience TaskMaster's intuitive interface with real-time updates and seamless interactions
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {['Task Creation', 'Time Tracking', 'Analytics Dashboard'].map((item, index) => (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-300 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 group shadow-md">
                    <div className="text-gray-800 font-semibold mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {item}
                    </div>
                    <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">Click to interact</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  TaskMaster
                </span>
              </div>
              <p className="text-slate-500">© {new Date().getFullYear()} TaskMaster Pro</p>
            </div>
            
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-300">Built for ANKA Technologies</p>
              <p className="text-sm text-slate-500 mt-2">Kandy, Sri Lanka</p>
            </div>
            
            <div className="flex gap-6">
              

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-blue-800 rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.98h4V24h-4V8.98zM8.98 8.98h3.84v2.07h.05c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.21V24h-4v-7.5c0-1.79-.03-4.09-2.49-4.09-2.49 0-2.87 1.94-2.87 3.96V24h-4V8.98z" />
                </svg>
              </a>

              <a
                href="#"
                aria-label="GitHub"
                className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-black rounded-xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.11.79-.25.79-.56 0-.28-.01-1.02-.01-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.72 1.27 3.38.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.3-.52-1.52.11-3.17 0 0 .97-.31 3.17 1.18a11 11 0 015.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.65.23 2.87.12 3.17.74.81 1.19 1.84 1.19 3.1 0 4.43-2.71 5.4-5.29 5.68.42.36.8 1.08.8 2.18 0 1.58-.01 2.85-.01 3.24 0 .31.21.68.8.56C20.71 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-slate-800 text-center">
            <p className="text-sm text-slate-600">
              Designed with precision • Built for productivity • Optimized for performance
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;