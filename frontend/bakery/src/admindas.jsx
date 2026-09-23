import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './navbar/navbar.jsx';
import AddSWeet from './addsweet.jsx';
import { 
  ShieldCheck, 
  Package, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Edit3, 
  RefreshCw, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  ArrowLeft,
  Search,
  Filter
} from 'lucide-react';

const ADMIN_EMAIL = "nanthakumar2006geetha02@gmail.com";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'inventory'
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "";
  const isAdmin = userEmail.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const [ordersRes, sweetsRes] = await Promise.all([
        fetch('http://localhost:5000/api/orders'),
        fetch('http://localhost:5000/api/getProduct')
      ]);

      const ordersData = await ordersRes.json();
      const sweetsData = await sweetsRes.json();

      if (Array.isArray(ordersData)) setOrders(ordersData);
      if (Array.isArray(sweetsData)) setSweets(sweetsData);
    } catch (err) {
      console.error("Failed to load dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: newStatus })
      });

      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order record?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o._id !== orderId));
      }
    } catch (err) {
      console.error("Delete order failed:", err);
    }
  };

  const handleDeleteSweet = async (sweetId, name) => {
    if (!window.confirm(`Are you sure you want to remove "${name}" from inventory?`)) return;
    try {
      const res = await fetch(`http://localhost:5000/api/deleteProduct/${sweetId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setSweets((prev) => prev.filter((s) => s._id !== sweetId));
      }
    } catch (err) {
      console.error("Delete sweet failed:", err);
    }
  };

  // Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingOrders = orders.filter((o) => (o.orderStatus || 'Placed') !== 'Delivered' && (o.orderStatus || '') !== 'Cancelled').length;
  const deliveredOrders = orders.filter((o) => (o.orderStatus || '') === 'Delivered').length;

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.orderStatus === statusFilter;
    const nameMatch = o.address?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const phoneMatch = o.address?.phone?.includes(searchQuery);
    const orderNumMatch = (o.orderNumber || o._id)?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && (nameMatch || phoneMatch || orderNumMatch || searchQuery === '');
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A1521]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
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
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#4A1521]">
                  Admin Operations Console
                </h1>
                <span className="bg-[#4A1521] text-[#E8A33D] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Store Owner
                </span>
              </div>
              <p className="text-xs text-[#785E4F]">
                Monitor orders, live revenue, customer deliveries and product inventory
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#FAF1E4] hover:bg-[#E8A33D] text-[#4A1521] px-4 py-2.5 rounded-xl border border-[#C9A46A]/50 transition-colors shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            <button
              onClick={() => {
                setEditingProduct(null);
                setShowAddModal(true);
              }}
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider bg-[#4A1521] hover:bg-[#320E16] text-[#FDF8F0] px-4 py-2.5 rounded-xl transition-all shadow-md"
            >
              <Plus className="w-4 h-4 text-[#E8A33D]" />
              Add Sweet
            </button>
          </div>
        </div>

        {/* METRICS SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-6 border border-[#E8A33D]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D5B] block">
                Total Revenue
              </span>
              <span className="font-serif text-3xl font-bold text-[#4A1521] block mt-1">
                ₹{totalRevenue.toLocaleString()}
              </span>
              <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" /> Live Gross Sales
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FAF1E4] text-[#8C273B] flex items-center justify-center font-bold">
              ₹
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8A33D]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D5B] block">
                Total Orders
              </span>
              <span className="font-serif text-3xl font-bold text-[#4A1521] block mt-1">
                {orders.length}
              </span>
              <span className="text-[11px] text-[#785E4F] font-semibold block mt-1">
                {deliveredOrders} Completed
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FAF1E4] text-[#8C273B] flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8A33D]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D5B] block">
                Active / Pending
              </span>
              <span className="font-serif text-3xl font-bold text-[#B0742D] block mt-1">
                {pendingOrders}
              </span>
              <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" /> Needs Dispatch
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#E8A33D]/30 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8C6D5B] block">
                Catalog Sweets
              </span>
              <span className="font-serif text-3xl font-bold text-[#4A1521] block mt-1">
                {sweets.length}
              </span>
              <span className="text-[11px] text-[#785E4F] font-semibold block mt-1">
                In-stock Confections
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FAF1E4] text-[#8C273B] flex items-center justify-center">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* TABS SELECTOR */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'orders'
                ? 'bg-[#4A1521] text-[#FDF8F0] shadow-md'
                : 'bg-white text-[#4A1521] border border-[#C9A46A]/50 hover:bg-[#FAF1E4]'
            }`}
          >
            Customer Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'inventory'
                ? 'bg-[#4A1521] text-[#FDF8F0] shadow-md'
                : 'bg-white text-[#4A1521] border border-[#C9A46A]/50 hover:bg-[#FAF1E4]'
            }`}
          >
            Sweet Inventory ({sweets.length})
          </button>
        </div>

        {/* TAB 1: ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-3xl border border-[#E8A33D]/30 overflow-hidden shadow-sm">
            {/* Filter and Search Bar */}
            <div className="p-4 sm:p-6 border-b border-[#F0DFCD] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B0742D]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search customer, phone, ID..."
                  className="w-full bg-[#FAF1E4] border border-[#C9A46A]/50 rounded-xl pl-9 pr-3 py-2 text-xs text-[#4A1521] placeholder:text-[#A88B77] focus:outline-none focus:ring-2 focus:ring-[#E8A33D]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-[#8C273B]" />
                <span className="text-xs font-bold uppercase">Status Filter:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#FAF1E4] border border-[#C9A46A]/50 text-xs font-semibold rounded-xl px-3 py-2 text-[#4A1521] focus:outline-none"
                >
                  <option value="All">All Statuses</option>
                  <option value="Placed">Placed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#FAF1E4] text-[#4A1521] font-serif border-b border-[#F0DFCD]">
                    <th className="p-4 font-bold">Order ID</th>
                    <th className="p-4 font-bold">Customer Info</th>
                    <th className="p-4 font-bold">Items</th>
                    <th className="p-4 font-bold">Total (₹)</th>
                    <th className="p-4 font-bold">Payment</th>
                    <th className="p-4 font-bold">Live Status</th>
                    <th className="p-4 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0DFCD]">
                  {filteredOrders.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-12 text-[#785E4F]">
                        No matching orders found.
                      </td>
                    </tr>
                  ) : (
                    filteredOrders.map((order) => {
                      const orderId = order.orderNumber || order._id;
                      return (
                        <tr key={order._id} className="hover:bg-[#FAF1E4]/40 transition-colors">
                          {/* Order ID */}
                          <td className="p-4 font-mono font-bold text-[#4A1521]">
                            #{orderId}
                            <span className="block text-[10px] text-[#8C6D5B] font-sans">
                              {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                            </span>
                          </td>

                          {/* Customer Info */}
                          <td className="p-4">
                            <span className="font-bold text-[#4A1521] block">
                              {order.address?.name || 'Customer'}
                            </span>
                            <span className="text-xs text-[#785E4F] block">
                              📞 {order.address?.phone || 'N/A'}
                            </span>
                            <span className="text-[11px] text-[#8C6D5B] block truncate max-w-xs">
                              📍 {order.address?.street}, {order.address?.city}
                            </span>
                          </td>

                          {/* Items summary */}
                          <td className="p-4">
                            <span className="font-semibold text-[#4A1521]">
                              {(order.items || []).length} items
                            </span>
                            <span className="block text-[11px] text-[#785E4F] truncate max-w-xs">
                              {(order.items || []).map((i) => `${i.name} (${i.qty})`).join(', ')}
                            </span>
                          </td>

                          {/* Amount */}
                          <td className="p-4 font-serif font-bold text-base text-[#8C273B]">
                            ₹{order.totalAmount}
                          </td>

                          {/* Payment */}
                          <td className="p-4">
                            <span className="inline-block bg-[#FAF1E4] px-2 py-0.5 rounded text-xs font-semibold text-[#4A1521]">
                              {order.paymentMethod}
                            </span>
                          </td>

                          {/* Status Updater Dropdown */}
                          <td className="p-4">
                            <select
                              value={order.orderStatus || 'Placed'}
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className={`text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors cursor-pointer ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : order.orderStatus === 'Out for Delivery'
                                  ? 'bg-blue-50 text-blue-800 border-blue-300'
                                  : order.orderStatus === 'Preparing'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : order.orderStatus === 'Cancelled'
                                  ? 'bg-rose-50 text-rose-800 border-rose-300'
                                  : 'bg-[#FAF1E4] text-[#4A1521] border-[#C9A46A]'
                              }`}
                            >
                              <option value="Placed">Placed</option>
                              <option value="Preparing">Preparing</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Delete Action */}
                          <td className="p-4 text-center">
                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Delete Order"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: SWEET INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sweets.map((s) => (
              <div
                key={s._id}
                className="bg-white rounded-2xl border border-[#E8A33D]/30 overflow-hidden shadow-sm p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="h-36 rounded-xl overflow-hidden mb-3 bg-[#FAF1E4]">
                    {s.link ? (
                      <img src={s.link} alt={s.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs">🍬</div>
                    )}
                  </div>
                  <span className="text-[11px] font-bold uppercase text-[#B0742D]">
                    {s.category || 'General'}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[#4A1521] leading-snug">
                    {s.name}
                  </h4>
                  <p className="text-xs text-[#785E4F] mt-1 line-clamp-2">
                    {s.title || 'Pure traditional delicacy.'}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F0DFCD] flex items-center justify-between">
                  <span className="font-serif font-bold text-lg text-[#4A1521]">
                    ₹{s.rate} <span className="text-xs text-[#8C6D5B]">/{s.unit || 'kg'}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(s);
                        setShowAddModal(true);
                      }}
                      className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSweet(s._id, s.name)}
                      className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Sweet Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl my-8">
            <AddSWeet
              productToEdit={editingProduct}
              onProductAdded={() => {
                setShowAddModal(false);
                fetchDashboardData();
              }}
              onClose={() => setShowAddModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;