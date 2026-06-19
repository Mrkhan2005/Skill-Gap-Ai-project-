import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import GlowTracker from './components/GlowTracker';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <div className="min-h-screen bg-[#060913] text-[#F8FAFC] flex flex-col antialiased selection:bg-indigo-500 selection:text-white pb-12 relative overflow-hidden">
      
      {/* Animated Liquid Lamp Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] liquid-blob-1 opacity-65" />
        <div className="absolute bottom-[10%] right-[-15%] w-[70%] h-[70%] liquid-blob-2 opacity-60" />
        <div className="absolute top-[35%] left-[25%] w-[50%] h-[50%] liquid-blob-3 opacity-45" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <GlowTracker />
        <Navbar />
        <AuthModal />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Navigate to="/dashboard/overview" replace />} />
          <Route path="/dashboard/:tab" element={<DashboardPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Footer */}
        <footer className="mt-16 border-t border-white/5 pt-8 px-4 text-center max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium relative z-10">
          <p>© 2026 NextMove AI • Google Cloud Run Ecosystem.</p>
          <div className="flex gap-4">
            <a href="/" className="hover:text-slate-300 transition">Home</a>
            <span className="text-indigo-500 font-bold">Secure Core Active</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
