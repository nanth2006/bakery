import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './navbar/navbar.jsx';
import API_BASE_URL from './config/api.js';
import { 
  Package, 
  Clock, 
  CheckCircle2, 
  Truck, 
  ChefHat, 
  Sparkles, 
  ShoppingBag, 
  ArrowLeft,
  Calendar,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

const STATUS_STEPS = [
  { id: 'Placed', label: 'Order Placed', icon: Clock },
  { id: 'Preparing', label: 'Fresh Preparation', icon: ChefHat },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'Delivered', label: 'Delivered', icon: CheckCircle2 }
];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');

  useEffect(() => {
    fetchOrders();
  }, [userEmail]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/orders`;
      if (userEmail) {
        url = `${API_BASE_URL}/api/orders/user/${encodeURIComponent(userEmail)}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status) => {
    const s = (status || 'Placed').toLowerCase();
    if (s.includes('deliver') && !s.includes('out')) return 3;
    if (s.includes('out') || s.includes('shipping') || s.includes('transit')) return 2;
    if (s.includes('prep') || s.includes('cook') || s.includes('pack')) return 1;
    return 0; // Placed / Confirmed
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521]">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E8A33D]/30">
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="p-2 rounded-xl bg-white border border-[#E8A33D]/40 text-[#4A1521] hover:bg-[#E8A33D] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1521]">
                My Orders & Tracking
              </h1>
              <p className="text-xs text-[#785E4F]">
                Track live status and view your confectionery orders
              </p>
            </div>
          </div>

          <button
            onClick={fetchOrders}
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#FAF1E4] hover:bg-[#E8A33D] text-[#4A1521] px-4 py-2 rounded-xl border border-[#C9A46A]/50 transition-colors shadow-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Status
          </button>
        </div>

        {/* Orders Content */}
        {loading ? (
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-[#E8A33D]/20 animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-[#C9A46A] p-8 max-w-lg mx-auto shadow-sm">
            <div className="w-20 h-20 bg-[#FAF1E4] rounded-full flex items-center justify-center mx-auto mb-4 text-[#8C273B]">
              <Package className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#4A1521]">No Orders Found</h2>
            <p className="text-sm text-[#785E4F] mt-2 mb-6 max-w-xs mx-auto">
              You haven't placed any sweet orders yet. Treat your tastebuds to our authentic ghee specials!
            </p>
            <Link
              to="/sweets"
              className="inline-flex items-center gap-2 bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] px-6 py-3 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#E8A33D]" />
              <span>Browse Sweets Catalogue</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStep = getStepIndex(order.orderStatus);
              const orderId = order.orderNumber || order._id;

              return (
                <div
                  key={order._id}
                  className="bg-white rounded-3xl border border-[#E8A33D]/30 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#F0DFCD]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF1E4] text-[#8C273B] flex items-center justify-center font-bold">
                        <Package className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-base text-[#4A1521]">
                            #{orderId}
                          </span>
                          <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF1E4] text-[#8C273B] border border-[#E8A33D]/40">
                            {order.orderStatus || 'Placed'}
                          </span>
                        </div>
                        <span className="text-xs text-[#8C6D5B] flex items-center gap-1 mt-0.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(order.createdAt || Date.now()).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-[#8C6D5B] block">Total Amount Paid</span>
                      <span className="font-serif text-2xl font-bold text-[#8C273B]">
                        ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>

                  {/* Step Timeline Progression */}
                  <div className="py-6 border-b border-[#F0DFCD]">
                    <div className="grid grid-cols-4 gap-2 relative">
                      {/* Connecting progress line */}
                      <div className="absolute top-4 left-6 right-6 h-1 bg-[#FAF1E4] z-0">
                        <div
                          className="h-full bg-[#4A1521] transition-all duration-500"
                          style={{ width: `${(currentStep / 3) * 100}%` }}
                        ></div>
                      </div>

                      {STATUS_STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isCompleted = idx <= currentStep;
                        const isCurrent = idx === currentStep;

                        return (
                          <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-sm ${
                                isCompleted
                                  ? 'bg-[#4A1521] text-[#E8A33D] ring-4 ring-[#FAF1E4]'
                                  : 'bg-gray-100 text-gray-400'
                              } ${isCurrent ? 'scale-110' : ''}`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <span
                              className={`text-[11px] font-semibold mt-2 leading-tight ${
                                isCompleted ? 'text-[#4A1521]' : 'text-gray-400'
                              }`}
                            >
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Items & Customer Address Details */}
                  <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                    {/* Items List */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-2">
                        Ordered Sweets
                      </h4>
                      <div className="space-y-2 bg-[#FAF1E4]/60 p-3.5 rounded-2xl border border-[#E8A33D]/20">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-[#4A1521]">
                              {item.name} <span className="text-[#8C6D5B]">× {item.qty} {item.unit || 'kg'}</span>
                            </span>
                            <span className="font-bold text-[#8C273B]">
                              ₹{item.rate * item.qty}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery & Payment Info */}
                    <div className="text-xs text-[#785E4F] space-y-1.5 bg-[#FAF1E4]/60 p-3.5 rounded-2xl border border-[#E8A33D]/20">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A1521] mb-1">
                        Delivery Destination
                      </h4>
                      <p><strong>Recipient:</strong> {order.address?.name || 'Customer'}</p>
                      <p><strong>Phone:</strong> {order.address?.phone || 'N/A'}</p>
                      <p><strong>Address:</strong> {order.address?.street}, {order.address?.city} - {order.address?.pincode}</p>
                      <p><strong>Payment Mode:</strong> {order.paymentMethod} ({order.paymentStatus || 'Pending'})</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
