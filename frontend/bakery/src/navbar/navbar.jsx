import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/cartcontext';
import logo from "../logo.png"
import {
  ShoppingBag,
  User,
  LogOut,
  LogIn,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Clock,
  PhoneCall,
  Package
} from 'lucide-react';

const ADMIN_EMAIL = "nanthakumar2006geetha02@gmail.com";

function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("isLoggedIn"));
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");
  const [userName, setUserName] = useState(localStorage.getItem("userName") || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
    setUserEmail(localStorage.getItem("userEmail") || "");
    setUserName(localStorage.getItem("userName") || "");
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUserEmail("");
    setUserName("");
    nav("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8A33D]/30 shadow-sm transition-all">
      {/* Top micro notification strip */}


      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/home" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#4A1521] to-[#8C273B] flex items-center justify-center shadow-md border border-[#E8A33D]/40 group-hover:scale-105 transition-transform">
            <span className="text-2xl"><img className='rounded-full' src={logo} alt="" /></span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#4A1521] block leading-none">
              Nanthana Bakery
            </span>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#B0742D] font-semibold">
              Pure Ghee Sweets & Savories
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide text-[#4A1521]">
          <Link
            to="/home"
            className={`hover:text-[#E8A33D] transition-colors relative py-1 ${isActive("/home") || isActive("/") ? "text-[#E8A33D] font-bold" : ""
              }`}
          >
            Home
            {(isActive("/home") || isActive("/")) && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E8A33D] rounded-full"></span>
            )}
          </Link>

          <Link
            to="/sweets"
            className={`hover:text-[#E8A33D] transition-colors relative py-1 ${isActive("/sweets") ? "text-[#E8A33D] font-bold" : ""
              }`}
          >
            Sweets Menu
            {isActive("/sweets") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E8A33D] rounded-full"></span>
            )}
          </Link>

          <Link
            to="/about"
            className={`hover:text-[#E8A33D] transition-colors relative py-1 ${isActive("/about") ? "text-[#E8A33D] font-bold" : ""
              }`}
          >
            About Heritage
            {isActive("/about") && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E8A33D] rounded-full"></span>
            )}
          </Link>

          {isLoggedIn && (
            <Link
              to="/orders"
              className={`hover:text-[#E8A33D] transition-colors relative py-1 flex items-center gap-1.5 ${isActive("/orders") ? "text-[#E8A33D] font-bold" : ""
                }`}
            >
              <Package className="w-4 h-4" />
              My Orders
              {isActive("/orders") && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E8A33D] rounded-full"></span>
              )}
            </Link>
          )}

          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 bg-[#4A1521] text-[#E8A33D] px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-[#E8A33D]/50 hover:bg-[#340c15] transition-all shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-[#E8A33D]" />
              Admin Portal
            </Link>
          )}
        </div>

        {/* Right CTA / Action Buttons */}
        <div className="flex items-center gap-3.5">
          {/* Cart Icon Button */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full bg-[#FAF1E4] border border-[#E8A33D]/40 text-[#4A1521] hover:bg-[#E8A33D] hover:text-[#4A1521] transition-all shadow-sm"
            title="View Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#4A1521] text-[#FDF8F0] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Auth Buttons */}
          {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-3 pl-2 border-l border-[#C9A46A]/40">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#E8A33D] text-[#4A1521] flex items-center justify-center font-bold text-xs">
                  {userName ? userName.charAt(0).toUpperCase() : userEmail.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-[#4A1521] max-w-[100px] truncate">
                  {userName || userEmail.split('@')[0]}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-xs text-[#8C273B] font-semibold hover:text-[#4A1521] hover:underline"
                title="Logout"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#4A1521] border border-[#4A1521] rounded-full px-4 py-2 hover:bg-[#4A1521] hover:text-white transition-all"
              >
                <LogIn className="w-3.5 h-3.5" /> Login
              </Link>
              <Link
                to="/register"
                className="text-xs font-bold uppercase tracking-wider bg-[#E8A33D] text-[#4A1521] rounded-full px-4 py-2 hover:bg-[#d4902b] transition-all shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#4A1521] hover:bg-[#FAF1E4] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-[#E8A33D]/40 px-6 py-5 shadow-xl transition-all space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-3 text-base font-semibold text-[#4A1521]">
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8A33D]/20 hover:text-[#E8A33D]"
            >
              Home
            </Link>
            <Link
              to="/sweets"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8A33D]/20 hover:text-[#E8A33D]"
            >
              Sweets Menu
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8A33D]/20 hover:text-[#E8A33D]"
            >
              About Us & Heritage
            </Link>
            {isLoggedIn && (
              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#E8A33D]/20 hover:text-[#E8A33D] flex items-center gap-2"
              >
                <Package className="w-4 h-4" /> My Orders
              </Link>
            )}
            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-[#8C273B] font-bold flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Admin Dashboard
              </Link>
            )}
          </div>

          <div className="pt-3 border-t border-[#E8A33D]/30 flex flex-col gap-2">
            {isLoggedIn ? (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#4A1521]">
                  Logged in as: {userName || userEmail}
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1 text-xs text-red-600 font-bold"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-bold border border-[#4A1521] text-[#4A1521] rounded-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-center py-2 text-sm font-bold bg-[#E8A33D] text-[#4A1521] rounded-lg shadow-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;