import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "./logo.png";
import API_BASE_URL from './config/api.js';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  LogIn, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: pass }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', data.user?.email || email.trim());
        localStorage.setItem('userName', data.user?.name || email.split('@')[0]);
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        navigate('/home');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Connection to server failed. Please ensure backend is running.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#2A0C13] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow and imagery */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50 "
        style={{
          backgroundImage: `url('https://thumbs.dreamstime.com/b/traditional-indian-sweets-decorative-bowl-stone-table-festive-lights-lanterns-background-create-diwali-atmosphere-351077358.jpg')`
        }}
      ></div>

      <div className="absolute -top-20 -left-20 w-80 h-80 bg-[#E8A33D]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-[#8C273B]/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Login Card */}
      <div className="relative w-full max-w-md bg-linear-to-tr from-white to-[#ffd700] backdrop-blur-xl border-2 border-[#E8A33D]/60 rounded-3xl shadow-2xl p-8 sm:p-10 z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#4A1521] text-[#E8A33D] flex items-center justify-center mx-auto mb-3 shadow-lg border border-[#E8A33D]/50">
            <span className="text-2xl rounded-full"><img className='rounded-full' src={logo} alt="Nanthana Bakery Logo" /></span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#4A1521]">
            Nanthana Bakery
          </h1>
          <p className="text-xs text-[#8C6D5B] font-semibold tracking-wider uppercase mt-1">
            Sign in to your sweet account
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0742D]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#4A1521] placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0742D]" />
              <input
                type={showPassword ? "text" : "password"}
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl pl-10 pr-10 py-2.5 text-sm text-[#4A1521] placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#B0742D] hover:text-[#4A1521]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] font-bold text-xs uppercase tracking-wider py-3 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <LogIn className="w-4 h-4 text-[#E8A33D]" />
            <span>{loading ? "Logging in..." : "Log In to Store"}</span>
          </button>
        </form>

        {/* Register footer link */}
        <div className="mt-6 text-center text-xs text-[#785E4F]">
          <span>Don't have an account yet? </span>
          <Link
            to="/register"
            className="font-bold text-[#8C273B] hover:text-[#4A1521] hover:underline"
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;