import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar/navbar.jsx';
import { 
  CheckCircle2, 
  Sparkles, 
  Package, 
  ArrowRight, 
  ShoppingBag, 
  Phone, 
  MapPin, 
  Clock, 
  Calendar 
} from 'lucide-react';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order || {};
  const placedDetails = location.state?.placedDetails || {};

  const orderNumber = order.orderNumber || order._id || "SWT-84920";
  const customerName = order.address?.name || placedDetails.address?.name || "Valued Customer";
  const totalAmount = order.totalAmount || placedDetails.totalAmount || 0;
  const items = order.items || placedDetails.items || [];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="bg-white rounded-3xl border border-[#E8A33D]/40 p-6 sm:p-10 shadow-xl text-center relative overflow-hidden">
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E8A33D] via-[#4A1521] to-[#E8A33D]"></div>

          {/* Animated Success Icon */}
          <div className="w-20 h-20 rounded-full bg-[#FAF1E4] border-2 border-[#E8A33D] flex items-center justify-center mx-auto mb-6 shadow-md animate-bounce">
            <span className="text-4xl">🍬</span>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Order Confirmed & Received!
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#4A1521]">
            Thank You, {customerName}!
          </h1>
          <p className="text-sm sm:text-base text-[#785E4F] mt-2 max-w-md mx-auto leading-relaxed">
            Your sweet order has been placed successfully. Our master chefs are preparing your fresh batch with pure desi ghee!
          </p>

          {/* Order Details Receipt Box */}
          <div className="mt-8 bg-[#FAF1E4]/70 rounded-2xl border border-[#E8A33D]/30 p-6 text-left max-w-xl mx-auto space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8A33D]/30">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D5B] block">
                  Order Number
                </span>
                <span className="font-mono font-bold text-base sm:text-lg text-[#4A1521]">
                  #{orderNumber}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D5B] block">
                  Total Amount
                </span>
                <span className="font-serif font-bold text-lg sm:text-xl text-[#8C273B]">
                  ₹{totalAmount}
                </span>
              </div>
            </div>

            {/* Delivery time estimate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#785E4F]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B0742D]" />
                <span><strong>Estimated Dispatch:</strong> Within 2 Hours</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#B0742D]" />
                <span><strong>Order Date:</strong> {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Items Summary list */}
            {items.length > 0 && (
              <div className="pt-3 border-t border-[#E8A33D]/30">
                <span className="text-xs font-bold text-[#4A1521] uppercase tracking-wider block mb-2">
                  Items in your box:
                </span>
                <div className="space-y-1.5">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-xs text-[#785E4F]">
                      <span>{item.name} × {item.qty} {item.unit || 'kg'}</span>
                      <span className="font-semibold text-[#4A1521]">₹{item.rate * item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/orders"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md hover:scale-105 transition-all"
            >
              <Package className="w-4 h-4 text-[#E8A33D]" />
              <span>Track in My Orders</span>
            </Link>

            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF1E4] text-[#4A1521] border border-[#C9A46A] px-5 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all "
            >
              <span>🖨️ Print Receipt</span>
            </button>

            <Link
              to="/home"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF1E4] hover:bg-[#E8A33D] text-[#4A1521] border border-[#C9A46A]/60 px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order More Sweets</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccess;