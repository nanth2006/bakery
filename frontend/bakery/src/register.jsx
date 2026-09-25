import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from "./logo.png";
import API_BASE_URL from './config/api.js';
import { 
  Sparkles, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  UserPlus, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password: pass,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success !== false) {
        setSuccess('✓ Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 1200);
      } else {
        setError(data.message || 'Registration failed. Please try again.');
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
        className="absolute inset-0 bg-cover bg-center mix-blend-hard-light"
        style={{
          backgroundImage: `url('https://thumbs.dreamstime.com/b/traditional-indian-sweets-decorative-bowl-stone-table-festive-lights-lanterns-background-create-diwali-atmosphere-351077358.jpg')`
        }}
      ></div>

      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#E8A33D]/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#8C273B]/30 rounded-full blur-3xl pointer-events-none"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-linear-to-tr from-white to-[#ffd700] backdrop-blur-xl border-2 border-[#E8A33D]/60 rounded-3xl shadow-2xl p-8 sm:p-10 z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-[#4A1521] text-[#E8A33D] flex items-center justify-center mx-auto mb-3 shadow-lg border border-[#E8A33D]/50">
            <span className="text-2xl"><img className='rounded-full' src={logo} alt="Nanthana Bakery Logo" /></span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#4A1521]">
            Create Account
          </h1>
          <p className="text-xs text-[#8C6D5B] font-semibold tracking-wider uppercase mt-1">
            Join the Nanthana Bakery Family
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="mb-5 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="mb-5 bg-rose-50 border border-rose-300 text-rose-800 text-xs rounded-xl p-3 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0742D]" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Krishnan"
                required
                className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-[#4A1521] placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
              />
            </div>
          </div>

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
              Create Password
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
            <UserPlus className="w-4 h-4 text-[#E8A33D]" />
            <span>{loading ? "Creating Account..." : "Create Free Account"}</span>
          </button>
        </form>

        {/* Login footer link */}
        <div className="mt-6 text-center text-xs text-[#785E4F]">
          <span>Already have an account? </span>
          <Link
            to="/login"
            className="font-bold text-[#8C273B] hover:text-[#4A1521] hover:underline"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;